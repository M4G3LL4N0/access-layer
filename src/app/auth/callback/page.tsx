"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [err, setErr] = useState("");

  useEffect(() => {
    async function handleCallback() {
      const supabase = createClientComponentClient();

      const access_token = searchParams.get("access_token");
      const refresh_token = searchParams.get("refresh_token");

      if (!access_token || !refresh_token) {
        setErr("Missing auth parameters");
        return;
      }

      // Save session to Supabase via URL tokens
      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setErr(error.message);
        return;
      }

      router.replace("/account");
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      {err ? (
        <div style={{ color: "red", fontWeight: 700 }}>
          Auth callback error: {err}
        </div>
      ) : (
        <div>Signing you in…</div>
      )}
    </main>
  );
}
