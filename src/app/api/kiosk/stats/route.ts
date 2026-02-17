import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const venueId = String(url.searchParams.get("venueId") || "");

    if (!venueId) return jsonError("Missing venueId (query param).", 400);

    const supabase = supabaseServer;

    const { data: venue, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1);

    if (vErr) return jsonError("Venue lookup failed", 500, { detail: vErr });
    if (!venue?.[0]) return jsonError("Venue not found", 404, { venueId });

    const { count: total, error: totalErr } = await supabase
      .from("access_passes")
      .select("*", { count: "exact", head: true })
      .eq("venue_id", venueId);

    if (totalErr) return jsonError("Count failed", 500, { detail: totalErr });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { count: today, error: todayErr } = await supabase
      .from("access_passes")
      .select("*", { count: "exact", head: true })
      .eq("venue_id", venueId)
      .gte("created_at", startOfDay.toISOString());

    if (todayErr) return jsonError("Today count failed", 500, { detail: todayErr });

    const { data: latestRows, error: latestErr } = await supabase
      .from("access_passes")
      .select("token,created_at,expires_at,status")
      .eq("venue_id", venueId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (latestErr) return jsonError("Latest failed", 500, { detail: latestErr });

    return NextResponse.json({
      ok: true,
      venueId,
      venue: venue[0],
      total: total ?? 0,
      today: today ?? 0,
      latest: latestRows?.[0] || null,
    });
  } catch (e: any) {
    return jsonError("Unexpected error", 500, { detail: String(e?.message || e) });
  }
}
