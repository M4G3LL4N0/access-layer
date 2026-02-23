import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

export async function GET() {
  const { supabase, user, session } = await supabaseServerAuth();

  return NextResponse.json({
    ok: true,
    user,
    session,
  });
}
