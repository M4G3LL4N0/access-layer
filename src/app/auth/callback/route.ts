export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/account";

  // If no code, send them back to login with a useful error
  if (!code) {
    return NextResponse.redirect(new URL(`/login?error=missing_code`, url.origin));
  }

  const supabase = supabaseServerAuth();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=oauth_exchange_failed`, url.origin)
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
