import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));

  if (!email) {
    return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
  }

  const supabase = supabaseServer;

  const { error } = await supabase.auth.admin.createUser({
    email,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  const { error: sendError } = await supabase.auth.api.sendMagicLinkEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/account`,
    }
  );

  if (sendError) {
    return NextResponse.json({ ok: false, error: sendError.message });
  }

  return NextResponse.json({ ok: true });
}
