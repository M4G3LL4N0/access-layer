import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function AnalyticsPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>ANALYTICS</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Proof, not guesswork.
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 920 }}>
        AXW analytics turns access events into operational intelligence: throughput, disputes, failures, and proof of control.
      </p>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card title="Throughput" body="See how quickly spaces move people through access points." />
        <Card title="Verification health" body="Track allow/deny outcomes and identify weak points." />
        <Card title="Incident correlation" body="Tie access logs to disputes and events." />
        <Card title="Governance" body="Show how policy changes affect outcomes over time." />
      </div>
    </MarketingShell>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "white" }}>
      <div style={{ fontWeight: 950, fontSize: 15 }}>{title}</div>
      <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}
