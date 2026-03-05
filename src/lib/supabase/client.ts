import { createClient } from "@supabase/supabase-js";
import { hasSupabasePublicEnv, requiredEnv } from "./env";

export function supabaseBrowser() {
  if (!hasSupabasePublicEnv()) return null;

  return createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      auth: { persistSession: true, autoRefreshToken: true },
    }
  );
}
