import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function DevelopersPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>DEVELOPERS</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Developer platform
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        AXW becomes infrastructure when developers can issue credentials, verify tokens, and consume event proofs via clean APIs.
      </p>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <Card title="Issue API" body="Create tokenized access credentials programmatically." code="POST /api/issue" />
        <Card title="Verify API" body="Verify credentials at the edge or through your own apps." code="POST /api/verify" />
        <Card title="Revoke API" body="Invalidate a token and record proof instantly." code="POST /api/revoke" />
        <Card title="Events API" body="Read the operational ledger of issued, verified, and revoked credentials." code="GET /api/events" />
      </div>
    </MarketingShell>
  );
}

function Card({ title, body, code }: { title: string; body: string; code: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "white" }}>
      <div style={{ fontWeight: 950, fontSize: 15 }}>{title}</div>
      <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.55 }}>{body}</div>
      <div
        style={{
          marginTop: 10,
          fontSize: 12,
          fontWeight: 900,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
        }}
      >
        {code}
      </div>
    </div>
  );
}
