import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type AnySupabase = SupabaseClient<any, "public", "public", any, any>;

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function supabaseService(): AnySupabase {
  const url = mustEnv("SUPABASE_URL");
  const key = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "X-Client-Info": "axw3-service" } }
  }) as AnySupabase;
}
