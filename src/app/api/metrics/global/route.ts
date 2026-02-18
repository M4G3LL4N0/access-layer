import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // IMPORTANT: In this repo, supabaseServer is a CLIENT (not a function).
    const supabase = supabaseServer();
    // counts must be requested via select(..., { count: "exact", head: true })
    const [{ count: venuesCount, error: vErr }, { count: passesCount, error: pErr }] =
      await Promise.all([
        supabase.from("venues").select("*", { count: "exact", head: true }),
        supabase.from("access_passes").select("*", { count: "exact", head: true }),
      ]);

    if (vErr) {
      return NextResponse.json({ ok: false, where: "venuesCount", error: vErr.message }, { status: 500 });
    }
    if (pErr) {
      return NextResponse.json({ ok: false, where: "passesCount", error: pErr.message }, { status: 500 });
    }

    // optional: recent activity (safe, doesn’t break if empty)
    const { data: latestPass } = await supabase
      .from("access_passes")
      .select("token,status,created_at,expires_at,venue_id")
      .order("created_at", { ascending: false })
      .limit(1);

    return NextResponse.json({
      ok: true,
      metrics: {
        venues: venuesCount ?? 0,
        passes: passesCount ?? 0,
        latestPass: (latestPass || [])[0] || null,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
