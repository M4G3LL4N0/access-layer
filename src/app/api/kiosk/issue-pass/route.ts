import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function randomToken(len = 18) {
  return crypto.randomBytes(len).toString("base64url");
}

function asString(x: any) {
  return typeof x === "string" ? x : "";
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);

    // Accept venueId from:
    // 1) FormData  2) JSON body  3) querystring
    let venueId = asString(url.searchParams.get("venueId"));

    const ct = req.headers.get("content-type") || "";
    if (!venueId && ct.includes("multipart/form-data")) {
      const form = await req.formData();
      venueId = asString(form.get("venueId"));
    } else if (!venueId && ct.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      venueId = asString(form.get("venueId"));
    } else if (!venueId && ct.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      venueId = asString(body?.venueId);
    } else if (!venueId) {
      // try formData anyway (safe)
      const form = await req.formData().catch(() => null);
      if (form) venueId = asString(form.get("venueId"));
    }

    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }

    const supabase = supabaseServer();

    // Confirm venue exists
    const { data: v, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1);

    if (vErr) return NextResponse.json({ ok: false, error: vErr.message }, { status: 500 });
    if (!v?.[0]) return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });

    const token = randomToken(18);
    const now = new Date();
    const expires = new Date(now.getTime() + 15 * 60 * 1000); // 15 min

    const { data: inserted, error: insErr } = await supabase
      .from("access_passes")
      .insert([
        {
          venue_id: venueId,
          token,
          status: "active",
          issued_at: now.toISOString(),
          expires_at: expires.toISOString(),
        },
      ])
      .select("token,venue_id,status,issued_at,expires_at,created_at")
      .limit(1);

    if (insErr) return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });

    const pass = inserted?.[0];

    return NextResponse.json({
      ok: true,
      venue: v[0],
      pass,
      passUrl: `/pass/${encodeURIComponent(token)}`,
      verifyUrl: `/verify?token=${encodeURIComponent(token)}`,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
