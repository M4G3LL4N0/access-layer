import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase server client for Next.js App Router (Next 15/16 compatible).
 * Uses @supabase/ssr and Next cookies() for session persistence.
 */
export async function supabaseServerSSR() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // In Route Handlers, Next allows setting cookies in the response context via cookieStore.set(...)
        // cookieStore.set accepts: (name, value, options)
        for (const { name, value, ...options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });

  return supabase;
}
