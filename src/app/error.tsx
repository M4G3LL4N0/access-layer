"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        minHeight: "100vh",
        background: "#f7f7f7",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          background: "white",
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 18,
          padding: 18,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18 }}>AXW — Server error</div>
        <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5 }}>
          Something threw on the server. If you’re debugging, check Vercel runtime logs.
        </div>

        <div style={{ marginTop: 12, fontSize: 13 }}>
          <div style={{ fontWeight: 800, opacity: 0.7 }}>Digest</div>
          <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
            {error?.digest || "(none)"}
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 13 }}>
          <div style={{ fontWeight: 800, opacity: 0.7 }}>Message</div>
          <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
            {String(error?.message || error)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "black",
              color: "white",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Retry
          </button>

          <a
            href="/api/health"
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "white",
              color: "black",
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            Health check
          </a>

          <a
            href="/"
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "white",
              color: "black",
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            Home
          </a>
        </div>
      </div>
    </main>
  );
}
