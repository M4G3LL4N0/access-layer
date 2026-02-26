"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function V3TestPage() {
  const [venueId, setVenueId] = useState("");
  const [subjectId, setSubjectId] = useState("demo");
  const [apId, setApId] = useState("");
  const [token, setToken] = useState("");
  const [log, setLog] = useState<string>("");

  const canEval = useMemo(() => !!token && !!apId && !!venueId, [token, apId, venueId]);

  useEffect(() => {
    setLog("1) Go to /v3/seed first.\n2) Paste venueId + accessPointId here.\n3) Issue token, then Evaluate.\n");
  }, []);

  async function issue() {
    setLog(l => l + "\nIssuing token...\n");
    const res = await fetch("/api/v3/issue", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ venueId, subjectType: "user", subjectId, scopes: ["door.open"], ttlMinutes: 60 })
    });
    const j = await res.json();
    setLog(l => l + JSON.stringify(j, null, 2) + "\n");
    if (j?.token) setToken(j.token);
  }

  async function evaluate() {
    setLog(l => l + "\nEvaluating...\n");
    const res = await fetch("/api/v3/evaluate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token,
        action: "door.open",
        resourceType: "access_point",
        resourceId: apId,
        context: { always: true }
      })
    });
    const j = await res.json();
    setLog(l => l + JSON.stringify(j, null, 2) + "\n");
  }

  async function revoke() {
    setLog(l => l + "\nRevoking...\n");
    const res = await fetch("/api/v3/revoke", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, reason: "test" })
    });
    const j = await res.json();
    setLog(l => l + JSON.stringify(j, null, 2) + "\n");
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 24, marginBottom: 10 }}>AXW 3.0 Test</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <Link href="/v3/seed" style={btn()}>Seed</Link>
        <Link href="/v3/policies" style={btn()}>Policies</Link>
        <Link href="/v3/audit" style={btn()}>Audit</Link>
        <Link href="/v3" style={btn()}>Back</Link>
      </div>

      <div style={{ display: "grid", gap: 10, ...card() }}>
        <label>
          venueId
          <input value={venueId} onChange={e => setVenueId(e.target.value)} style={inp()} placeholder="paste venueId from /v3/seed" />
        </label>

        <label>
          accessPointId
          <input value={apId} onChange={e => setApId(e.target.value)} style={inp()} placeholder="paste accessPointId from /v3/seed" />
        </label>

        <label>
          subjectId
          <input value={subjectId} onChange={e => setSubjectId(e.target.value)} style={inp()} />
        </label>

        <label>
          token
          <textarea value={token} onChange={e => setToken(e.target.value)} style={ta()} placeholder="issue token to fill, or paste" />
        </label>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={issue} style={primary()}>Issue token</button>
          <button onClick={evaluate} disabled={!canEval} style={btn2(!canEval)}>Evaluate</button>
          <button onClick={revoke} disabled={!token} style={btn2(!token)}>Revoke</button>
        </div>
      </div>

      <pre style={{ marginTop: 14, ...pre() }}>{log}</pre>
    </main>
  );
}

function btn(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 10,
    textDecoration: "none",
    color: "black",
    background: "white"
  };
}

function card(): React.CSSProperties {
  return { padding: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, background: "white" };
}

function inp(): React.CSSProperties {
  return { width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" };
}

function ta(): React.CSSProperties {
  return { width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", minHeight: 90 };
}

function primary(): React.CSSProperties {
  return { padding: "10px 12px", borderRadius: 10, border: "1px solid black", background: "black", color: "white", cursor: "pointer" };
}

function btn2(disabled: boolean): React.CSSProperties {
  return { padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", background: disabled ? "rgba(0,0,0,0.05)" : "white", cursor: disabled ? "not-allowed" : "pointer" };
}

function pre(): React.CSSProperties {
  return { padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)", background: "white", overflowX: "auto" };
}
