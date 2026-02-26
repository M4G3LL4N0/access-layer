import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/axw3/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);

    const sb = supabaseService();
    let q = sb.from("axw_audit_events").select("*").order("at", { ascending: false }).limit(limit);
    if (venueId) q = q.eq("venue_id", venueId);

    const { data, error } = await q;
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, events: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "audit_failed" }, { status: 500 });
  }
}
