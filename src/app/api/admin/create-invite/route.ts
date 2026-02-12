import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function token32() {
  return crypto.randomBytes(24).toString("base64url");
}

function supabaseRefFromUrl(u: string) {
  try {
    const url = new URL(u);
    return url.hostname.split(".")[0] || "";
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  // Admin token gate
  const urlObj = new URL(req.url);
  const token = urlObj.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const venueIdRaw = String(form.get("venueId") || "");
  const venueId = venueIdRaw.trim();
  const email = String(form.get("email") || "").trim().toLowerCase();

  // Basic validation
  if (!UUID_RE.test(venueId)) {
    return NextResponse.json(
      {
        error: "Invalid venueId format",
        received: venueIdRaw,
      },
      { status: 400 }
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Invalid email", received: email },
      { status: 400 }
    );
  }

  // ---- DIAGNOSTIC: confirm venue exists in THIS DATABASE ----
  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("id,name,created_at")
    .eq("id", venueId)
    .maybeSingle();

  if (vErr) {
    return NextResponse.json(
      { error: "Venue lookup failed", details: vErr.message },
      { status: 500 }
    );
  }

  if (!venue) {
    // Return helpful debug info: sample venues + current supabase ref
    const { data: sample } = await supabaseServer
      .from("venues")
      .select("id,name,created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json(
      {
        error: "VenueId not found in venues table (FK would fail).",
        venueId,
        sampleVenues: sample || [],
        supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
      },
      { status: 400 }
    );
  }

  // Insert invite
  const inviteToken = token32();
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

  const { error } = await supabaseServer.from("venue_owner_invites").insert({
    venue_id: venueId,
    email,
    token: inviteToken,
    expires_at: expires,
  });

  if (error) {
    // Also return diag info on failure
    return NextResponse.json(
      {
        error: error.message,
        venueFound: venue,
        supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    venue: { id: venue.id, name: venue.name },
    inviteToken,
    expires_at: expires,
    supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
  });
}
