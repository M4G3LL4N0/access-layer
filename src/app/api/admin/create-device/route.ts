import { NextResponse } from "next/server";
import { supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const venueId = body?.venueId;

    if (!venueId) {
      return NextResponse.json(
        { ok: false, error: "Missing venueId" },
        { status: 400 }
      );
    }

    // 🔥 IMPORTANT: await the service client
    const supabase = await supabaseServerService();

    // Confirm venue exists
    const { data: venue, error: venueErr } = await supabase
      .from("venues")
      .select("id")
      .eq("id", venueId)
      .single();

    if (venueErr || !venue) {
      return NextResponse.json(
        { ok: false, error: "Venue not found" },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("devices")
      .insert([
        {
          venue_id: venueId,
          status: "active",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, device: data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
