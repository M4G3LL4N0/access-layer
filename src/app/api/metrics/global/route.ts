import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await supabaseServer();

    const { count: venueCount } = await supabase
      .from("venues")
      .select("*", { count: "exact", head: true });

    const { count: passCount } = await supabase
      .from("access_passes")
      .select("*", { count: "exact", head: true });

    const { count: parkingCount } = await supabase
      .from("parking_events")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      ok: true,
      metrics: {
        venues: venueCount || 0,
        passes: passCount || 0,
        parkingEvents: parkingCount || 0,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
