import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function supabaseServerAuth() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    return { supabase, user: null };
  }

  return { supabase, user: session.user };
}
