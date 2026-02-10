import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function randomToken(len = 24) {
  return crypto.randomBytes(len).toString("base64url");
}

function uuidFromCookieOrNew(existing?: string | null) {
  if (existing && UUID_RE.test(existing)) return existing;
  return crypto.randomUUID();
}

export async function POST(req: Request) {
  const form = await req.formData();
  const venueId = String(form.get("venueId") || "");

  if (!UUID_RE.test(venueId)) {
    return NextResponse.json({ error: "Invalid venueId" }, { status: 400 });
  }

  // Guest identity (cookie-based)
  const cookieHeader = req.headers.get("cookie") || "";
  const guestCookieMatch = cookieHeader.match(/(?:^|;\s*)guest_id=([^;]+)/);
  const guestId = uuidFromCookieOrNew(
    guestCookieMatch ? decodeURIComponent(guestCookieMatch[1]) : null
  );

  // Lightweight requester hash for anti-abuse
  const ua = req.headers.get("user-agent") || "unknown";
  const requesterHash = crypto
    .createHash("sha256")
    .update(`${guestId}|${ua}`)
    .digest("hex");

  // 1) Validate venue
  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("id,status")
    .eq("id", venueId)
    .single();

  if (vErr || !venue) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=venue_not_found`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  if (venue.status !== "active") {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=venue_inactive`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  // 2) Load latest enabled rule (MVP: most recent)
  const { data: rule, error: rErr } = await supabaseServer
    .from("access_rules")
    .select("*")
    .eq("venue_id", venueId)
    .eq("is_enabled", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (rErr) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=rules_error`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  const maxPerDay = rule?.max_grants_per_user_per_day ?? 3;
  const cooldownMin = rule?.min_minutes_between_grants ?? 30;

  // 3) Rate limits
  const now = new Date();
  const since24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sinceCooldown = new Date(now.getTime() - cooldownMin * 60 * 1000);

  const { count: grants24h, error: countErr } = await supabaseServer
    .from("access_tokens")
    .select("id", { count: "exact", head: true })
    .eq("venue_id", venueId)
    .eq("guest_id", guestId)
    .gte("issued_at", since24h.toISOString());

  if (countErr) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=count_error`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  if ((grants24h ?? 0) >= maxPerDay) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=daily_limit`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  const { data: recentToken, error: coolErr } = await supabaseServer
    .from("access_tokens")
    .select("id,issued_at")
    .eq("venue_id", venueId)
    .eq("guest_id", guestId)
    .gte("issued_at", sinceCooldown.toISOString())
    .order("issued_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (coolErr) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=cooldown_error`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  if (recentToken) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=cooldown`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  // 4) Create request row (MVP auto-grant)
  const { data: reqRow, error: reqErr } = await supabaseServer
    .from("access_requests")
    .insert({
      venue_id: venueId,
      user_id: null,
      guest_id: guestId,
      requester_hash: requesterHash,
      decision: "granted",
      decided_at: now.toISOString(),
      decision_reason: "MVP auto-grant",
      request_context: { ua },
    })
    .select("id")
    .single();

  if (reqErr || !reqRow) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=request_create_failed`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  // 5) Issue token (active for 15 minutes)
  const token = randomToken(24);
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);

  const { data: tokenRow, error: tErr } = await supabaseServer
    .from("access_tokens")
    .insert({
      request_id: reqRow.id,
      venue_id: venueId,
      user_id: null,
      guest_id: guestId,
      requester_hash: requesterHash,
      token,
      status: "active",
      expires_at: expiresAt.toISOString(),
    })
    .select("token")
    .single();

  if (tErr || !tokenRow) {
    const res = NextResponse.redirect(
      new URL(`/request/${venueId}?error=token_issue_failed`, req.url)
    );
    res.headers.set(
      "Set-Cookie",
      `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
    );
    return res;
  }

  // 6) Log event (best-effort)
  await supabaseServer.from("access_events").insert({
    venue_id: venueId,
    user_id: null,
    guest_id: guestId,
    event_type: "grant",
    meta: { token: tokenRow.token, expires_at: expiresAt.toISOString() },
  });

  // 7) Redirect to pass page
  const res = NextResponse.redirect(new URL(`/pass/${tokenRow.token}`, req.url));
  res.headers.set(
    "Set-Cookie",
    `guest_id=${encodeURIComponent(guestId)}; Path=/; SameSite=Lax`
  );
  return res;
}

