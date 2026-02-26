import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/axw3/supabase";
import { verifySignedPassToken } from "@/lib/axw3/tokens";
import { evaluatePolicies } from "@/lib/axw3/policy";
import { auditEvent } from "@/lib/axw3/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body.token ?? "");
    const action = String(body.action ?? "");
    const resourceType = String(body.resourceType ?? "");
    const resourceId = String(body.resourceId ?? "");
    const context = body.context && typeof body.context === "object" ? body.context : {};

    if (!token) return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
    if (!action) return NextResponse.json({ ok: false, error: "Missing action" }, { status: 400 });
    if (!resourceType) return NextResponse.json({ ok: false, error: "Missing resourceType" }, { status: 400 });
    if (!resourceId) return NextResponse.json({ ok: false, error: "Missing resourceId" }, { status: 400 });

    const v = verifySignedPassToken(token);
    if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 401 });

    const sb = supabaseService();

    const { data: denied } = await sb.from("axw_token_denylist").select("jti").eq("jti", v.payload.jti).maybeSingle();
    if (denied?.jti) return NextResponse.json({ ok: false, error: "revoked" }, { status: 401 });

    const { data: policies, error } = await sb
      .from("axw_policies")
      .select("id,effect,priority,conditions")
      .eq("venue_id", v.payload.venueId)
      .eq("status", "active")
      .eq("subject_type", v.payload.subjectType)
      .eq("subject_id", v.payload.subjectId)
      .eq("resource_type", resourceType)
      .eq("resource_id", resourceId)
      .eq("action", action);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    const result = evaluatePolicies((policies ?? []) as any, {
      subject: { type: v.payload.subjectType, id: v.payload.subjectId },
      resource: { type: resourceType, id: resourceId },
      action,
      context
    });

    await auditEvent({
      venueId: v.payload.venueId,
      actorType: v.payload.subjectType,
      actorId: v.payload.subjectId,
      action: "policy.evaluate",
      resourceType,
      resourceId,
      ok: result.allow,
      meta: { decision: result.reason, matched: result.matched, action }
    });

    return NextResponse.json({ ok: true, allow: result.allow, reason: result.reason, matched: result.matched });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "eval_failed" }, { status: 500 });
  }
}
