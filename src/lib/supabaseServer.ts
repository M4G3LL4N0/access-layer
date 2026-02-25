import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

/**
 * Standard server client (anon key)
 */
export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    mustEnv("NEXT_PUBLIC_SUPABASE_URL"),
    mustEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // ignore cookie write failures in RSC
          }
        },
      },
    }
  );
}

/**
 * Service-role client (admin key)
 */
export async function supabaseServerService() {
  const cookieStore = await cookies();

  return createServerClient(
    mustEnv("NEXT_PUBLIC_SUPABASE_URL"),
    mustEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // ignore
          }
        },
      },
    }
  );
}
