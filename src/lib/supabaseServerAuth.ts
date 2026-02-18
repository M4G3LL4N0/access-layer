import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function supabaseServerAuth() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Create a server supabase client using service role key
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, detectSessionInUrl: false },
  });

  // Read browser cookies (async)
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("supabase-auth-token");

  // If no cookie, no session
  if (!tokenCookie?.value) {
    return { supabase, session: null, user: null };
  }

  const token = tokenCookie.value;

  // Try to retrieve user
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { supabase, session: null, user: null };
  }

  return { supabase, session: token, user: data.user };
}
