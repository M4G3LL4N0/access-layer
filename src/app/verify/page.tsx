"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function verify() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const json = await res.json();
    setResult(json);
    setLoading(false);
  }

  const valid = result?.valid === true;

  return (
    <main
      style={{
        fontFamily: "system-ui",
        minHeight: "100vh",
        background: "#0b0b0c",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Verify Access Pass</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Staff verifier. Paste a token to confirm if it’s valid (active + not expired).
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste token…"
            style={{
              flex: 1,
              minWidth: 260,
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              outline: "none",
              fontWeight: 700,
            }}
          />

          <button
            onClick={verify}
            disabled={loading || !token.trim()}
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              border: "none",
              background: "white",
              color: "black",
              fontWeight: 900,
              cursor: "pointer",
              opacity: loading || !token.trim() ? 0.6 : 1,
            }}
          >
            {loading ? "Checking..." : "Verify"}
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.12)",
              background: valid ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              {valid ? "✅ VALID PASS" : "❌ INVALID PASS"}
            </div>

            <div style={{ marginTop: 8, opacity: 0.9 }}>
              Reason: <b>{String(result.reason || "unknown")}</b>
            </div>

            {result.pass && (
              <div style={{ marginTop: 10, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>
                <div>venue_id: {result.pass.venue_id}</div>
                <div>status: {result.pass.status}</div>
                <div>issued_at: {result.pass.issued_at}</div>
                <div>expires_at: {result.pass.expires_at}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 18, opacity: 0.65, fontSize: 12 }}>
          Tip: Generate a token from a kiosk page, then verify it here.
        </div>
      </div>
    </main>
  );
}
