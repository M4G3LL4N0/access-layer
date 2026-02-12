import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

function token32() {
  return crypto.randomBytes(24).toString("base64url");
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const venueId = String(form.get("venueId") || "");
  const email = String(form.get("email") || "").trim().toLowerCase();

  const inviteToken = token32();
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

  const { error } = await supabaseServer.from("venue_owner_invites").insert({
    venue_id: venueId,
    email,
    token: inviteToken,
    expires_at: expires,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Return token so you can copy/paste it into an email immediately.
  return NextResponse.json({ ok: true, inviteToken, expires_at: expires });
}
