import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function normalizePlate(p: string) {
  return (p || "").toUpperCase().replace(/[^A-Z0-9]/g, "").trim();
}

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function randomToken(len = 24) {
  return crypto.randomBytes(len).toString("base64url");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const venueId = String(body?.venueId || "");
    const plate = normalizePlate(String(body?.plate || ""));
    const minutes = Math.max(5, Math.min(24 * 60, Number(body?.minutes || 120))); // default 120m

    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }
    if (!plate || plate.length < 4) {
      return NextResponse.json({ ok: false, error: "Invalid plate" }, { status: 400 });
    }

    // In this repo, supabaseServer is already a client (NOT a function)
    const supabase = supabaseServer;

    const { data: venueRows, error: vErr } = await supabase
      .from("venues")
      .select("id, name, status")
      .eq("id", venueId)
      .limit(1);

    if (vErr) return NextResponse.json({ ok: false, error: vErr.message }, { status: 500 });
    if (!venueRows || venueRows.length === 0) {
      return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });
    }

    const token = randomToken(18);
    const now = new Date();
    const expires = new Date(now.getTime() + minutes * 60 * 1000);

    const plate_hash = sha256(plate);

    const { data, error } = await supabase
      .from("parking_validations")
      .insert([
        {
          venue_id: venueId,
          plate_hash,
          token,
          status: "active",
          issued_at: now.toISOString(),
          expires_at: expires.toISOString(),
          source: "kiosk",
        },
      ])
      .select("token, issued_at, expires_at, status, venue_id")
      .limit(1);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    // Log event (ignore failures cleanly)
    try {
      const { error: evErr } = await supabase
        .from("parking_events")
        .insert([{ venue_id: venueId, token, event_type: "issued", meta: { minutes } }]);
      if (evErr) {
        // ignore
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      ok: true,
      venue: { id: venueId, name: venueRows[0].name },
      validation: data?.[0],
      verifyUrl: `/api/parking/verify?token=${encodeURIComponent(token)}`,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
