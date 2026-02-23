import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function supabaseServerAuth() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url) throw new Error("Missing SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL");
  if (!anon)
    throw new Error(
      "Missing SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );

  const supabase = createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const h = await headers();
  const authHeader = h.get("authorization") || h.get("Authorization");
  const token = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : null;

  if (!token) {
    return { supabase, user: null, session: null };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    return { supabase, user: null, session: null };
  }

  return { supabase, user: data.user ?? null, session: null };
}
