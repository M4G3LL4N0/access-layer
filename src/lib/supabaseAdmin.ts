import { createClient } from "@supabase/supabase-js";

/**
 * Server-only admin client (bypasses RLS) using SERVICE ROLE KEY.
 * Never import this in client components.
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL missing");
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY missing");

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
