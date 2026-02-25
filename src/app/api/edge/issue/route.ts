import { NextResponse } from "next/server";
import { issueSignedPassToken } from "@/lib/signedToken";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { venueId, minutes } = body;

    if (!venueId) {
      return NextResponse.json(
        { ok: false, error: "Missing venueId" },
        { status: 400 }
      );
    }

    const ttlMinutes = Number(minutes || 5);
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    // 🔥 FIX: issue token properly and await it
    const { token: tokenPromise, payload } =
      issueSignedPassToken(venueId, expiresAt);

    const token = await tokenPromise;

    // Optional: persist for analytics
    await (await supabaseServer()).from("access_passes").insert([
      {
        venue_id: venueId,
        issued_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      },
    ]);

    return NextResponse.json({
      ok: true,
      token,
      payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
