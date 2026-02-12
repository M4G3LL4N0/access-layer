"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AuthCallbackPage() {
  const sp = useSearchParams();
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    const run = async () => {
      const code = sp.get("code");
      const next = sp.get("next") || "/account";

      if (!code) {
        setMsg("Missing code. Please request a new magic link.");
        return;
      }

      const { error } = await supabaseBrowser.auth.exchangeCodeForSession(code);
      if (error) {
        setMsg(`Sign-in failed: ${error.message}`);
        return;
      }

      // Hard redirect so the app reloads with the session
      window.location.href = next;
    };

    run();
  }, [sp]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 950 }}>Auth</h1>
      <p style={{ opacity: 0.85 }}>{msg}</p>
    </main>
  );
}
