"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMsg("");

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : undefined;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus("error");
      setMsg(error.message);
      return;
    }
    setStatus("sent");
    setMsg("Magic link sent. Check your email.");
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 720, margin: "0 auto" }}>
      <Link href="/owners" style={{ opacity: 0.8 }}>← Owners</Link>

      <h1 style={{ marginTop: 14, fontSize: 34, fontWeight: 950 }}>Owner login</h1>
      <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
        Sign in via magic link. Once verified, you can manage venues you’ve been invited to.
      </p>

      <form onSubmit={sendLink} style={{ marginTop: 14 }}>
        <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="owner@venue.com"
          style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
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
          }}
        >
          Send magic link
        </button>
      </form>

      {msg && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            background: status === "error" ? "#fee" : "#f0fff4",
            border: "1px solid #eee",
            fontWeight: 800,
          }}
        >
          {msg}
        </div>
      )}

      <div style={{ marginTop: 18, opacity: 0.75 }}>
        After you click the magic link, you’ll be sent to your account page.
      </div>
    </main>
  );
}
