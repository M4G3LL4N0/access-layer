import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // IMPORTANT:
    // In this project, supabaseServer is a SupabaseClient INSTANCE (not a function),
    // so we do NOT call it like supabaseServer().
    const supabase = supabaseServer;

    // venues count
    const { count: venues, error: vErr } = await supabase
      .from("venues")
      .select("id", { count: "exact", head: true });

    if (vErr) throw vErr;

    // passes count
    const { count: passes, error: pErr } = await supabase
      .from("access_passes")
      .select("id", { count: "exact", head: true });

    if (pErr) throw pErr;

    // leads count (optional table — only count if exists)
    let leads: number | null = null;
    try {
      const { count, error } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true });
      if (!error) leads = count ?? 0;
    } catch {
      leads = null;
    }

    // parking events count (optional table)
    let parkingEvents: number | null = null;
    try {
      const { count, error } = await supabase
        .from("parking_events")
        .select("id", { count: "exact", head: true });
      if (!error) parkingEvents = count ?? 0;
    } catch {
      parkingEvents = null;
    }

    return NextResponse.json({
      ok: true,
      venues: venues ?? 0,
      passes: passes ?? 0,
      leads,
      parkingEvents,
      ts: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e || "unknown") },
      { status: 500 }
    );
  }
}
