import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function RolloutPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>ROLLOUT</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Multi-venue rollout tools
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        Once a pilot works, rollout should feel like software deployment, not custom operations. AXW is designed to scale policies,
        devices, and proofs across many locations.
      </p>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card title="Template rollout" body="Clone policy and operating patterns across many venues." />
        <Card title="Venue onboarding" body="Provision spaces, entrypoints, and devices faster." />
        <Card title="Central governance" body="Track rollout state and policy differences in one place." />
        <Card title="Operational consistency" body="Keep staff workflows aligned across the network." />
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
