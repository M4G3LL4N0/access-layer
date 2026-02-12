import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function clampInt(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function isTimeHHMM(s: string) {
  return /^\d{2}:\d{2}$/.test(s);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const venueId = String(form.get("venueId") || "");
  const ruleId = String(form.get("ruleId") || "");

  const label = String(form.get("label") || "").trim();
  const start_time = String(form.get("start_time") || "").trim();
  const end_time = String(form.get("end_time") || "").trim();

  const max_per_day = clampInt(Number(form.get("max_per_day") || 0), 0, 1000);
  const cooldown_minutes = clampInt(Number(form.get("cooldown_minutes") || 0), 0, 24 * 60);
  const mode = String(form.get("mode") || "show_pass");
  const is_active = String(form.get("is_active") || "true") === "true";

  if (!UUID_RE.test(venueId) || !UUID_RE.test(ruleId)) {
    return NextResponse.redirect(new URL(`/account?error=bad_ids`, req.url));
  }

  if (!label) return NextResponse.redirect(new URL(`/manage/${venueId}?err=missing_label`, req.url));
  if (!isTimeHHMM(start_time) || !isTimeHHMM(end_time)) {
    return NextResponse.redirect(new URL(`/manage/${venueId}?err=bad_time_format`, req.url));
  }

  const supabase = await supabaseServerAuth();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) return NextResponse.redirect(new URL(`/login`, req.url));

  // Protected by RLS on access_rules
  const { error } = await supabase
    .from("access_rules")
    .update({
      label,
      start_time,
      end_time,
      max_per_day,
      cooldown_minutes,
      mode,
      is_active,
    })
    .eq("id", ruleId)
    .eq("venue_id", venueId);

  if (error) {
    return NextResponse.redirect(new URL(`/manage/${venueId}?err=${encodeURIComponent(error.message)}`, req.url));
  }

  return NextResponse.redirect(new URL(`/manage/${venueId}?ok=1`, req.url));
}
