import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function randomToken(len = 24) {
  return crypto.randomBytes(len).toString("base64url");
}

function sha256Base64Url(input: string) {
  return crypto.createHash("sha256").update(input).digest("base64url");
}

function uuidFromCookieOrNew(existing?: string | null) {
  const re = UUID_RE;
  if (existing && re.test(existing)) return existing;
  return crypto.randomUUID();
}

const FormSchema = z.object({
  venueId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const parsed = FormSchema.safeParse({
      venueId: String(form.get("venueId") || ""),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const venueId = parsed.data.venueId;
    if (!UUID_RE.test(venueId)) {
      return NextResponse.json({ error: "Invalid venueId" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Confirm venue exists (prevents FK failure)
    const { data: venue, error: vErr } = await supabase
      .from("venues")
      .select("id,status")
      .eq("id", venueId)
      .maybeSingle();

    if (vErr) {
      return NextResponse.json({ error: vErr.message }, { status: 500 });
    }
    if (!venue) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }
    if (venue.status && venue.status !== "active") {
      return NextResponse.json({ error: "Venue inactive" }, { status: 403 });
    }

    // Simple guest identity cookie for rate limiting (no PII)
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|;\s*)al_guest=([^;]+)/);
    const existingGuest = match ? decodeURIComponent(match[1]) : null;
    const guestId = uuidFromCookieOrNew(existingGuest);

    // Rate limit: check latest pass for this guest+venue
    const cooldownMinutes = 30; // match your pilot default
    const { data: recent, error: rErr } = await supabase
      .from("access_passes")
      .select("id,created_at,expires_at,status")
      .eq("venue_id", venueId)
      .eq("requester_id", guestId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (rErr) {
      return NextResponse.json({ error: rErr.message }, { status: 500 });
    }

    if (recent && recent[0]) {
      const lastCreated = new Date(recent[0].created_at).getTime();
      const now = Date.now();
      const diffMin = (now - lastCreated) / 60000;
      if (diffMin < cooldownMinutes) {
        // Redirect back to request page with cooldown flag
        return NextResponse.redirect(
          new URL(`/request/${venueId}?error=cooldown`, req.url),
          303
        );
      }
    }

    // Issue pass: 15 min window
    const token = randomToken(24);
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + 15 * 60 * 1000);

    // optional privacy: store hashed IP + UA (not required, but useful later)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";
    const ua = req.headers.get("user-agent") || "";

    const ipHash = ip ? sha256Base64Url(ip) : null;
    const uaHash = ua ? sha256Base64Url(ua) : null;

    const { data: inserted, error: iErr } = await supabase
      .from("access_passes")
      .insert({
        venue_id: venueId,
        token,
        status: "active",
        issued_at: issuedAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        requester_id: guestId,
        ip_hash: ipHash,
        user_agent_hash: uaHash,
      })
      .select("token")
      .single();

    if (iErr) {
      return NextResponse.json(
        { error: iErr.message, hint: "Insert into access_passes failed" },
        { status: 500 }
      );
    }

    // Redirect to pass page
    const res = NextResponse.redirect(
      new URL(`/pass/${inserted.token}`, req.url),
      303
    );

    // Set guest cookie for 365 days
    res.headers.append(
      "Set-Cookie",
      `al_guest=${encodeURIComponent(guestId)}; Path=/; Max-Age=31536000; SameSite=Lax`
    );

    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
