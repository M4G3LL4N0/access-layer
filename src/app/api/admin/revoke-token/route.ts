import { NextResponse } from "next/server";
import { verifySignedPassToken } from "@/lib/signedToken";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const adminToken = req.headers.get("x-admin-seed-token") || "";
    if (adminToken !== process.env.ADMIN_SEED_TOKEN) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const token = String(body.token || "");
    const reason = String(body.reason || "revoked");

    const v = verifySignedPassToken(token);
    if (!v.ok) return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 400 });

    supabaseServer().from("token_denylist").insert([{ jti: v.payload.jti, reason }]);

    return NextResponse.json({ ok: true, jti: v.payload.jti, reason });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
