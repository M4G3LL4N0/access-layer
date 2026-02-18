import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, venueId, updateData } = body || {};

    // Validate required fields
    if (!userId || !venueId || !updateData) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing userId, venueId, or updateData",
        },
        { status: 400 }
      );
    }

    // Use service role key to create admin supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verify user is an owner of this venue
    const { data: ownerCheck, error: ownerErr } = await supabase
      .from("venue_owners")
      .select("*")
      .eq("venue_id", venueId)
      .eq("user_id", userId)
      .single();

    if (ownerErr || !ownerCheck) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized — user is not owner of this venue" },
        { status: 403 }
      );
    }

    // Perform the venue update
    const { error: updateErr } = await supabase
      .from("venues")
      .update(updateData)
      .eq("id", venueId);

    if (updateErr) {
      return NextResponse.json(
        { ok: false, error: "Failed to update venue: " + updateErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
