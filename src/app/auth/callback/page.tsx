"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      const params = new URLSearchParams(window.location.search);

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (!access_token || !refresh_token) {
        console.error("Missing tokens in callback URL");
        router.push("/login");
        return;
      }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error("Error setting session:", error);
        router.push("/login");
        return;
      }

      router.push("/account");
    }

    handleAuth();
  }, [router]);

  return (
    <main style={{ padding: 40 }}>
      <h1>Signing you in…</h1>
      <p>Please wait.</p>
    </main>
  );
}
