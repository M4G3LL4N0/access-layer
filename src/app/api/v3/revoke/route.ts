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
    const reason = String(body.reason ?? "revoked");
    if (!token) return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });

    const v = verifySignedPassToken(token);
    if (!v.ok) return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 400 });

    const sb = supabaseService();
    await sb.from("axw_token_denylist").upsert([
      {
        jti: v.payload.jti,
        venue_id: v.payload.venueId,
        reason,
        exp: v.payload.exp ? new Date(v.payload.exp * 1000).toISOString() : null
      }
    ]);

    await auditEvent({
      venueId: v.payload.venueId,
      actorType: v.payload.subjectType,
      actorId: v.payload.subjectId,
      action: "token.revoke",
      resourceType: "token",
      resourceId: v.payload.jti,
      ok: true,
      meta: { reason }
    });

    return NextResponse.json({ ok: true, jti: v.payload.jti });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "revoke_failed" }, { status: 500 });
  }
}
