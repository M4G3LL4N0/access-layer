import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Canonical server-side Supabase clients (LAZY).
 *
 * IMPORTANT:
 * - Do NOT create the client at module-load time (it breaks builds when env is missing).
 * - Always call supabaseServer() / supabaseServerService() inside handlers/pages.
 */

type AnyClient = SupabaseClient<any, "public", "public", any, any>;

function mustGet(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required.`);
  return v;
}

/** Anon-key client (RLS enforced) */
export function supabaseServer(): AnyClient {
  const url = mustGet("NEXT_PUBLIC_SUPABASE_URL");
  const anon = mustGet("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url, anon, {
    auth: { persistSession: false },
  });
}

/** Service-role client (admin bypass RLS) — use ONLY in server routes */
export function supabaseServerService(): AnyClient {
  const url = mustGet("NEXT_PUBLIC_SUPABASE_URL");
  const key = mustGet("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
