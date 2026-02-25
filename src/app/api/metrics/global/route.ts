import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await supabaseServer();

    const since7d = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();

    const [venues, passes7d, parking7d, leads7d] = await Promise.all([
      supabase.from("venues").select("*", { count: "exact", head: true }),
      supabase.from("access_passes").select("*", { count: "exact", head: true }).gte("created_at", since7d),
      supabase.from("parking_events").select("*", { count: "exact", head: true }).gte("created_at", since7d),
      supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", since7d),
    ]);

    const err =
      venues.error || passes7d.error || parking7d.error || leads7d.error;

    if (err) return NextResponse.json({ ok: false, error: err.message }, { status: 400 });

    return NextResponse.json({
      ok: true,
      venues: venues.count ?? 0,
      passes_7d: passes7d.count ?? 0,
      parking_events_7d: parking7d.count ?? 0,
      leads_7d: leads7d.count ?? 0,
      updated_at: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
