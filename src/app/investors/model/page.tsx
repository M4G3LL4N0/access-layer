import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function InvestorsModelPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>MODEL</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        AXW 4.0 model
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        The model is simple: solve operational pain first, become embedded in daily workflows, then expand across spaces, devices,
        and governance requirements.
      </p>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card title="Wedge" body="High-frequency environments with real operational pain: venues, parking, property." />
        <Card title="Retention" body="Audit trails + policy history become mission-critical records." />
        <Card title="Expansion" body="Once one location works, multi-site rollout is a software problem." />
        <Card title="Category power" body="The trust layer becomes the default integration target." />
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
