import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));

  if (!email) {
    return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
  }

  const supabase = supabaseServer;

  // Send magic link with callback path
  const { error } = await supabase.auth.api.sendMagicLinkEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/callback`,
    }
  );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({ ok: true });
}
