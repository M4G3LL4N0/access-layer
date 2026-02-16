import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function generateToken() {
  return crypto.randomBytes(24).toString("base64url");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { venueId } = body;

    if (!venueId) {
      return NextResponse.json({ error: "Missing venueId" }, { status: 400 });
    }

    const supabase = supabaseServer();

    // Confirm venue exists
    const { data: venue, error: venueErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1);

    if (venueErr || !venue || venue.length === 0) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    const token = generateToken();
    const now = new Date();
    const expires = new Date(now.getTime() + 15 * 60 * 1000); // 15 min pass

    const { error: insertErr } = await supabase
      .from("access_passes")
      .insert([
        {
          venue_id: venueId,
          token,
          status: "active",
          issued_at: now.toISOString(),
          expires_at: expires.toISOString(),
        },
      ]);

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      token,
      expires_at: expires.toISOString(),
      passUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pass/${token}`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
