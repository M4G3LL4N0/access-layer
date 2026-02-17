import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Redeem an invite using token + email
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { venueId, token, email } = body || {};

    if (!venueId || !token || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing venueId, token, or email" },
        { status: 400 }
      );
    }

    // Create supabase client with SERVICE ROLE
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Look up the invite by token
    const { data: inviteData, error: inviteErr } = await supabase
      .from("venue_owner_invites")
      .select("*")
      .eq("token", token)
      .single();

    if (inviteErr || !inviteData) {
      return NextResponse.json(
        { ok: false, error: "Invite token not found" },
        { status: 404 }
      );
    }

    // Confirm invite matches venueId/email
    if (inviteData.venue_id !== venueId || inviteData.email !== email) {
      return NextResponse.json(
        { ok: false, error: "Venue ID or email does not match invite" },
        { status: 400 }
      );
    }

    // Create or retrieve the user by email
    const { data: userData, error: userErr } = await supabase.auth.admin.upsertUser({
      email,
    });

    if (userErr || !userData.user) {
      return NextResponse.json(
        { ok: false, error: "Failed to create or get user" },
        { status: 500 }
      );
    }

    const userId = userData.user.id;

    // Add user as a venue_owner
    const { error: ownerErr } = await supabase
      .from("venue_owners")
      .insert([{ venue_id: venueId, user_id: userId, role: "owner" }]);

    if (ownerErr) {
      return NextResponse.json(
        { ok: false, error: "Failed to add user as venue owner" },
        { status: 500 }
      );
    }

    // Optionally delete the invite so it can’t be used again
    await supabase
      .from("venue_owner_invites")
      .delete()
      .eq("id", inviteData.id);

    return NextResponse.json({ ok: true, userId });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
