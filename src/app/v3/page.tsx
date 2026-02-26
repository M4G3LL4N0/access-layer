import Link from "next/link";

export const dynamic = "force-dynamic";

export default function V3Home() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>AXW 3.0</h1>
      <p style={{ opacity: 0.85, marginBottom: 18 }}>
        Tokenized permissions + policy evaluation + audit logs. This is the clean base layer.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
        <Link href="/v3/seed" style={btn()}>Seed demo venue</Link>
        <Link href="/v3/policies" style={btn()}>Policies</Link>
        <Link href="/v3/test" style={btn()}>Token + Evaluate test</Link>
        <Link href="/v3/audit" style={btn()}>Audit</Link>
      </div>

      <div style={card()}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>API endpoints</h2>
        <ul style={{ lineHeight: 1.7, margin: 0, paddingLeft: 18 }}>
          <li><code>/api/v3/issue</code></li>
          <li><code>/api/v3/verify</code></li>
          <li><code>/api/v3/revoke</code></li>
          <li><code>/api/v3/evaluate</code></li>
          <li><code>/api/v3/audit</code></li>
        </ul>
      </div>
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
  return {
    padding: 16,
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 14,
    background: "white"
  };
}
