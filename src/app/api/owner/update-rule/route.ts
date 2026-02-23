import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { userId, venueId, ruleId, updateData } = body || {};

    // Validate required fields
    if (!userId || !venueId || !ruleId || !updateData) {
      return NextResponse.json(
        { ok: false, error: "Missing userId, venueId, ruleId, or update info" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Ensure this user is an owner of the venue
    const { data: ownerCheck, error: ownerErr } = await supabase
      .from("venue_owners")
      .select("*")
      .eq("venue_id", venueId)
      .eq("user_id", userId)
      .single();

    if (ownerErr || !ownerCheck) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized — user is not owner for this venue" },
        { status: 403 }
      );
    }

    // Update the rule
    const { error: updateErr } = await supabase
      .from("access_rules")
      .update(updateData)
      .eq("id", ruleId);

    if (updateErr) {
      return NextResponse.json(
        { ok: false, error: "Failed to update rule: " + updateErr.message },
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
