import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  const form = await req.formData();
  const venueId = String(form.get("venueId") || "");
  const name = String(form.get("name") || "").trim();
  const status = String(form.get("status") || "active");

  if (!UUID_RE.test(venueId)) {
    return NextResponse.redirect(new URL(`/account?error=bad_venueId`, req.url));
  }

  if (!name) {
    return NextResponse.redirect(new URL(`/manage/${venueId}?err=missing_name`, req.url));
  }

  const supabase = await supabaseServerAuth();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  // This update is protected by RLS policy "owners can update their venue"
  const { error } = await supabase
    .from("venues")
    .update({ name, status })
    .eq("id", venueId);

  if (error) {
    return NextResponse.redirect(new URL(`/manage/${venueId}?err=${encodeURIComponent(error.message)}`, req.url));
  }

  return NextResponse.redirect(new URL(`/manage/${venueId}?ok=1`, req.url));
}
