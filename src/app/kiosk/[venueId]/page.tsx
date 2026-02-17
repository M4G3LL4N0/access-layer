"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function KioskPage() {
  const { venueId } = useParams() as { venueId: string };
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function issuePass() {
    if (!venueId) {
      setErr("Missing venueId (route param).");
      return;
    }

    setErr(null);
    setResult(null);

    try {
      const fd = new FormData();
      fd.set("venueId", venueId);

      const r = await fetch("/api/kiosk/issue-pass", {
        method: "POST",
        body: fd,
      });
      const j = await r.json();

      if (!r.ok || !j.ok) {
        setErr(j.error || `HTTP ${r.status}`);
      } else {
        setResult(j);
      }
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>Kiosk Mode</h1>

      <div style={{ marginBottom: 14 }}>
        <strong>venueId:</strong>{" "}
        <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
          {venueId ?? "(missing)"}
        </span>
      </div>

      <button
        onClick={issuePass}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: 900,
        }}
      >
        Issue access pass
      </button>

      {err && (
        <div style={{ marginTop: 12, color: "red", fontWeight: 800 }}>
          Error: {err}
        </div>
      )}

      {result && (
        <pre
          style={{
            marginTop: 14,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 12,
            background: "#f7f7f7",
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
