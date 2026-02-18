import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Canonical server-side Supabase clients.
 *
 * IMPORTANT:
 * - This module exports FUNCTIONS you must CALL to get a client.
 * - Do:   const supabase = supabaseServer();
 * - Do:   const admin = supabaseServerService();
 * - Do NOT do: const supabase = supabaseServer();
 * - Do NOT do: supabaseServer();
 */

function must(name: string, v?: string) {
  if (!v) throw new Error(`${name} is required.`);
  return v;
}

function supabaseUrl() {
  // Prefer NEXT_PUBLIC_SUPABASE_URL (works on server too), fallback if you ever add server-only var.
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}

function supabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
}

export function supabaseServer(): SupabaseClient {
  const url = must("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl());
  const key = must("NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseAnonKey());

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      // Prevent caching surprises in server routes
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

export function supabaseServerService(): SupabaseClient {
  const url = must("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl());
  const key = must("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY);

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
