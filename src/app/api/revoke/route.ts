import { NextResponse } from "next/server";
import { verifyAxwToken } from "@/lib/axw/token";
import { supabaseServerService } from "@/lib/supabaseServer";
import { logAxwEvent } from "@/lib/axw/events";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body?.token || "");

    if (!token) {
      return NextResponse.json({ ok: false, error: "token is required" }, { status: 400 });
    }

    const verified = verifyAxwToken(token);
    if (!verified.ok) {
      return NextResponse.json({ ok: false, error: verified.error }, { status: 400 });
    }

    const supabase = supabaseServerService();

    const { error } = await supabase
      .from("tokens")
      .update({
        revoked: true,
        revoked_at: new Date().toISOString(),
      })
      .eq("token_jti", verified.payload.jti);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    await logAxwEvent({
      venue_id: verified.payload.venueId,
      credential_id: verified.payload.credentialId,
      token_jti: verified.payload.jti,
      action: "revoke",
      result: "allow",
      metadata: {},
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Revoke failed" }, { status: 500 });
  }
}
