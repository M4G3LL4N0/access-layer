"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function humanizeError(e: string | null) {
  if (!e) return "";
  if (e === "missing_code") return "Auth callback missing code. Try signing in again.";
  if (e === "oauth_exchange_failed") return "OAuth exchange failed (Supabase/Google redirect issue).";
  return e;
}

export default function LoginClient() {
  const sp = useSearchParams();
  const error = sp.get("error");
  const errorMsg = humanizeError(error);

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string>("");

  // IMPORTANT: redirectTo MUST be a plain, whitelisted URL with no extra query params.
  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/auth/callback`;
  }, []);

  async function signInGoogle() {
    setErr("");
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setErr(error.message);
  }

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    const { error } = await supabaseBrowser.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setErr(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 560, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 950 }}>Owner login</h1>
      <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
        Sign in via Google (recommended) or email magic link. Once verified, you can manage venues you’ve been invited to.
      </p>

      {(errorMsg || err) && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            background: "#fff3f3",
            border: "1px solid #ffd2d2",
            fontWeight: 900,
          }}
        >
          {errorMsg ? <div>{errorMsg}</div> : null}
          {err ? <div style={{ marginTop: errorMsg ? 8 : 0 }}>{err}</div> : null}
        </div>
      )}

      <button
        onClick={signInGoogle}
        style={{
          marginTop: 14,
          width: "100%",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid var(--card-border)",
          background: "var(--card-bg)",
          fontWeight: 950,
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>

      <div style={{ marginTop: 14, opacity: 0.6, fontWeight: 900, textAlign: "center" }}>or</div>

      {sent ? (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            background: "#f0fff4",
            border: "1px solid #c9f2d3",
            fontWeight: 900,
          }}
        >
          Link sent. Check your email and click the magic link.
        </div>
      ) : (
        <form onSubmit={sendLink} style={{ marginTop: 14 }}>
          <label style={{ display: "block", fontWeight: 950, marginBottom: 8 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="owner@venue.com"
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid var(--card-border)" }}
          />
          <button
            style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 10,
              background: "black",
              color: "white",
              border: "none",
              fontWeight: 950,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Send magic link
          </button>
        </form>
      )}

      <div style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
        After auth you’ll be sent to <b>/account</b>.
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.55 }}>
        OAuth redirect target: <span style={{ fontFamily: "ui-monospace" }}>{redirectTo}</span>
      </div>
    </main>
  );
}
