import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function supabaseServerAuth() {
  // SERVICE ROLE KEY — required to read sessions server-side
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Create server supabase client
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // Read Supabase auth cookie
  const cookieStore = cookies();
  const token = cookieStore.get("sb:token");

  if (!token?.value) {
    return { supabase, session: null, user: null };
  }

  // Parse session from cookie manually
  const { data: { user }, error } = await supabase.auth.getUser(token.value);

  if (error) {
    return { supabase, session: null, user: null };
  }

  return { supabase, session: token.value, user };
}
