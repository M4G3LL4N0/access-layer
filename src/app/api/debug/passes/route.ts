import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("access_passes")
    .select("id,venue_id,status,issued_at,expires_at,created_at,token")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, count: data?.length || 0, data });
}
