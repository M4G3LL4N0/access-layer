import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = supabaseServerAuth();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/account", req.url));
}
