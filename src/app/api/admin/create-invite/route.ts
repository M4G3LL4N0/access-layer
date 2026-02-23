import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function jsonError(msg: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: msg, ...(extra || {}) }, { status });
}

async function sampleVenues() {
  const supabase = supabaseServer();

  // ✅ IMPORTANT: await the query THEN destructure data/error
  const { data, error } = await supabase
    .from("venues")
    .select("id,name,created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) return [];
  return data || [];
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const venueId = String(body?.venueId || "");
    const email = String(body?.email || "").trim().toLowerCase();

    if (!venueId) return jsonError("Missing venueId");
    if (!email) return jsonError("Missing email");

    const supabase = supabaseServer();

    // Confirm venue exists (avoid FK fail)
    const { data: venue, error: venueErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .maybeSingle();

    if (venueErr) return jsonError("Venue lookup failed", 500, { detail: venueErr.message });
    if (!venue) {
      const sv = await sampleVenues();
      return jsonError("VenueId not found in venues table (FK would fail).", 400, {
        venueId,
        sampleVenues: sv,
      });
    }

    // Create invite token
    const token = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: inviteRow, error: insErr } = await supabase
      .from("venue_owner_invites")
      .insert([{ venue_id: venueId, email, token, expires_at }])
      .select("id, venue_id, email, token, expires_at, created_at")
      .maybeSingle();

    if (insErr) {
      const sv = await sampleVenues();
      return jsonError("Failed to create invite", 500, { detail: insErr.message, sampleVenues: sv });
    }

    return NextResponse.json({
      ok: true,
      version: "create-invite-v2",
      venue,
      invite: inviteRow,
      inviteToken: inviteRow?.token,
      expires_at: inviteRow?.expires_at,
    });
  } catch (e: any) {
    const sv = await sampleVenues();
    return NextResponse.json(
      { ok: false, error: String(e?.message || e), sampleVenues: sv },
      { status: 500 }
    );
  }
}
