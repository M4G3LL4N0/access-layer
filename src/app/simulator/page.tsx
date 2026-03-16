"use client";

import MarketingShell from "@/components/MarketingShell";
import React, { useState } from "react";

export default function SimulatorPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState("");

  async function simulateVerify() {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token,
        deviceId: "sim-device-1",
        entrypointId: "sim-entry-1",
      }),
    });

    const json = await res.json();
    setResult(JSON.stringify(json, null, 2));
  }

  return (
    <MarketingShell maxWidth={920}>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>SIMULATOR</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 44, letterSpacing: -1.2, fontWeight: 950 }}>
        Device simulator
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        Simulate a real verification node without hardware. This is useful for live demos, testing, and investor walkthroughs.
      </p>

      <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste token here"
          style={{
            width: "100%",
            minHeight: 120,
            padding: 12,
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.12)",
          }}
        />

        <button
          onClick={simulateVerify}
          style={{
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "black",
            color: "white",
            fontWeight: 950,
            cursor: "pointer",
          }}
        >
          Simulate verify
        </button>

        <pre
          style={{
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 14,
            background: "#fafafa",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontSize: 12,
          }}
        >
          {result || "Run a verify action to see simulated device output."}
        </pre>
      </div>
    </MarketingShell>
  );
}
