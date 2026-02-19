import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const missing: string[] = [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL || null,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || null,
  });
}
