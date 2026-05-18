"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

type Sector = "venue" | "office" | "parking" | "campus" | "logistics" | "government";

export default function V2Simulator() {
  const [sector, setSector] = useState<Sector>("parking");
  const [entrypoint, setEntrypoint] = useState("kiosk");
  const [minutes, setMinutes] = useState(120);
  const [credential, setCredential] = useState("");
  const [result, setResult] = useState<any>(null);

  const demoPolicy = useMemo(() => {
    return {
      sector,
      entrypoint,
      ttl_minutes: minutes,
      rules: ["time_window", "rate_limit", "scope", "audit_log"],
    };
  }, [sector, entrypoint, minutes]);

  function issue() {
    const token = randomToken(24);
    setCredential(token);
    setResult({
      ok: true,
      action: "issued",
      token,
      expires_in_minutes: minutes,
      policy: demoPolicy,
      next: "verify(token) at an entrypoint",
    });
  }

  function verify() {
    if (!credential.trim()) {
      setResult({ ok: false, action: "verify", error: "Missing credential/token" });
      return;
    }
    setResult({
      ok: true,
      action: "verified",
      credential: credential.trim(),
      decision: "allow",
      reason: "policy_match",
      policy: demoPolicy,
      log_event: "verify_ok",
    });
  }

  return (
    <main style={S.page}>
      <SubpageVisual variant="default" />
      <div style={S.wrap}>
        <div style={S.top}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>AXW 2.0 — Simulator</div>
            <div style={{ opacity: 0.7, fontSize: 13 }}>Demo universal access without hardware.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2" style={S.btn}>← V2 Home</Link>
            <Link href="/verify" style={S.btn}>Verifier</Link>
            <Link href="/kiosk" style={S.btn}>Kiosk</Link>
            <Link href="/investors" style={S.btn}>Investors</Link>
          </div>
        </div>

        <h1 style={S.h1}>Issue → Verify → Log (universal)</h1>
        <p style={S.p}>
          Pick a sector, choose an entrypoint, set TTL, issue a credential, then verify it.
          This is the universal model behind doors, gates, kiosks, LPR, badges, and API integrations.
        </p>

        <div style={S.grid}>
          <section style={S.card}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Configure</div>

            <label style={S.label}>Sector</label>
            <select value={sector} onChange={(e) => setSector(e.target.value as Sector)} style={S.input}>
              <option value="parking">Parking</option>
              <option value="venue">Venue</option>
              <option value="office">Office</option>
              <option value="campus">Campus</option>
              <option value="logistics">Logistics</option>
              <option value="government">Government</option>
            </select>

            <label style={S.label}>Entrypoint</label>
            <select value={entrypoint} onChange={(e) => setEntrypoint(e.target.value)} style={S.input}>
              <option value="kiosk">Kiosk</option>
              <option value="gate_arm">Gate arm</option>
              <option value="door_controller">Door controller</option>
              <option value="turnstile">Turnstile</option>
              <option value="lpr_camera">LPR camera</option>
              <option value="api_edge">API edge verifier</option>
            </select>

            <label style={S.label}>TTL (minutes)</label>
            <input
              value={minutes}
              type="number"
              min={1}
              max={1440}
              onChange={(e) => setMinutes(Number(e.target.value))}
              style={S.input}
            />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
              <button onClick={issue} style={S.btnPrimary}>Issue</button>
              <button onClick={verify} style={S.btnGhost}>Verify</button>
            </div>
          </section>

          <section style={S.card}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Credential</div>
            <input
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="token / plate / badge / pin (demo token here)"
              style={S.input}
            />
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
              Tip: Issue generates a token. In real life, this could be a plate, badge, PIN, device key, etc.
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>Policy snapshot</div>
              <pre style={S.pre}>{JSON.stringify(demoPolicy, null, 2)}</pre>
            </div>
          </section>
        </div>

        <section style={{ ...S.card, marginTop: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Result</div>
          <pre style={S.pre}>{JSON.stringify(result, null, 2)}</pre>
        </section>
      </div>
    </main>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111", minHeight: "100vh" },
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "42px 18px 90px" },
  top: { display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" },
  h1: { fontSize: 40, letterSpacing: -1.0, margin: "18px 0 8px" },
  p: { opacity: 0.82, lineHeight: 1.6, maxWidth: 920, margin: "0 0 18px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 },
  card: { border: "1px solid rgba(0,0,0,0.10)", borderRadius: 18, padding: 16, background: "#fff" },
  label: { display: "block", fontSize: 12, opacity: 0.75, marginTop: 10, marginBottom: 6, fontWeight: 800 },
  input: { width: "100%", padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.14)", outline: "none" },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", color: "inherit", fontWeight: 800, background: "#fff" },
  btnPrimary: { padding: "10px 14px", borderRadius: 14, background: "#111", color: "#fff", border: "1px solid #111", fontWeight: 900, cursor: "pointer" },
  btnGhost: { padding: "10px 14px", borderRadius: 14, background: "#fff", color: "#111", border: "1px solid rgba(0,0,0,0.14)", fontWeight: 900, cursor: "pointer" },
  pre: { margin: 0, background: "#0b0b0b", color: "#eaeaea", padding: 12, borderRadius: 14, overflowX: "auto", fontSize: 12, lineHeight: 1.5 },
};

function randomToken(len: number) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
