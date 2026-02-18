"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Signing you in…");

  useEffect(() => {
    async function handleAuthCallback() {
      const access_token = searchParams.get("access_token");
      const refresh_token = searchParams.get("refresh_token");

      if (!access_token || !refresh_token) {
        setStatus("⚠️ Missing auth tokens in callback URL");
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
        setStatus("❌ " + error.message);
        return;
      }

      router.replace("/account");
    }

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <p>{status}</p>
    </main>
  );
}
