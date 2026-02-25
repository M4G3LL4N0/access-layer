import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await supabaseServer();

    // ✅ IMPORTANT: await the query BEFORE destructuring
    const { data, error } = await supabase
      .from("venues")
      .select("id,name,city,region,status,created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, count: data?.length ?? 0, venues: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
