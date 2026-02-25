import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifySignedPassToken } from "@/lib/signedToken";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body?.token ?? "");
    const reason = String(body?.reason ?? "manual revoke");

    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
    }

    const v = await verifySignedPassToken(token);
    if (!v.ok) {
      return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 400 });
    }

    const supabase = await supabaseServer();

    const { error: insErr } = await supabase
      .from("token_denylist")
      .insert([
        {
          token,
          reason,
          venue_id: v.payload.venueId,
          exp: v.payload.exp ?? null,
        },
      ]);

    if (insErr) {
      return NextResponse.json(
        { ok: false, error: insErr.message ?? String(insErr) },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
