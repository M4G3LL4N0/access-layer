import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

const VERSION = "create-invite-v2-debug";
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

async function sampleVenues() {
  const { data } = await supabaseServer
    .from("venues")
    .select("id,name,created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data || [];
}

// CLICKABLE DEBUG (GET)
export async function GET(req: Request) {
  const u = new URL(req.url);
  const token = u.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized", version: VERSION }, { status: 401 });
  }

  return NextResponse.json({
    version: VERSION,
    supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
    supabaseUrlPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    anonKeyPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    serviceRolePresent: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    sampleVenues: await sampleVenues(),
  });
}

// INVITE CREATION (POST)
export async function POST(req: Request) {
  const urlObj = new URL(req.url);
  const token = urlObj.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized", version: VERSION }, { status: 401 });
  }

  const form = await req.formData();
  const venueIdRaw = String(form.get("venueId") || "");
  const venueId = venueIdRaw.trim();
  const email = String(form.get("email") || "").trim().toLowerCase();

  if (!UUID_RE.test(venueId)) {
    return NextResponse.json(
      { error: "Invalid venueId format", received: venueIdRaw, version: VERSION },
      { status: 400 }
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Invalid email", received: email, version: VERSION },
      { status: 400 }
    );
  }

  // Check venue exists in THIS DB
  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("id,name,created_at")
    .eq("id", venueId)
    .maybeSingle();

  if (vErr) {
    return NextResponse.json(
      { error: "Venue lookup failed", details: vErr.message, version: VERSION },
      { status: 500 }
    );
  }

  if (!venue) {
    return NextResponse.json(
      {
        error: "VenueId not found in venues table (FK would fail).",
        venueId,
        version: VERSION,
        supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
        sampleVenues: await sampleVenues(),
      },
      { status: 400 }
    );
  }

  const inviteToken = token32();
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

  const { error } = await supabaseServer.from("venue_owner_invites").insert({
    venue_id: venueId,
    email,
    token: inviteToken,
    expires_at: expires,
  });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        version: VERSION,
        supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
        venueFound: venue,
        sampleVenues: await sampleVenues(),
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    version: VERSION,
    supabaseRef: supabaseRefFromUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || ""),
    venue: { id: venue.id, name: venue.name },
    inviteToken,
    expires_at: expires,
  });
}
