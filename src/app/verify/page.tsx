"use client";

import { useState } from "react";
import QRCode from "qrcode.react";

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/pass/${encodeURIComponent(token)}`, { cache: "no-store" });
      const json = await res.json();
      setResult({ ok: res.ok, ...json });
    } catch (e: any) {
      setResult({ ok: false, error: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  const url = token ? `${typeof window !== "undefined" ? window.location.origin : ""}/api/pass/${encodeURIComponent(token)}` : "";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 950, margin: 0 }}>Verify Access Pass</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Paste a token to verify it. This is the “staff-facing” verification tool.
      </p>

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste token…"
          style={{
            flex: "1 1 360px",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        />
        <button
          onClick={check}
          disabled={!token || loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            background: "black",
            color: "white",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {loading ? "Checking…" : "Verify"}
        </button>
      </div>

      {token ? (
        <div style={{ marginTop: 16, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ padding: 14, border: "1px solid #eee", borderRadius: 16, background: "white" }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>QR (API verification)</div>
            <QRCode value={url} size={180} />
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75, maxWidth: 220, wordBreak: "break-all" }}>
              {url}
            </div>
          </div>

          {result ? (
            <div
              style={{
                flex: "1 1 360px",
                padding: 16,
                borderRadius: 16,
                border: "1px solid #eee",
                background: "white",
              }}
            >
              <div style={{ fontWeight: 950, fontSize: 18 }}>
                {result.ok ? "✅ VALID" : "❌ INVALID"}
              </div>
              <pre
                style={{
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 12,
                  background: "#f7f7f7",
                  overflowX: "auto",
                  fontSize: 12,
                }}
              >
{JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
