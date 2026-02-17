import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function supabaseServerAuth() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Create a server Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  // Parse cookies to attempt reading a session
  const cookieStore = cookies();
  const token = cookieStore.get("supabase-auth-token");

  let user = null;

  if (token && token.value) {
    // Try to fetch the session/user from Supabase
    const { data } = await supabase.auth.getUser(token.value);
    user = data.user ?? null;
  }

  return { supabase, user };
}
