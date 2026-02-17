"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KioskPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function issuePass() {
    setErr(null);
    setResult(null);

    if (!venueId) {
      setErr("Missing venueId (page param)");
      return;
    }

    try {
      const fd = new FormData();
      fd.set("venueId", venueId);

      const res = await fetch("/api/kiosk/issue-pass", {
        method: "POST",
        body: fd,
      });

      const j = await res.json();

      if (!res.ok || !j.ok) {
        setErr(j.error || `HTTP ${res.status}`);
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
        <div>
          <b>venueId:</b>{" "}
          <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
            {venueId || "(missing)"}
          </span>
        </div>
      </div>

      <button
        onClick={issuePass}
        style={{
          marginBottom: 14,
          padding: "10px 14px",
          borderRadius: 10,
          fontWeight: 800,
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Issue access pass
      </button>

      {err && (
        <div style={{ color: "red", marginBottom: 12 }}>
          <strong>Error:</strong> {err}
        </div>
      )}

      {result && (
        <pre
          style={{
            padding: 12,
            borderRadius: 10,
            background: "#f7f7f7",
            overflowX: "auto",
            fontSize: 13,
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
