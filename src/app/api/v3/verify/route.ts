import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/axw3/supabase";
import { verifySignedPassToken } from "@/lib/axw3/tokens";
import { auditEvent } from "@/lib/axw3/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body.token ?? "");
    if (!token) return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });

    const v = verifySignedPassToken(token);
    if (!v.ok) {
      await auditEvent({ action: "token.verify", ok: false, meta: { error: v.error } });
      return NextResponse.json({ ok: false, error: v.error }, { status: 401 });
    }

    const sb = supabaseService();
    const { data: denied } = await sb.from("axw_token_denylist").select("jti").eq("jti", v.payload.jti).maybeSingle();
    if (denied?.jti) {
      await auditEvent({
        venueId: v.payload.venueId,
        actorType: v.payload.subjectType,
        actorId: v.payload.subjectId,
        action: "token.verify",
        ok: false,
        meta: { error: "revoked" }
      });
      return NextResponse.json({ ok: false, error: "revoked" }, { status: 401 });
    }

    await auditEvent({
      venueId: v.payload.venueId,
      actorType: v.payload.subjectType,
      actorId: v.payload.subjectId,
      action: "token.verify",
      resourceType: "token",
      resourceId: v.payload.jti,
      ok: true
    });

    return NextResponse.json({ ok: true, payload: v.payload });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "verify_failed" }, { status: 500 });
  }
}
