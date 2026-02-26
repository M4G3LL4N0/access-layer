import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/axw3/supabase";
import { issueSignedPassToken } from "@/lib/axw3/tokens";
import { auditEvent } from "@/lib/axw3/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const venueId = String(body.venueId ?? "");
    const subjectType = String(body.subjectType ?? "user");
    const subjectId = String(body.subjectId ?? "");
    const ttlMinutes = Number(body.ttlMinutes ?? 60);
    const scopes = Array.isArray(body.scopes) ? body.scopes.map(String) : [];

    if (!venueId) return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    if (!subjectId) return NextResponse.json({ ok: false, error: "Missing subjectId" }, { status: 400 });

    const { token, payload } = issueSignedPassToken({ venueId, subjectType, subjectId, scopes, ttlMinutes });

    const sb = supabaseService();
    await sb.from("axw_tokens").insert([
      {
        jti: payload.jti,
        venue_id: venueId,
        subject_type: subjectType,
        subject_id: subjectId,
        scopes,
        expires_at: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
        meta: { v: 3 }
      }
    ]);

    await auditEvent({
      venueId,
      actorType: subjectType,
      actorId: subjectId,
      action: "token.issue",
      resourceType: "token",
      resourceId: payload.jti,
      ok: true,
      meta: { scopes, ttlMinutes }
    });

    return NextResponse.json({ ok: true, token, payload });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "issue_failed" }, { status: 500 });
  }
}
