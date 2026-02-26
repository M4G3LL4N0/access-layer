import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type CookiePair = { name: string; value: string; options?: any };

export async function supabaseServerAuth() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        const all = cookieStore.getAll();
        return all.map((c) => ({ name: c.name, value: c.value }));
      },
      setAll(cookiePairs: CookiePair[]) {
        for (const c of cookiePairs) {
          try {
            cookieStore.set(c.name, c.value, c.options);
          } catch {
            void 0;
          }
        }
      },
    },
  });

  const { data: userData } = await supabase.auth.getUser();
  const { data: sessData } = await supabase.auth.getSession();

  return { supabase, user: userData.user ?? null, session: sessData.session ?? null };
}
