import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * DEFINITIVE: robust server clients for Supabase
 * - supports multiple env var names (prevents Vercel/local drift)
 * - no top-level throws unless a function is actually called
 */

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim().length ? v : undefined;
}

function required(names: string[], label: string): string {
  for (const n of names) {
    const v = env(n);
    if (v) return v;
  }
  throw new Error(`${label} is required. Checked: ${names.join(", ")}`);
}

/** Public/anon client for server routes/components (RLS applies) */
export function supabaseServerAnon(): SupabaseClient {
  const url = required(["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"], "supabaseUrl");
  const anon = required(["SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY"], "supabaseAnonKey");

  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Service role client for admin/server routes (bypasses RLS) */
export function supabaseServerService(): SupabaseClient {
  const url = required(["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"], "supabaseUrl");
  const service = required(["SUPABASE_SERVICE_ROLE_KEY"], "supabaseServiceRoleKey");

  return createClient(url, service, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * BACKWARDS COMPAT:
 * Many files do: import { supabaseServer } from "@/lib/supabaseServer";
 * and then call either:
 *   - supabaseServer()
 *   - await supabaseServer()
 *   - const supabase = supabaseServer;
 *
 * So we export BOTH:
 *  - supabaseServer(): returns anon client (sync)
 *  - supabaseServer.service(): returns service client
 */
export function supabaseServer(): SupabaseClient {
  return supabaseServerAnon();
}

supabaseServer.service = (): SupabaseClient => supabaseServerService();
