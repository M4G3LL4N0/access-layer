import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // IMPORTANT: supabaseServer() is NOT async. Do not await it.
    const supabase = supabaseServer();

    const [{ count: venues }, { count: passes }, { count: leads }] = await Promise.all([
      supabase.from("venues").select("*", { count: "exact", head: true }),
      supabase.from("access_passes").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      ok: true,
      venues: venues ?? 0,
      passes: passes ?? 0,
      leads: leads ?? 0,
      ts: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
