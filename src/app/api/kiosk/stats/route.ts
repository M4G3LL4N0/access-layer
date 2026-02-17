import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function errToString(e: any) {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  if (e.message) return String(e.message);
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const venueId = String(url.searchParams.get("venueId") || "").trim();

    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }

    // IMPORTANT: supabaseServer is a client instance, NOT a function.
    const supabase = supabaseServer;

    const { data: totalRows, error: totalErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId);

    if (totalErr) {
      return NextResponse.json({ ok: false, error: errToString(totalErr) }, { status: 500 });
    }

    const total = (totalRows as any) ? (totalRows as any).length : 0;

    const { data: latest, error: latestErr } = await supabase
      .from("access_passes")
      .select("token,created_at,expires_at,status")
      .eq("venue_id", venueId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (latestErr) {
      return NextResponse.json({ ok: false, error: errToString(latestErr) }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      venueId,
      total,
      today: 0,
      latest: latest?.[0] || null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: errToString(e) }, { status: 500 });
  }
}
