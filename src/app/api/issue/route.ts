import { NextResponse } from "next/server";
import { issueAxwToken } from "@/lib/axw/token";
import { supabaseServerService } from "@/lib/supabaseServer";
import { logAxwEvent } from "@/lib/axw/events";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const credentialId = String(body?.credentialId || "");
    const venueId = String(body?.venueId || "");
    const scope = Array.isArray(body?.scope) ? body.scope.map(String) : [];
    const ttlSeconds = Number(body?.ttlSeconds || 43200);

    if (!credentialId || !venueId) {
      return NextResponse.json({ ok: false, error: "credentialId and venueId are required" }, { status: 400 });
    }

    const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
    const { token, payload } = issueAxwToken({
      credentialId,
      venueId,
      scope,
      exp,
    });

    const supabase = supabaseServerService();

    const { error } = await supabase.from("tokens").insert([
      {
        credential_id: credentialId,
        venue_id: venueId,
        token_jti: payload.jti,
        scope,
        expires_at: new Date(payload.exp * 1000).toISOString(),
        metadata: {},
      },
    ]);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    await logAxwEvent({
      venue_id: venueId,
      credential_id: credentialId,
      token_jti: payload.jti,
      action: "issue",
      result: "allow",
      metadata: { scope, exp: payload.exp },
    });

    return NextResponse.json({
      ok: true,
      token,
      payload,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Issue failed" }, { status: 500 });
  }
}
