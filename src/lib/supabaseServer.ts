import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Canonical server-side Supabase clients (App Router).
 *
 * IMPORTANT RULES:
 * - supabaseServer() is a FUNCTION that returns a Supabase client.
 * - DO:   const supabase = supabaseServer();
 * - DON'T: const supabase = supabaseServer(); * - DON'T: supabaseServer()
 */

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    throw new Error(`${name} is required.`);
  }
  return v;
}

/**
 * Server client using ANON key (safe for reads, and writes when RLS permits).
 * For admin-only operations, use supabaseServerService().
 */
export function supabaseServer(): SupabaseClient {
  const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anon = mustEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  return createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        "X-Client-Info": "axw-server",
      },
    },
  });
}

/**
 * Server client using SERVICE ROLE key (bypasses RLS).
 * ONLY use in API routes that you guard with ADMIN_SEED_TOKEN (or similar).
 */
export function supabaseServerService(): SupabaseClient {
  const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
  const service = mustEnv("SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, service, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        "X-Client-Info": "axw-service",
      },
    },
  });
}
