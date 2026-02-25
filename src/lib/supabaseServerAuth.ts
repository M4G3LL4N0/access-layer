import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Convenience helper to fetch user + session on the server.
 */
export async function supabaseServerAuth() {
  const supabase = supabaseServer();

  const [{ data: userData }, { data: sessionData }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.getSession(),
  ]);

  return {
    supabase,
    user: userData.user ?? null,
    session: sessionData.session ?? null,
  };
}
