import { NextResponse } from "next/server";
import { supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const venueId = url.searchParams.get("venueId");
    const limit = Number(url.searchParams.get("limit") || "50");

    const supabase = supabaseServerService();

    let query = supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (venueId) {
      query = query.eq("venue_id", venueId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, events: data ?? [] });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Fetch events failed" }, { status: 500 });
  }
}
