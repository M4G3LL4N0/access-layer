"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginClient() {
  const sp = useSearchParams();
  const nextPath = useMemo(() => sp.get("next") || "/account", [sp]);

  const [email, setEmail] = useState("owner@venue.com");
  const [status, setStatus] = useState("");
  const [err, setErr] = useState("");

  // IMPORTANT: prefer app base url if present; fallback to window origin.
  const redirectTo = useMemo(() => {
    const base =
      (process.env.NEXT_PUBLIC_APP_BASE_URL || "").trim() ||
      (typeof window !== "undefined" ? window.location.origin : "");
    // auth callback accepts ?next=
    return `${base.replace(/\/$/, "")}/auth/callback?next=${encodeURIComponent(nextPath)}`;
  }, [nextPath]);

  async function signInGoogle() {
    try {
      setErr("");
      setStatus("Opening Google sign-in…");

      const supabase = supabaseBrowser(); // ✅ CALL IT

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) throw error;

      // Supabase will redirect; this line usually won't run.
      setStatus("Redirecting…");
    } catch (e: any) {
      setStatus("");
      setErr(e?.message || String(e));
    }
  }

  async function sendMagicLink() {
    try {
      setErr("");
      setStatus("Sending magic link…");

      const supabase = supabaseBrowser(); // ✅ CALL IT

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      setStatus("Magic link sent. Check your email.");
    } catch (e: any) {
      setStatus("");
      setErr(e?.message || String(e));
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 18px", fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>Owner login</h1>
      <p style={{ opacity: 0.8, marginTop: 10 }}>
        Sign in via Google (recommended) or email magic link. Once verified, you can manage venues you’ve been invited to.
      </p>

      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={signInGoogle}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.18)",
            background: "white",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>

      <div style={{ marginTop: 18, opacity: 0.65 }}>or</div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>Email</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@venue.com"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.18)",
          }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={sendMagicLink}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.18)",
            background: "black",
            color: "white",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Send magic link
        </button>
      </div>

      <div style={{ marginTop: 12, fontSize: 13, opacity: 0.75 }}>
        After auth you’ll be sent to <b>{nextPath}</b>.
      </div>

      {status ? <div style={{ marginTop: 14, fontSize: 13 }}>{status}</div> : null}
      {err ? <div style={{ marginTop: 14, fontSize: 13, color: "crimson" }}>{err}</div> : null}

      <div style={{ marginTop: 22, fontSize: 12, opacity: 0.65, lineHeight: 1.5 }}>
        <div>Debug:</div>
        <div>redirectTo: {redirectTo}</div>
      </div>
    </main>
  );
}
