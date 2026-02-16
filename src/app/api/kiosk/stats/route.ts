import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function getServerSupabase() {
  const any = supabaseServer as any;
  return typeof any === "function" ? any() : any;
}

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const venueId = String(url.searchParams.get("venueId") || "").trim();
    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }

    const supabase = await getServerSupabase();

    // Total count
    const { count: total, error: totalErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId);

    if (totalErr) throw totalErr;

    // Today count (UTC day boundary)
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const { count: today, error: todayErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId)
      .gte("created_at", start.toISOString());

    if (todayErr) throw todayErr;

    // Latest pass
    const { data: latest, error: latestErr } = await supabase
      .from("access_passes")
      .select("token, created_at, expires_at, status")
      .eq("venue_id", venueId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (latestErr) throw latestErr;

    return NextResponse.json({
      ok: true,
      venueId,
      total: total ?? 0,
      today: today ?? 0,
      latest: (latest && latest[0]) || null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
