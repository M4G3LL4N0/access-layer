"use client";

import { useEffect, useMemo, useState } from "react";

type Stats = {
  ok: boolean;
  venueId?: string;
  total?: number;
  today?: number;
  latest?: {
    token: string;
    created_at: string;
    expires_at: string;
    status: string;
  } | null;
  error?: any;
};

function safeStringify(x: any) {
  try {
    if (typeof x === "string") return x;
    return JSON.stringify(x, null, 2);
  } catch {
    return String(x);
  }
}

export default function KioskClient({ venueId }: { venueId: string }) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinErr, setPinErr] = useState<string | null>(null);

  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [lastStatsUrl, setLastStatsUrl] = useState<string>("");
  const [lastStatsRaw, setLastStatsRaw] = useState<string>("");

  const [issuing, setIssuing] = useState(false);
  const [issueErr, setIssueErr] = useState<string | null>(null);
  const [issuedToken, setIssuedToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`kiosk_unlocked_${venueId}`);
    if (saved === "1") setUnlocked(true);
  }, [venueId]);

  async function refreshStats() {
    setLoadingStats(true);
    setPinErr(null);

    const url = `/api/kiosk/stats?venueId=${encodeURIComponent(venueId)}`;
    setLastStatsUrl(url);

    try {
      const res = await fetch(url, { cache: "no-store" });
      const raw = await res.text();
      setLastStatsRaw(raw);

      if (!res.ok) {
        setStats({
          ok: false,
          error: `HTTP ${res.status} ${res.statusText}\n\n${raw}`,
        });
        return;
      }

      let json: any = null;
      try {
        json = JSON.parse(raw);
      } catch {
        setStats({
          ok: false,
          error: `Stats response was not JSON.\n\n${raw}`,
        });
        return;
      }

      setStats(json);

      if (json?.ok && json?.latest?.token) {
        setIssuedToken(String(json.latest.token));
      }
    } catch (e: any) {
      setStats({
        ok: false,
        error: safeStringify(e?.message ? e.message : e),
      });
    } finally {
      setLoadingStats(false);
    }
  }

  useEffect(() => {
    refreshStats();
    const t = setInterval(refreshStats, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueId]);

  async function unlock() {
    setPinErr(null);
    try {
      const res = await fetch("/api/kiosk/issue-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId, pin, dryRun: true }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.ok === false) {
        setPinErr(json?.error || `Invalid PIN (HTTP ${res.status})`);
        return;
      }

      setUnlocked(true);
      localStorage.setItem(`kiosk_unlocked_${venueId}`, "1");
    } catch (e: any) {
      setPinErr(safeStringify(e?.message || e));
    }
  }

  async function issuePass() {
    setIssueErr(null);
    setIssuing(true);

    try {
      const res = await fetch("/api/kiosk/issue-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId, pin }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.ok === false) {
        setIssueErr(json?.error || `Failed to issue pass (HTTP ${res.status})`);
        return;
      }

      const t = String(json?.token || "");
      setIssuedToken(t || null);
      refreshStats();
    } catch (e: any) {
      setIssueErr(safeStringify(e?.message || e));
    } finally {
      setIssuing(false);
    }
  }

  function lock() {
    setUnlocked(false);
    localStorage.removeItem(`kiosk_unlocked_${venueId}`);
  }

  const links = useMemo(() => {
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://access-layer-five.vercel.app";
    return {
      pass: issuedToken ? `${base}/pass/${issuedToken}` : null,
      verify: `${base}/verify`,
      venue: `${base}/v/${venueId}`,
      directory: `${base}/venues`,
      manage: `${base}/manage/${venueId}`,
      signage: `${base}/signage/${venueId}`,
      pilotPack: `${base}/pilot-pack/${venueId}`,
      stats: `${base}/api/kiosk/stats?venueId=${venueId}`,
    };
  }, [issuedToken, venueId]);

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
      <div style={{ width: "100%", maxWidth: 920 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Kiosk Mode</h1>
            <div style={{ opacity: 0.7, marginTop: 6, fontWeight: 700 }}>
              Venue ID: <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{venueId}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button onClick={refreshStats} style={btnGhost} disabled={loadingStats}>
              {loadingStats ? "Refreshing…" : "Refresh"}
            </button>
            <a href={links.directory} style={btnGhost}>Directory</a>
            <a href={links.venue} style={btnGhost}>Venue</a>
            <a href={links.verify} style={btnGhost}>Verify</a>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          <StatCard title="Passes issued (today)" value={loadingStats ? "…" : String(stats?.today ?? 0)} />
          <StatCard title="Passes issued (total)" value={loadingStats ? "…" : String(stats?.total ?? 0)} />
          <StatCard
            title="Latest status"
            value={
              loadingStats
                ? "…"
                : stats?.latest
                ? `${stats.latest.status} · ${new Date(stats.latest.created_at).toLocaleString()}`
                : "none"
            }
          />
        </div>

        {/* Only show if stats truly failed */}
        {stats?.ok === false && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 14,
              border: "1px solid rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.12)",
              fontWeight: 900,
              whiteSpace: "pre-wrap",
            }}
          >
            Stats error:
            {"\n"}
            {safeStringify(stats?.error || "unknown")}
          </div>
        )}

        {/* Debug panel (so we never guess again) */}
        <details style={{ marginTop: 12, opacity: 0.9 }}>
          <summary style={{ cursor: "pointer", fontWeight: 900 }}>Debug (stats fetch)</summary>
          <div style={{ marginTop: 10, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12 }}>
            <div style={{ opacity: 0.8 }}>URL:</div>
            <div style={{ padding: 10, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)" }}>
              {lastStatsUrl}
            </div>

            <div style={{ opacity: 0.8, marginTop: 10 }}>Raw response:</div>
            <div
              style={{
                padding: 10,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                whiteSpace: "pre-wrap",
                maxHeight: 240,
                overflow: "auto",
              }}
            >
              {lastStatsRaw || "(empty)"}
            </div>

            <div style={{ marginTop: 10 }}>
              <a href={links.stats} style={{ color: "white", textDecoration: "underline", fontWeight: 900 }}>
                Open stats endpoint
              </a>
            </div>
          </div>
        </details>

        {/* Unlock */}
        <div
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
            <div style={{ fontWeight: 950, fontSize: 16 }}>Staff Controls</div>
            {unlocked ? (
              <button onClick={lock} style={btnDanger}>Lock</button>
            ) : null}
          </div>

          {!unlocked ? (
            <>
              <p style={{ opacity: 0.8, marginTop: 8 }}>
                Enter staff PIN to enable one-tap issuing (prevents random public issuance).
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                  style={{
                    flex: 1,
                    minWidth: 220,
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "white",
                    outline: "none",
                    fontWeight: 800,
                    letterSpacing: 2,
                  }}
                />
                <button onClick={unlock} style={btnPrimary}>Unlock</button>
              </div>

              {pinErr && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 14,
                    border: "1px solid rgba(239,68,68,0.35)",
                    background: "rgba(239,68,68,0.12)",
                    fontWeight: 900,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {pinErr}
                </div>
              )}
            </>
          ) : (
            <>
              <p style={{ opacity: 0.85, marginTop: 8 }}>
                Ready. Tap to issue a <b>time-bounded access pass</b> (no codes).
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <button onClick={issuePass} disabled={issuing} style={{ ...btnPrimary, opacity: issuing ? 0.7 : 1 }}>
                  {issuing ? "Issuing…" : "ISSUE PASS"}
                </button>

                <a href={links.signage} style={btnGhost}>Signage</a>
                <a href={links.pilotPack} style={btnGhost}>Pilot Pack</a>
                <a href={links.manage} style={btnGhost}>Manage</a>
              </div>

              {issueErr && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 14,
                    border: "1px solid rgba(239,68,68,0.35)",
                    background: "rgba(239,68,68,0.12)",
                    fontWeight: 900,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {issueErr}
                </div>
              )}

              {issuedToken && (
                <div
                  style={{
                    marginTop: 14,
                    padding: 14,
                    borderRadius: 16,
                    border: "1px solid rgba(34,197,94,0.35)",
                    background: "rgba(34,197,94,0.12)",
                  }}
                >
                  <div style={{ fontWeight: 950, fontSize: 16 }}>Latest token issued</div>
                  <div style={{ marginTop: 8, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13 }}>
                    {issuedToken}
                  </div>

                  <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {links.pass ? (
                      <a href={links.pass} style={btnPrimary}>
                        Open Pass (QR)
                      </a>
                    ) : null}
                    <a href={links.verify} style={btnGhost}>Verify Scanner</a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ marginTop: 14, opacity: 0.65, fontSize: 12 }}>
          Demo loop: <b>Kiosk → Pass QR → Verify scan</b> (instant staff confirmation).
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ opacity: 0.7, fontWeight: 800, fontSize: 12 }}>{title}</div>
      <div style={{ marginTop: 6, fontWeight: 950, fontSize: 22 }}>{value}</div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "white",
  color: "black",
  fontWeight: 950,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const btnGhost: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const btnDanger: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(239,68,68,0.35)",
  background: "rgba(239,68,68,0.12)",
  color: "white",
  fontWeight: 950,
  cursor: "pointer",
};
