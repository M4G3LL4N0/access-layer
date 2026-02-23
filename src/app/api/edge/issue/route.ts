import { NextResponse } from "next/server";
import { issueSignedPassToken } from "@/lib/signedToken";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const venueId = String(body.venueId || "");
    const minutes = Number(body.minutes || 15);

    if (!venueId) return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    if (!Number.isFinite(minutes) || minutes < 1 || minutes > 24 * 60)
      return NextResponse.json({ ok: false, error: "Bad minutes" }, { status: 400 });

    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
    const { token, payload } = issueSignedPassToken(venueId, expiresAt);

    // optional: persist record for analytics + correlation (but verification is stateless)
    supabaseServer().from("access_passes").insert([
      {
        venue_id: venueId,
        token,
        status: "active",
        issued_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        requester_id: payload.jti, // reuse as stable id if you want
      },
    ]);

    return NextResponse.json({
      ok: true,
      venueId,
      token,
      expires_at: expiresAt.toISOString(),
      verifyUrl: `/api/edge/verify`,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
