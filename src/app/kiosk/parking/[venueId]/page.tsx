"use client";

import { useMemo, useState } from "react";

export default function ParkingKioskPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params.venueId;

  const [plate, setPlate] = useState("");
  const [minutes, setMinutes] = useState(120);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const styles = useMemo(() => {
    const border = "1px solid rgba(148, 163, 184, 0.22)";
    const text = "rgba(255,255,255,0.92)";
    const muted = "rgba(255,255,255,0.60)";
    return {
      page: {
        minHeight: "100vh",
        padding: 18,
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        color: text,
        background:
          "radial-gradient(1200px 700px at 20% 10%, rgba(59,130,246,0.16), transparent 60%), #020617",
      } as const,
      card: {
        maxWidth: 720,
        margin: "0 auto",
        borderRadius: 18,
        border,
        background: "rgba(2,6,23,0.85)",
        padding: 18,
      } as const,
      h1: { fontSize: 28, fontWeight: 950, margin: "0 0 6px" } as const,
      p: { margin: 0, color: muted, lineHeight: 1.5 } as const,
      input: {
        width: "100%",
        boxSizing: "border-box" as const,
        padding: "14px 14px",
        borderRadius: 14,
        border,
        background: "rgba(2,6,23,0.55)",
        color: text,
        fontSize: 18,
        fontWeight: 800,
        outline: "none",
        letterSpacing: 1.2,
      } as const,
      row: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        marginTop: 14,
      } as const,
      row2: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        marginTop: 12,
      } as const,
      btn: {
        width: "100%",
        boxSizing: "border-box" as const,
        padding: "14px 14px",
        borderRadius: 14,
        border: "none",
        background: "white",
        color: "black",
        fontWeight: 950,
        fontSize: 16,
        cursor: "pointer",
      } as const,
      pill: {
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        border,
        color: muted,
        fontSize: 12,
        fontWeight: 800,
      } as const,
      box: {
        marginTop: 14,
        borderRadius: 14,
        border,
        background: "rgba(15,23,42,0.55)",
        padding: 12,
        color: muted,
        fontSize: 13,
        lineHeight: 1.55,
        wordBreak: "break-word" as const,
      } as const,
      ok: {
        marginTop: 12,
        borderRadius: 14,
        padding: 12,
        border: "1px solid rgba(34,197,94,0.35)",
        background: "rgba(34,197,94,0.10)",
        fontWeight: 900,
      } as const,
      bad: {
        marginTop: 12,
        borderRadius: 14,
        padding: 12,
        border: "1px solid rgba(239,68,68,0.35)",
        background: "rgba(239,68,68,0.10)",
        fontWeight: 900,
      } as const,
    };
  }, []);

  async function issue() {
    setErr(null);
    setResp(null);
    setLoading(true);
    try {
      const r = await fetch("/api/parking/issue", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ venueId, plate, minutes }),
      });
      const j = await r.json();
      if (!r.ok || !j?.ok) {
        setErr(j?.error || `Failed (HTTP ${r.status})`);
      } else {
        setResp(j);
      }
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  const token = resp?.validation?.token;
  const verifyUrl = token
    ? `/api/parking/verify?token=${encodeURIComponent(token)}`
    : null;

  return (
    <main style={styles.page}>
      <style>{`
        @media (min-width: 760px) {
          .row2 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={styles.h1}>Parking Validation (Kiosk)</h1>
            <p style={styles.p}>
              Enter a plate to issue a time-bounded validation token (default 2 hours).
            </p>
          </div>
          <div style={styles.pill}>venueId: {venueId}</div>
        </div>

        <div style={styles.row}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.75)", marginBottom: 8 }}>
              License plate
            </div>
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="ABC1234"
              style={styles.input}
              autoCapitalize="characters"
              autoCorrect="off"
              inputMode="text"
            />
          </div>

          <div className="row2" style={styles.row2}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.75)", marginBottom: 8 }}>
                Minutes
              </div>
              <input
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value || 120))}
                type="number"
                min={5}
                max={1440}
                style={{ ...styles.input, letterSpacing: 0, fontWeight: 900 }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "end" }}>
              <button onClick={issue} style={styles.btn} disabled={loading}>
                {loading ? "Issuing…" : "Issue access pass"}
              </button>
            </div>
          </div>
        </div>

        {err && <div style={styles.bad}>Error: {err}</div>}

        {resp?.ok && (
          <div style={styles.ok}>
            Issued ✓ Token: <span style={{ fontFamily: "ui-monospace", fontWeight: 950 }}>{token}</span>
            <div style={styles.box}>
              Verify URL (for gate/attendant):{" "}
              <span style={{ fontFamily: "ui-monospace" }}>{verifyUrl}</span>
              <div style={{ marginTop: 8 }}>
                Expires:{" "}
                <span style={{ fontFamily: "ui-monospace" }}>
                  {resp?.validation?.expires_at}
                </span>
              </div>
            </div>
          </div>
        )}

        <div style={styles.box}>
          <b>Deploy pattern:</b> Put this page on a tablet at checkout, or convert to QR signage.
          Gate system calls the verify URL to open the barrier.
        </div>
      </div>
    </main>
  );
}
