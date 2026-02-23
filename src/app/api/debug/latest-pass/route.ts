import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("access_passes")
    .select("token,created_at,venue_id,status,expires_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const row = data?.[0] || null;
  return NextResponse.json({ ok: true, latest: row });
}
