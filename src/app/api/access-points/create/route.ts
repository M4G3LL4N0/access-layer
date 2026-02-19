import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const venueId = String(body.venueId || "");
    const name = String(body.name || "");
    const type = String(body.type || "");
    const external_ref = body.external_ref ? String(body.external_ref) : null;
    const status = body.status ? String(body.status) : "active";
    const meta = body.meta && typeof body.meta === "object" ? body.meta : {};

    if (!venueId) return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    if (!name) return NextResponse.json({ ok: false, error: "Missing name" }, { status: 400 });
    if (!type) return NextResponse.json({ ok: false, error: "Missing type" }, { status: 400 });

    const supabase = supabaseServer();

    // Confirm venue exists
    const { data: v, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .maybeSingle();

    if (vErr) return NextResponse.json({ ok: false, error: vErr.message }, { status: 400 });
    if (!v) return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });

    const { data, error } = await supabase
      .from("access_points")
      .insert([{ venue_id: venueId, name, type, external_ref, status, meta }])
      .select("id, venue_id, name, type, external_ref, status, meta, created_at")
      .maybeSingle();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true, venue: v, accessPoint: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
