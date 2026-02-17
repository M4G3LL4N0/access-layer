"use client";

import { useEffect, useMemo, useState } from "react";

export default function KioskVenuePage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";

  const statsUrl = useMemo(() => {
    return `/api/kiosk/stats?venueId=${encodeURIComponent(venueId)}`;
  }, [venueId]);

  const [stats, setStats] = useState<any>(null);
  const [statsErr, setStatsErr] = useState<string | null>(null);

  const [issueErr, setIssueErr] = useState<string | null>(null);
  const [issuing, setIssuing] = useState(false);
  const [issued, setIssued] = useState<any>(null);

  async function loadStats() {
    setStatsErr(null);
    try {
      if (!venueId) {
        setStatsErr("Missing venueId (route param).");
        return;
      }
      const r = await fetch(statsUrl, { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || `HTTP ${r.status}`);
      setStats(j);
    } catch (e: any) {
      setStatsErr(String(e?.message || e));
    }
  }

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueId]);

  async function issuePass() {
    setIssueErr(null);
    setIssued(null);

    try {
      if (!venueId) {
        setIssueErr("Missing venueId (route param).");
        return;
      }

      setIssuing(true);

      // FormData POST (simple + reliable)
      const fd = new FormData();
      fd.set("venueId", venueId);

      const r = await fetch("/api/kiosk/issue-pass", {
        method: "POST",
        body: fd,
      });

      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || `HTTP ${r.status}`);

      setIssued(j);
      await loadStats();
    } catch (e: any) {
      setIssueErr(String(e?.message || e));
    } finally {
      setIssuing(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 1000, marginBottom: 6 }}>Kiosk Mode</h1>

      <div style={{ opacity: 0.75, marginBottom: 14 }}>
        venueId ={" "}
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
          {venueId || "(missing)"}
        </span>{" "}
        · statsUrl ={" "}
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
          {statsUrl}
        </span>
      </div>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 16,
          padding: 16,
          background: "white",
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, marginBottom: 10 }}>
          Issue an Access Pass
        </h2>

        <button
          onClick={issuePass}
          disabled={issuing || !venueId}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "none",
            background: "black",
            color: "white",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {issuing ? "Issuing…" : "Issue access pass"}
        </button>

        {issueErr && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              background: "#fff5f5",
              border: "1px solid #ffd0d0",
              fontWeight: 800,
              whiteSpace: "pre-wrap",
            }}
          >
            Error
            {"\n"}
            {issueErr}
          </div>
        )}

        {issued?.ok && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              background: "#e8fff0",
              border: "1px solid #bdf2c9",
            }}
          >
            <div style={{ fontWeight: 1000, marginBottom: 6 }}>Pass issued</div>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              token: {issued?.pass?.token}
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={`/pass/${encodeURIComponent(issued?.pass?.token)}`}
                style={{ fontWeight: 900, textDecoration: "underline" }}
              >
                Open pass →
              </a>
              <a
                href={`/verify?token=${encodeURIComponent(issued?.pass?.token)}`}
                style={{ fontWeight: 900, textDecoration: "underline" }}
              >
                Verify token →
              </a>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, marginBottom: 10 }}>Kiosk Stats</h2>

        {statsErr && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: "#fff5f5",
              border: "1px solid #ffd0d0",
              fontWeight: 800,
              whiteSpace: "pre-wrap",
            }}
          >
            Stats error:
            {"\n"}
            {statsErr}
          </div>
        )}

        <pre
          style={{
            marginTop: 0,
            padding: 12,
            borderRadius: 12,
            background: "#0b0b0b",
            color: "white",
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {JSON.stringify({ stats }, null, 2)}
        </pre>
      </div>
    </main>
  );
}
