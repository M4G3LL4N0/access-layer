export const dynamic = "force-dynamic";

function Card({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 14,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div style={{ fontWeight: 800, opacity: 0.9 }}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 900, marginTop: 6 }}>{value}</div>
      {sub ? <div style={{ opacity: 0.75, marginTop: 6 }}>{sub}</div> : null}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "system-ui",
        background: "#0b0f17",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900 }}>Network Analytics</h1>
        <p style={{ marginTop: 10, opacity: 0.8, fontSize: 16 }}>
          Demo metrics for investor preview. (Live metrics can be wired to Supabase
          aggregation next.)
        </p>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 14,
          }}
        >
          <Card title="Active Venues" value="32" sub="Pilot + seeded demo network" />
          <Card title="Requests (30 days)" value="4,832" sub="Rate-limited + rule-enforced" />
          <Card title="Pass Issuance Rate" value="78%" sub="Denied mostly by cooldown/rules" />
          <Card title="Projected MRR" value="$12,430" sub="Venue SaaS + paid access fees" />
        </div>

        <div
          style={{
            marginTop: 26,
            padding: 18,
            borderRadius: 14,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>
            Moat: The Access Graph
          </h2>
          <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
            Each successful access event strengthens the network: policy templates, demand
            signals by city/category, compliance logs, fraud patterns, and enterprise
            integration learnings. This compounds into a defensible access coordination layer.
          </p>
        </div>
      </div>
    </main>
  );
}
