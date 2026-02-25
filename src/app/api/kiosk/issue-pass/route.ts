import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function randomToken(len = 18) {
  return crypto.randomBytes(len).toString("base64url");
}

function jsonError(message: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

export async function POST(req: Request) {
  try {
    // Accept venueId from:
    // - form post (kiosk UI)
    // - JSON body (future / programmatic)
    // - query string (fallback)
    const url = new URL(req.url);
    const qsVenueId = url.searchParams.get("venueId") || "";

    let venueId = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      venueId = String(body?.venueId || "");
    } else {
      const form = await req.formData().catch(() => null);
      if (form) venueId = String(form.get("venueId") || "");
    }

    if (!venueId) venueId = qsVenueId;

    if (!venueId) {
      return jsonError("Missing venueId", 400);
    }

    // IMPORTANT:
    // In YOUR codebase, supabaseServer is a client object (not a function).
    // So we do NOT call it.
    const supabase = await supabaseServer();

    // Confirm venue exists
    const { data: v, error: vErr } = await supabase
      .from("venues")
      .select("id,name,status")
      .eq("id", venueId)
      .limit(1);

    if (vErr) return jsonError("Venue lookup failed", 500, { detail: vErr });
    const venue = v?.[0];
    if (!venue) return jsonError("Venue not found", 404, { venueId });

    // Issue a pass (15 minutes default)
    const minutes = 15;
    const issued_at = new Date();
    const expires_at = new Date(issued_at.getTime() + minutes * 60 * 1000);
    const token = randomToken(18);

    const { data: inserted, error: insErr } = await supabase
      .from("access_passes")
      .insert([
        {
          venue_id: venueId,
          token,
          status: "active",
          issued_at: issued_at.toISOString(),
          expires_at: expires_at.toISOString(),
        },
      ])
      .select("token,created_at,expires_at,status,venue_id")
      .limit(1);

    if (insErr) return jsonError("Insert failed", 500, { detail: insErr });

    return NextResponse.json({
      ok: true,
      venue: { id: venue.id, name: venue.name },
      pass: inserted?.[0] || null,
      passUrl: `/pass/${token}`,
      verifyUrl: `/verify?token=${encodeURIComponent(token)}`,
    });
  } catch (e: any) {
    return jsonError("Unexpected error", 500, { detail: String(e?.message || e) });
  }
}
