"use client";

import { useState } from "react";

export default function HardwareConsole() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function verifyToken() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/hardware/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult({ allow: false, reason: "Network error" });
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Hardware Verification Console</h1>
      <p>
        Simulates a parking gate, smart lock, QR scanner, or access controller.
      </p>

      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste access token"
        style={{
          padding: 10,
          width: 400,
          marginRight: 10,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      <button
        onClick={verifyToken}
        style={{
          padding: "10px 16px",
          background: "black",
          color: "white",
          borderRadius: 6,
        }}
      >
        Verify
      </button>

      {loading && <p>Checking...</p>}

      {result && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: result.allow ? "#e6ffed" : "#ffe6e6",
            borderRadius: 8,
          }}
        >
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
