import { NextResponse } from "next/server";

function decodeJwtPayload(token?: string) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const json = Buffer.from(parts[1], "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return null;
    }
  })();

  const payload = decodeJwtPayload(anon);

  return NextResponse.json({
    ok: true,
    supabaseUrlPresent: Boolean(url),
    supabaseHost: host,
    supabaseRefFromHost: host?.split(".")[0] || null,
    anonKeyPresent: Boolean(anon),
    anonRefFromJwt: payload?.ref || null,
    anonRoleFromJwt: payload?.role || null,
    note:
      "If anonRefFromJwt or supabaseRefFromHost doesn't match the Supabase project you enabled Google on, your app is pointing to the wrong project/env vars.",
  });
}
