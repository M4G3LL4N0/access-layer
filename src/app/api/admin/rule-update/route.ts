import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const venueId = String(form.get("venueId") || "");

  const rule_name = String(form.get("rule_name") || "Default Pilot Rule");
  const is_enabled = String(form.get("is_enabled") || "true") === "true";
  const access_mode = String(form.get("access_mode") || "show_pass");
  const start_time = String(form.get("start_time") || "08:00");
  const end_time = String(form.get("end_time") || "18:00");
  const max_per_day = Number(form.get("max_per_day") || 3);
  const cooldown_min = Number(form.get("cooldown_min") || 30);

  // Update the latest rule if it exists; otherwise insert one
  const latest = await supabaseServer
    .from("access_rules")
    .select("id")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latest.data?.id) {
    const { error } = await supabaseServer
      .from("access_rules")
      .update({
        rule_name,
        is_enabled,
        access_mode,
        start_time,
        end_time,
        max_grants_per_user_per_day: max_per_day,
        min_minutes_between_grants: cooldown_min,
      })
      .eq("id", latest.data.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  } else {
    const { error } = await supabaseServer.from("access_rules").insert({
      venue_id: venueId,
      rule_name,
      is_enabled,
      access_mode,
      start_time,
      end_time,
      max_grants_per_user_per_day: max_per_day,
      min_minutes_between_grants: cooldown_min,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL(`/admin/venues/${venueId}?token=${encodeURIComponent(token)}&ok=1`, req.url));
}
