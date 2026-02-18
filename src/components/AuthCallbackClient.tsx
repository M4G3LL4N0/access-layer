"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function parseHash(hash: string) {
  const h = hash.startsWith("#") ? hash.slice(1) : hash;
  const p = new URLSearchParams(h);
  return {
    access_token: p.get("access_token"),
    refresh_token: p.get("refresh_token"),
    type: p.get("type"),
  };
}

export default function AuthCallbackClient() {
  const sp = useSearchParams();
  const nextPath = useMemo(() => sp.get("next") || "/account", [sp]);
  const [msg, setMsg] = useState("Completing sign-in…");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const supabase = supabaseBrowser(); // ✅ IMPORTANT: CALL IT

        // If Supabase provides a code (PKCE)
        const code = sp.get("code");
        if (code) {
          setMsg("Exchanging code for session…");
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;

          if (!cancelled) window.location.href = nextPath;
          return;
        }

        // If Supabase provides tokens in the URL hash (magic link implicit flow)
        const { access_token, refresh_token } = parseHash(window.location.hash || "");
        if (access_token && refresh_token) {
          setMsg("Setting session from magic link…");
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;

          // Clean hash so it doesn't linger in the URL bar
          try {
            const cleanUrl = `${window.location.pathname}${window.location.search}`;
            window.history.replaceState({}, "", cleanUrl);
          } catch {}

          if (!cancelled) window.location.href = nextPath;
          return;
        }

        setMsg("Missing code/token. Please request a new magic link.");
      } catch (e: any) {
        setMsg(`Auth error: ${e?.message || String(e)}`);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [sp, nextPath]);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 18px", fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>Auth</h1>
      <p style={{ opacity: 0.85, marginTop: 10 }}>{msg}</p>

      <div style={{ marginTop: 18, fontSize: 12, opacity: 0.65, lineHeight: 1.5 }}>
        <div>Debug:</div>
        <div>pathname: {typeof window !== "undefined" ? window.location.pathname : ""}</div>
        <div>search: {typeof window !== "undefined" ? window.location.search : ""}</div>
        <div>hash: {typeof window !== "undefined" ? window.location.hash : ""}</div>
      </div>
    </main>
  );
}
