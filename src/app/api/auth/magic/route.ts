import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "");

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing email" },
        { status: 400 }
      );
    }

    // Create a server Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Send magic link to email
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Must exactly match redirect URLs registered in Supabase
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
