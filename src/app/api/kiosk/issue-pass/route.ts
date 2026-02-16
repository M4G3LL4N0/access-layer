import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function getServerSupabase() {
  const any = supabaseServer as any;
  return typeof any === "function" ? any() : any;
}

function randomToken(len = 24) {
  return crypto.randomBytes(len).toString("base64url");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const venueId = String(body?.venueId || "").trim();
    const pin = String(body?.pin || "").trim();
    const dryRun = Boolean(body?.dryRun);

    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }

    const requirePin = String(process.env.KIOSK_REQUIRE_PIN || "").toLowerCase() === "true";
    const expectedPin = String(process.env.KIOSK_PIN || "").trim();

    if (requirePin) {
      if (!expectedPin) {
        return NextResponse.json({ ok: false, error: "Server missing KIOSK_PIN" }, { status: 500 });
      }
      if (pin !== expectedPin) {
        return NextResponse.json({ ok: false, error: "Invalid PIN" }, { status: 401 });
      }
    }

    // If this is just a PIN check, return OK now
    if (dryRun) {
      return NextResponse.json({ ok: true });
    }

    const supabase = await getServerSupabase();

    // Confirm venue exists
    const { data: venueRows, error: venueErr } = await supabase
      .from("venues")
      .select("id, name, status")
      .eq("id", venueId)
      .limit(1);

    if (venueErr) throw venueErr;
    const venue = venueRows?.[0];
    if (!venue) return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });

    const token = randomToken(24);

    const now = new Date();
    const expires = new Date(now.getTime() + 15 * 60 * 1000); // 15 min

    const { error: insErr } = await supabase.from("access_passes").insert([
      {
        venue_id: venueId,
        token,
        status: "active",
        issued_at: now.toISOString(),
        expires_at: expires.toISOString(),
        requester_id: "kiosk",
        ip_hash: null,
        user_agent_hash: null,
      },
    ]);

    if (insErr) throw insErr;

    return NextResponse.json({
      ok: true,
      venue: { id: venue.id, name: venue.name },
      token,
      expires_at: expires.toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
