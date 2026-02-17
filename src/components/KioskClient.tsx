"use client";

import { useEffect, useState } from "react";

export default function KioskClient({ venueId }: { venueId: string }) {
  const [stats, setStats] = useState<any>(null);
  const [statsErr, setStatsErr] = useState<string | null>(null);

  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function loadStats() {
    try {
      setStatsErr(null);
      const res = await fetch(`/api/kiosk/stats?venueId=${venueId}`, {
        cache: "no-store",
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || res.statusText);
      setStats(j);
    } catch (e: any) {
      setStatsErr(String(e?.message || e));
    }
  }

  async function issuePass() {
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
        await loadStats(); // refresh
      }
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
  }

  useEffect(() => {
    loadStats();
  }, [venueId]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>Kiosk Mode</h1>

      <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 18 }}>
        Venue:{" "}
        <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
          {venueId}
        </span>
      </div>

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
          Stats
        </h2>

        {statsErr && (
          <div style={{ color: "red", marginBottom: 8 }}>{statsErr}</div>
        )}

        {!stats && <div>Loading stats…</div>}

        {stats && (
          <>
            <div>Total passes issued: {stats.total}</div>
            <div>Passes today: {stats.today}</div>

            <div style={{ marginTop: 8 }}>
              Latest pass:
              {stats.latest ? (
                <div
                  style={{
                    fontFamily: "ui-monospace, Menlo, monospace",
                    marginTop: 4,
                  }}
                >
                  {stats.latest.token} (expires {new Date(stats.latest.expires_at).toLocaleTimeString()})
                </div>
              ) : (
                <div style={{ opacity: 0.7 }}>No passes yet</div>
              )}
            </div>
          </>
        )}
      </section>

      <section style={{ marginTop: 18 }}>
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
      </section>

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
            borderRadius: 10,
            background: "#fafafa",
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

