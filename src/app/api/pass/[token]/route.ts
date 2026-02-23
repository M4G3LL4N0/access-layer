import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || token.length < 10) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("access_passes")
    .select("status,issued_at,expires_at,token,venue_id,created_at")
    .eq("token", token)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const row = data?.[0] || null;
  if (!row) {
    return NextResponse.json({ ok: false, error: "Pass not found" }, { status: 404 });
  }

  // Optional: enforce expiry server-side
  if (row.expires_at && new Date(row.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ ok: false, error: "Pass expired" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, pass: row });
}
