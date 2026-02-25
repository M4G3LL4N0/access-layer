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
    const id = String(body.id || "");
    const status = String(body.status || "active");

    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });

    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("access_points")
      .update({ status })
      .eq("id", id)
      .select("id, venue_id, type, label, identifier, status, meta, created_at")
      .maybeSingle();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    if (!data?.id) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, accessPoint: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
