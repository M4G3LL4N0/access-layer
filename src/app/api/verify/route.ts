import { NextResponse } from "next/server";
import * as SB from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function getSupabase() {
  const anySB = SB as any;
  if (typeof anySB.supabaseServer === "function") return anySB.supabaseServer();
  if (anySB.supabaseServer) return anySB.supabaseServer;
  if (typeof anySB.default === "function") return anySB.default();
  if (anySB.default) return anySB.default;
  throw new Error("supabaseServer export not found in @/lib/supabaseServer");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const token = String(body?.token || "").trim();

    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Avoid .single() coercion errors: select + limit(1)
    const { data, error } = await supabase
      .from("access_passes")
      .select("token,status,issued_at,expires_at,venue_id")
      .eq("token", token)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ ok: false, valid: false, reason: "not_found" }, { status: 200 });
    }

    const pass = data[0];
    const now = Date.now();
    const exp = new Date(pass.expires_at).getTime();

    if (pass.status !== "active") {
      return NextResponse.json({ ok: true, valid: false, reason: "inactive", pass }, { status: 200 });
    }

    if (now > exp) {
      return NextResponse.json({ ok: true, valid: false, reason: "expired", pass }, { status: 200 });
    }

    return NextResponse.json({ ok: true, valid: true, reason: "active", pass }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
