import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

/**
 * Access Pass issuance (NO CODES)
 * - rate limited (max/day per requester per venue)
 * - cooldown (min minutes between grants)
 * - time-window restricted by rule hours/days
 * - issues a time-limited token (demo: 60 minutes)
 */

function randomToken(len = 24) {
  // URL-safe token
  return crypto.randomBytes(len).toString("base64url");
}

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for") || "";
  const ip = xf.split(",")[0]?.trim();
  return ip || "0.0.0.0";
}

function getUA(req: Request) {
  return req.headers.get("user-agent") || "";
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function parseTimeToMinutes(t: string) {
  // "HH:MM:SS" or "HH:MM"
  const [hh, mm] = t.split(":").map((x) => parseInt(x, 10));
  return (hh || 0) * 60 + (mm || 0);
}

function nowMinutesLocal() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function dayOfWeekLocal() {
  // 0=Sun ... 6=Sat
  return new Date().getDay();
}

function startOfLocalDayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const venueId = String(form.get("venueId") || "").trim();

    if (!UUID_RE.test(venueId)) {
      return NextResponse.json({ error: "Invalid venueId" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // 1) Load venue
    const { data: venue, error: venueErr } = await supabase
      .from("venues")
      .select("id,name,status")
      .eq("id", venueId)
      .maybeSingle();

    if (venueErr) {
      return NextResponse.json({ error: venueErr.message }, { status: 500 });
    }
    if (!venue || venue.status !== "active") {
      return NextResponse.json({ error: "Venue not active" }, { status: 404 });
    }

    // 2) Load active rule (pick first enabled rule for now)
    const { data: rules, error: rulesErr } = await supabase
      .from("access_rules")
      .select(
        "id,venue_id,rule_name,is_enabled,start_time,end_time,days_of_week,max_grants_per_user_per_day,min_minutes_between_grants,access_mode,requires_payment,price_cents,require_login"
      )
      .eq("venue_id", venueId)
      .eq("is_enabled", true)
      .order("created_at", { ascending: true })
      .limit(1);

    if (rulesErr) {
      return NextResponse.json({ error: rulesErr.message }, { status: 500 });
    }

    const rule = rules?.[0];
    if (!rule) {
      return NextResponse.json({ error: "No active rule configured" }, { status: 400 });
    }

    // 3) Enforce rule window (days + hours)
    const today = dayOfWeekLocal();
    const allowedDays: number[] = Array.isArray(rule.days_of_week) ? rule.days_of_week : [];
    if (allowedDays.length > 0 && !allowedDays.includes(today)) {
      return NextResponse.json({ error: "Outside allowed days" }, { status: 403 });
    }

    const startMin = parseTimeToMinutes(rule.start_time || "00:00:00");
    const endMin = parseTimeToMinutes(rule.end_time || "23:59:59");
    const nowMin = nowMinutesLocal();

    // Simple same-day window assumption (no overnight windows in MVP)
    if (!(nowMin >= startMin && nowMin <= endMin)) {
      return NextResponse.json({ error: "Outside allowed hours" }, { status: 403 });
    }

    // 4) Identify requester (cookie-based UUID or fallback)
    // MVP: use a "requester_id" cookie if present; otherwise set one.
    // In route handlers we can set cookies via response headers only.
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/(?:^|;\s*)al_rid=([^;]+)/);
    const existingRid = match ? decodeURIComponent(match[1]) : null;
    const requesterId = existingRid && UUID_RE.test(existingRid) ? existingRid : crypto.randomUUID();

    // 5) Rate limit per requester per venue per day
    const startDay = startOfLocalDayISO();
    const maxPerDay = Number(rule.max_grants_per_user_per_day || 3);

    const { count: todayCount, error: countErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId)
      .eq("requester_id", requesterId)
      .gte("created_at", startDay);

    if (countErr) {
      return NextResponse.json({ error: countErr.message }, { status: 500 });
    }
    if ((todayCount || 0) >= maxPerDay) {
      return NextResponse.json({ error: "Daily limit reached." }, { status: 429 });
    }

    // 6) Cooldown (min minutes between grants)
    const cooldownMin = Number(rule.min_minutes_between_grants || 30);

    const { data: lastPass, error: lastErr } = await supabase
      .from("access_passes")
      .select("created_at")
      .eq("venue_id", venueId)
      .eq("requester_id", requesterId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (lastErr) {
      return NextResponse.json({ error: lastErr.message }, { status: 500 });
    }

    if (lastPass?.[0]?.created_at) {
      const last = new Date(lastPass[0].created_at).getTime();
      const diffMin = (Date.now() - last) / (1000 * 60);
      if (diffMin < cooldownMin) {
        return NextResponse.json({ error: "Cooldown active. Try again later." }, { status: 429 });
      }
    }

    // 7) Issue pass token (DEMO: 60 minutes)
    const token = randomToken(24);
    const issuedAt = new Date();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes

    const ipHash = sha256Hex(getClientIp(req));
    const uaHash = sha256Hex(getUA(req));

    const { error: insErr } = await supabase.from("access_passes").insert({
      venue_id: venueId,
      token,
      status: "active",
      issued_at: issuedAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      requester_id: requesterId,
      ip_hash: ipHash,
      user_agent_hash: uaHash,
    });

    if (insErr) {
      return NextResponse.json({ error: insErr.message }, { status: 500 });
    }

    // 8) Set requester cookie (7 days) and return token
    const res = NextResponse.json({
      ok: true,
      venue: { id: venue.id, name: venue.name },
      rule: {
        id: rule.id,
        rule_name: rule.rule_name,
        access_mode: rule.access_mode,
        max_grants_per_user_per_day: maxPerDay,
        min_minutes_between_grants: cooldownMin,
      },
      pass: {
        token,
        status: "active",
        issued_at: issuedAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
    });

    // cookie: al_rid=<uuid>
    res.headers.append(
      "Set-Cookie",
      `al_rid=${encodeURIComponent(requesterId)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`
    );

    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
