import { NextResponse } from "next/server";
import { verifyAxwToken } from "@/lib/axw/token";
import { supabaseServerService } from "@/lib/supabaseServer";
import { logAxwEvent } from "@/lib/axw/events";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body?.token || "");
    const deviceId = body?.deviceId ? String(body.deviceId) : null;
    const entrypointId = body?.entrypointId ? String(body.entrypointId) : null;

    if (!token) {
      return NextResponse.json({ ok: false, error: "token is required" }, { status: 400 });
    }

    const verified = verifyAxwToken(token);
    if (!verified.ok) {
      await logAxwEvent({
        action: "verify",
        result: "deny",
        metadata: { reason: verified.error },
        device_id: deviceId,
        entrypoint_id: entrypointId,
      });

      return NextResponse.json({ ok: false, error: verified.error }, { status: 400 });
    }

    const supabase = supabaseServerService();

    const { data: tokenRow, error: tokenErr } = await supabase
      .from("tokens")
      .select("revoked, credential_id, venue_id")
      .eq("token_jti", verified.payload.jti)
      .maybeSingle();

    if (tokenErr) {
      return NextResponse.json({ ok: false, error: tokenErr.message }, { status: 400 });
    }

    if (!tokenRow) {
      await logAxwEvent({
        action: "verify",
        result: "deny",
        token_jti: verified.payload.jti,
        metadata: { reason: "Token not found" },
        device_id: deviceId,
        entrypoint_id: entrypointId,
      });

      return NextResponse.json({ ok: false, error: "Token not found" }, { status: 404 });
    }

    if (tokenRow.revoked) {
      await logAxwEvent({
        venue_id: tokenRow.venue_id,
        credential_id: tokenRow.credential_id,
        token_jti: verified.payload.jti,
        action: "verify",
        result: "deny",
        metadata: { reason: "Revoked token" },
        device_id: deviceId,
        entrypoint_id: entrypointId,
      });

      return NextResponse.json({ ok: false, error: "Token revoked" }, { status: 403 });
    }

    await logAxwEvent({
      venue_id: tokenRow.venue_id,
      credential_id: tokenRow.credential_id,
      token_jti: verified.payload.jti,
      action: "verify",
      result: "allow",
      metadata: { scope: verified.payload.scope },
      device_id: deviceId,
      entrypoint_id: entrypointId,
    });

    return NextResponse.json({
      ok: true,
      payload: verified.payload,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Verify failed" }, { status: 500 });
  }
}
