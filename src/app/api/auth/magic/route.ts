import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/magic
 * Body: { "email": "owner@venue.com" }
 *
 * Sends a Supabase magic link that returns to:
 *   https://app.accessxworld.com/auth/callback?next=/account
 *
 * IMPORTANT:
 * - This uses the anon key (safe for sign-in flows).
 * - The /auth/callback route handler exchanges ?code=... for a session + sets cookies.
 */
export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Missing or invalid email" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL; // should be https://app.accessxworld.com

    if (!supabaseUrl || !anonKey) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY" },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_APP_BASE_URL (should be https://app.accessxworld.com)" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, anonKey);

    const emailRedirectTo = `${baseUrl}/auth/callback?next=/account`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo,
      },
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, hint: "If you see rate limit exceeded, wait a bit or use Google login." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, email, emailRedirectTo });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
