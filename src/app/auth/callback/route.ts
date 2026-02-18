import { NextResponse } from "next/server";
import { supabaseServerSSR } from "@/lib/supabaseSSR";

/**
 * Supabase redirects here after:
 * - Magic link verify (email)
 * - OAuth (Google)
 *
 * Expected query param: ?code=...
 * We exchange code for session, set cookies, then redirect.
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const next = url.searchParams.get("next") || "/account";

    // If Supabase didn't provide a code, send user back to login with a clear message
    if (!code) {
      const loginUrl = new URL("/login", url.origin);
      loginUrl.searchParams.set("err", "missing_code");
      return NextResponse.redirect(loginUrl);
    }

    const supabase = await supabaseServerSSR();

    // Exchanges the code for a session and sets cookies via @supabase/ssr
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const loginUrl = new URL("/login", url.origin);
      loginUrl.searchParams.set("err", "exchange_failed");
      return NextResponse.redirect(loginUrl);
    }

    // Success → go to account (or next)
    return NextResponse.redirect(new URL(next, url.origin));
  } catch (e) {
    // Failsafe redirect
    const origin = new URL(req.url).origin;
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("err", "callback_exception");
    return NextResponse.redirect(loginUrl);
  }
}
