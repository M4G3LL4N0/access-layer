import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function jsonError(msg: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: msg, ...(extra || {}) }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const token = String(body?.token || "");
    if (!token) return jsonError("Missing token");

    if (process.env.ADMIN_SEED_TOKEN && token !== process.env.ADMIN_SEED_TOKEN) {
      return jsonError("Unauthorized", 401);
    }

    // Accept either { venue: {...} } or direct fields
    const v = (body?.venue && typeof body.venue === "object" ? body.venue : body) as any;

    const name = String(v?.name || "Pilot Venue — New Location");
    const address = v?.address ? String(v.address) : null;
    const city = String(v?.city || "San Francisco");
    const region = String(v?.region || "CA");
    const country = String(v?.country || "US");
    const category = String(v?.category || "workspace");
    const status = String(v?.status || "active");

    const lat = v?.lat === null || v?.lat === undefined || v?.lat === "" ? null : Number(v.lat);
    const lng = v?.lng === null || v?.lng === undefined || v?.lng === "" ? null : Number(v.lng);

    const supabase = await supabaseServer();

    // ✅ IMPORTANT: await the insert query BEFORE destructuring
    const { data: venue, error: vErr } = await supabase
      .from("venues")
      .insert({
        name,
        address,
        city,
        region,
        country,
        category,
        status,
        lat,
        lng,
        created_by: null,
      })
      .select("id,name,city,region,country,category,status,created_at")
      .maybeSingle();

    if (vErr) return jsonError("Seed venue insert failed", 500, { detail: vErr.message });

    return NextResponse.json({ ok: true, venue });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
