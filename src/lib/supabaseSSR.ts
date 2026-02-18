import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server-side Supabase client that can READ/WRITE auth cookies in Next.js App Router.
 * This avoids deprecated auth helpers and works with Next's cookie APIs.
 */
export async function supabaseSSR() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        // Next 16+ cookie store API
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Supabase SSR gives cookies in the shape: { name, value, options }
        // Next's cookieStore.set supports either:
        //   cookieStore.set(name, value, options)
        // or
        //   cookieStore.set({ name, value, ...options })
        //
        // We use the object form to avoid typing mismatches.
        for (const c of cookiesToSet) {
          const { name, value, options } = c as any;

          cookieStore.set({
            name,
            value,
            ...(options || {}),
          } as any);
        }
      },
    },
  });
}
