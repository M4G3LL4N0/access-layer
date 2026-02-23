"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function sendMagicLink(e: any) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/auth/magic", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const j = await res.json();

      if (j.ok) {
        setMessage("Magic link sent! Check your email.");
      } else {
        setMessage("Error: " + (j.error || "failed"));
      }
    } catch (err: any) {
      setMessage("Network error");
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Owner Login</h1>

      <form onSubmit={sendMagicLink} style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="owner@venue.com"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            marginBottom: 12,
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            background: "black",
            color: "white",
            borderRadius: 6,
            fontWeight: 800,
          }}
        >
          Send Magic Link
        </button>
      </form>

      {message && (
        <div style={{ marginTop: 12, fontSize: 14 }}>{message}</div>
      )}
    </main>
  );
}
