import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const venueId = String(url.searchParams.get("venueId") || "");

    if (!venueId || !isUuid(venueId)) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid venueId", venueId },
        { status: 400 }
      );
    }

    // IMPORTANT: supabaseServer is an instance, do NOT call it as a function.
    const supabase = supabaseServer;

    // Confirm venue exists (avoid .single())
    const { data: vRows, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1);

    const venue = vRows?.[0] || null;

    if (vErr || !venue) {
      return NextResponse.json(
        {
          ok: false,
          error: vErr ? String(vErr.message || vErr) : "Venue not found",
          venueId,
          venueRows: vRows?.length || 0,
        },
        { status: 404 }
      );
    }

    // Total passes
    const { count: totalCount, error: totalErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId);

    if (totalErr) {
      return NextResponse.json(
        { ok: false, error: String(totalErr.message || totalErr), venueId, where: "count_total" },
        { status: 500 }
      );
    }

    // Today passes (UTC day)
    const startUtc = new Date();
    startUtc.setUTCHours(0, 0, 0, 0);

    const { count: todayCount, error: todayErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId)
      .gte("created_at", startUtc.toISOString());

    if (todayErr) {
      return NextResponse.json(
        { ok: false, error: String(todayErr.message || todayErr), venueId, where: "count_today" },
        { status: 500 }
      );
    }

    // Latest pass (avoid .single())
    const { data: latestRows, error: latestErr } = await supabase
      .from("access_passes")
      .select("token,created_at,expires_at,status")
      .eq("venue_id", venueId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (latestErr) {
      return NextResponse.json(
        { ok: false, error: String(latestErr.message || latestErr), venueId, where: "latest" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      venueId,
      venue,
      total: totalCount ?? 0,
      today: todayCount ?? 0,
      latest: latestRows?.[0] || null,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: String(e?.message || e),
        where: "top-level",
      },
      { status: 500 }
    );
  }
}
