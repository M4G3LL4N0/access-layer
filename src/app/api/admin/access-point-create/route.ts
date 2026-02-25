import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function assertAdmin(req: Request) {
  const token = new URL(req.url).searchParams.get("token") || "";
  return token && token === process.env.ADMIN_SEED_TOKEN;
}

export async function POST(req: Request) {
  try {
    if (!assertAdmin(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const venueId = String(body.venueId || "");
    const type = String(body.type || "");
    const label = String(body.label || "");
    const identifier = body.identifier ? String(body.identifier) : null;
    const meta = typeof body.meta === "object" && body.meta ? body.meta : {};

    if (!venueId || !type || !label) {
      return NextResponse.json({ ok: false, error: "Missing venueId/type/label" }, { status: 400 });
    }

    const supabase = await supabaseServer();

    const { data: venue, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .maybeSingle();

    if (vErr) return NextResponse.json({ ok: false, error: vErr.message }, { status: 400 });
    if (!venue?.id) return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });

    const { data: inserted, error } = await supabase
      .from("access_points")
      .insert([{ venue_id: venueId, type, label, identifier, meta, status: "active" }])
      .select("id, venue_id, type, label, identifier, status, meta, created_at")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true, venue, accessPoint: inserted });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
