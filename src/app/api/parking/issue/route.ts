import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function randomToken(len = 16) {
  return crypto.randomBytes(len).toString("base64url");
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const qsVenueId = url.searchParams.get("venueId") || "";
    const form = await req.formData().catch(() => null);

    const venueId = String(form?.get("venueId") || qsVenueId || "");

    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }

    const supabase = await supabaseServer();

    // Confirm venue exists
    const { data: venue } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1);

    if (!venue?.[0]) {
      return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });
    }

    const token = randomToken(24);
    const issued_at = new Date().toISOString();

    await supabase
      .from("parking_events")
      .insert([{ venue_id: venueId, token, event_type: "entry", issued_at }]);

    return NextResponse.json({ ok: true, token, issued_at });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
