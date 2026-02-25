import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400, extra?: Record<string, any>) {
  return NextResponse.json({ ok: false, error: message, ...(extra ?? {}) }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const dryRun = Boolean(body?.dryRun);

    const supabase = await supabaseServer();

    const rows = [
      {
        name: "SF Pilot Venue",
        city: "San Francisco",
        region: "CA",
        venue_type: "warehouse",
        status: "active",
      },
    ];

    if (dryRun) {
      return NextResponse.json({ ok: true, dryRun: true, rows });
    }

    const { error } = await supabase.from("venues").insert(rows);

    if (error) {
      return jsonError("Seed insert failed", 400, { detail: error.message });
    }

    return NextResponse.json({ ok: true, inserted: rows.length });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
