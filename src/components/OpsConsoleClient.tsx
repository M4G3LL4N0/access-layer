"use client";

import { useEffect, useMemo, useState } from "react";

type StatsOk = {
  ok: true;
  venueId: string;
  venue: { id: string; name: string };
  total: number;
  today: number;
  latest: { token: string; created_at: string; expires_at: string; status: string } | null;
};
type StatsResp = StatsOk | { ok: false; error: string; where?: string };

type ParkingIssueOk = {
  ok: true;
  venue: { id: string; name: string };
  validation: { token: string; issued_at: string; expires_at: string; status: string; venue_id: string };
  verifyUrl: string;
};
type ParkingIssueResp = ParkingIssueOk | { ok: false; error: string };

type ParkingVerifyOk = { ok: true; active: boolean; token: string; expires_at?: string; venue_id?: string };
type ParkingVerifyResp = ParkingVerifyOk | { ok: false; error: string };

function Card({
  title,
  children,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 16,
        padding: 14,
        background: "white",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
        <div style={{ fontWeight: 950, fontSize: 15 }}>{title}</div>
        {subtitle ? <div style={{ opacity: 0.7, fontSize: 13 }}>{subtitle}</div> : null}
      </div>
      {children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,0.14)",
        fontWeight: 900,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

export default function OpsConsoleClient({ venueId }: { venueId: string }) {
  const [stats, setStats] = useState<StatsResp | null>(null);
  const [statsHttp, setStatsHttp] = useState<number | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const [issueBusy, setIssueBusy] = useState(false);
  const [issuedToken, setIssuedToken] = useState<string | null>(null);
  const [issueErr, setIssueErr] = useState<string | null>(null);

  const [verifyToken, setVerifyToken] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [verifyBusy, setVerifyBusy] = useState(false);

  const [minutes, setMinutes] = useState(120);
  const [plate, setPlate] = useState("");
  const [parkingIssueBusy, setParkingIssueBusy] = useState(false);
  const [parkingIssueRes, setParkingIssueRes] = useState<ParkingIssueResp | null>(null);

  const [parkingVerifyToken, setParkingVerifyToken] = useState("");
  const [parkingVerifyBusy, setParkingVerifyBusy] = useState(false);
  const [parkingVerifyRes, setParkingVerifyRes] = useState<ParkingVerifyResp | null>(null);

  const passUrl = useMemo(() => (issuedToken ? `/pass/${encodeURIComponent(issuedToken)}` : null), [issuedToken]);

  async function refreshStats() {
    setLoadingStats(true);
    setStats(null);
    setStatsHttp(null);

    try {
      const res = await fetch(`/api/kiosk/stats?venueId=${encodeURIComponent(venueId)}`, { cache: "no-store" });
      setStatsHttp(res.status);
      const j = (await res.json()) as StatsResp;
      setStats(j);
    } catch (e: any) {
      setStats({ ok: false, error: String(e?.message || e), where: "fetch" });
    } finally {
      setLoadingStats(false);
    }
  }

  useEffect(() => {
    refreshStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueId]);

  async function issuePass() {
    setIssueBusy(true);
    setIssueErr(null);
    setIssuedToken(null);

    try {
      const fd = new FormData();
      fd.set("venueId", venueId);

      const res = await fetch("/api/kiosk/issue-pass", { method: "POST", body: fd });
      const j = await res.json();

      if (!res.ok || !j?.ok) {
        setIssueErr(j?.error ? String(j.error) : `HTTP ${res.status}`);
      } else {
        // Expect { ok:true, token, passUrl }
        setIssuedToken(String(j.token || ""));
        refreshStats();
      }
    } catch (e: any) {
      setIssueErr(String(e?.message || e));
    } finally {
      setIssueBusy(false);
    }
  }

  async function verifyPassToken() {
    setVerifyBusy(true);
    setVerifyResult(null);
    try {
      const t = verifyToken.trim();
      if (!t) {
        setVerifyResult({ ok: false, error: "Missing token" });
        return;
      }
      const res = await fetch(`/api/pass/verify?token=${encodeURIComponent(t)}`, { cache: "no-store" });
      const j = await res.json();
      setVerifyResult(j);
    } catch (e: any) {
      setVerifyResult({ ok: false, error: String(e?.message || e) });
    } finally {
      setVerifyBusy(false);
    }
  }

  async function issueParking() {
    setParkingIssueBusy(true);
    setParkingIssueRes(null);
    try {
      const res = await fetch("/api/parking/issue", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ venueId, minutes, plate: plate.trim() || undefined }),
      });
      const j = (await res.json()) as ParkingIssueResp;
      setParkingIssueRes(j);
    } catch (e: any) {
      setParkingIssueRes({ ok: false, error: String(e?.message || e) });
    } finally {
      setParkingIssueBusy(false);
    }
  }

  async function verifyParking() {
    setParkingVerifyBusy(true);
    setParkingVerifyRes(null);
    try {
      const t = parkingVerifyToken.trim();
      if (!t) {
        setParkingVerifyRes({ ok: false, error: "Missing token" });
        return;
      }
      const res = await fetch(`/api/parking/verify?token=${encodeURIComponent(t)}`, { cache: "no-store" });
      const j = (await res.json()) as ParkingVerifyResp;
      setParkingVerifyRes(j);
    } catch (e: any) {
      setParkingVerifyRes({ ok: false, error: String(e?.message || e) });
    } finally {
      setParkingVerifyBusy(false);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 12,
      }}
    >
      <Card title="Live venue stats" subtitle="This is the proof-of-work counter investors care about.">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={refreshStats}
            disabled={loadingStats}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "white",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            {loadingStats ? "Refreshing…" : "Refresh"}
          </button>

          {stats && "ok" in stats && stats.ok ? (
            <>
              <Pill>Total: {stats.total}</Pill>
              <Pill>Today: {stats.today}</Pill>
              <Pill>Latest: {stats.latest ? "yes" : "none"}</Pill>
            </>
          ) : null}
        </div>

        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
          HTTP: {statsHttp ?? "—"}
        </div>

        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>
          {stats ? (
            stats.ok ? (
              <>
                <div style={{ fontWeight: 950 }}>{stats.venue?.name}</div>
                <div style={{ marginTop: 6 }}>
                  Latest token:{" "}
                  <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                    {stats.latest?.token || "—"}
                  </span>
                </div>
              </>
            ) : (
              <div style={{ background: "#fff5f5", border: "1px solid #ffd0d0", padding: 10, borderRadius: 12 }}>
                <div style={{ fontWeight: 950 }}>Error</div>
                <div>{stats.error}</div>
                {stats.where ? <div style={{ opacity: 0.75 }}>where={stats.where}</div> : null}
              </div>
            )
          ) : (
            <div style={{ opacity: 0.7 }}>No data yet.</div>
          )}
        </div>
      </Card>

      <Card title="Issue access pass (kiosk)" subtitle="Instant time-bounded pass. No codes.">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={issuePass}
            disabled={issueBusy}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            {issueBusy ? "Issuing…" : "Issue access pass"}
          </button>

          {issuedToken ? (
            <a
              href={passUrl || "#"}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                textDecoration: "none",
                fontWeight: 950,
                color: "black",
              }}
            >
              Open pass →
            </a>
          ) : null}
        </div>

        {issueErr ? (
          <div style={{ marginTop: 10, background: "#fff5f5", border: "1px solid #ffd0d0", padding: 10, borderRadius: 12 }}>
            <div style={{ fontWeight: 950 }}>Error</div>
            <div style={{ opacity: 0.9 }}>{issueErr}</div>
          </div>
        ) : null}

        {issuedToken ? (
          <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
            Token:{" "}
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{issuedToken}</span>
          </div>
        ) : null}
      </Card>

      <Card title="Staff verify (token)" subtitle="Paste a token to validate status + expiry.">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            value={verifyToken}
            onChange={(e) => setVerifyToken(e.target.value)}
            placeholder="Paste access token…"
            style={{
              flex: "1 1 220px",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <button
            onClick={verifyPassToken}
            disabled={verifyBusy}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            {verifyBusy ? "Checking…" : "Verify"}
          </button>
        </div>

        {verifyResult ? (
          <pre
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#f7f7f7",
              overflowX: "auto",
              fontSize: 12,
            }}
          >
            {JSON.stringify(verifyResult, null, 2)}
          </pre>
        ) : null}
      </Card>

      <Card title="Parking validation (issue)" subtitle="Issue a time-limited validation token (garage / lot).">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ fontSize: 12, fontWeight: 900, opacity: 0.8 }}>Minutes</label>
          <input
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value || 0))}
            type="number"
            min={1}
            style={{
              width: 110,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="Plate (optional)"
            style={{
              flex: "1 1 180px",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <button
            onClick={issueParking}
            disabled={parkingIssueBusy}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            {parkingIssueBusy ? "Issuing…" : "Issue validation"}
          </button>
        </div>

        {parkingIssueRes ? (
          <pre
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#f7f7f7",
              overflowX: "auto",
              fontSize: 12,
            }}
          >
            {JSON.stringify(parkingIssueRes, null, 2)}
          </pre>
        ) : null}

        {"ok" in (parkingIssueRes || {}) && (parkingIssueRes as any)?.ok ? (
          <div style={{ marginTop: 10, fontSize: 13 }}>
            Verify URL:{" "}
            <a href={(parkingIssueRes as ParkingIssueOk).verifyUrl} style={{ fontWeight: 950 }}>
              {(parkingIssueRes as ParkingIssueOk).verifyUrl}
            </a>
          </div>
        ) : null}
      </Card>

      <Card title="Parking validation (verify)" subtitle="Staff/exit gate checks token validity.">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            value={parkingVerifyToken}
            onChange={(e) => setParkingVerifyToken(e.target.value)}
            placeholder="Paste parking token…"
            style={{
              flex: "1 1 220px",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <button
            onClick={verifyParking}
            disabled={parkingVerifyBusy}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            {parkingVerifyBusy ? "Checking…" : "Verify"}
          </button>
        </div>

        {parkingVerifyRes ? (
          <pre
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#f7f7f7",
              overflowX: "auto",
              fontSize: 12,
            }}
          >
            {JSON.stringify(parkingVerifyRes, null, 2)}
          </pre>
        ) : null}
      </Card>
    </div>
  );
}
