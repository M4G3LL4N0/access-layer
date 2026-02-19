import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Keys = {
  url: string;
  anon: string;
  service: string | null;
};

function readKeys(): Keys {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY || null;

  // Hard fail with a *useful* message (this is what stops the mystery Digests)
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing at runtime. Check Vercel env vars for Production."
    );
  }
  if (!anon) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing at runtime. Check Vercel env vars for Production."
    );
  }

  return { url, anon, service };
}

/**
 * Canonical server-side Supabase client (anon).
 * Usage:
 *   const supabase = supabaseServer();
 */
export function supabaseServer(): SupabaseClient {
  const { url, anon } = readKeys();
  return createClient(url, anon, {
    auth: { persistSession: false },
  });
}

/**
 * Canonical privileged server client (service role).
 * Usage:
 *   const supabase = supabaseServerService();
 */
export function supabaseServerService(): SupabaseClient {
  const { url, service } = readKeys();
  if (!service) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing at runtime. Needed for admin writes."
    );
  }
  return createClient(url, service, {
    auth: { persistSession: false },
  });
}
