import { createClient } from "@supabase/supabase-js";
import { ENV } from "@/lib/env";

export function supabaseServer() {
  return createClient(ENV.SUPABASE_URL(), ENV.SUPABASE_ANON_KEY(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function supabaseServerService() {
  return createClient(ENV.SUPABASE_URL(), ENV.SUPABASE_SERVICE_ROLE_KEY(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
