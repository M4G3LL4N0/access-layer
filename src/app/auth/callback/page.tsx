"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Signing in…");

  useEffect(() => {
    async function handleAuthCallback() {
      const access_token = searchParams.get("access_token");
      const refresh_token = searchParams.get("refresh_token");

      // Ensure tokens exist
      if (!access_token || !refresh_token) {
        setStatus("⚠️ Missing auth tokens in callback URL");
        return;
      }

      const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setStatus("❌ " + error.message);
        return;
      }

      // Redirect to account
      router.replace("/account");
    }

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <p>{status}</p>
    </main>
  );
}
