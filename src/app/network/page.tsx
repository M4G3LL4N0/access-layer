import MarketingShell from "@/components/MarketingShell";

export const dynamic = "force-static";

const BUILD_STAMP = "NETWORK_OK_2026-02-26_1907PST";

export default function NetworkPage() {
  return (
    <MarketingShell
      eyebrow="AXW Network"
      title="Network"
      subtitle="A live view of the access-and-space graph. Next: Supabase-backed topology + real-time metrics."
    >
      <div
        style={{
          marginTop: 6,
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 18,
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 16, letterSpacing: -0.2 }}>Status</h2>
          <span
            style={{
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fafafa",
              fontWeight: 700,
            }}
          >
            ONLINE
          </span>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          <Card title="Routing" value="OK" />
          <Card title="Render" value="OK" />
          <Card title="Data" value="Not connected" />
          <Card title="Next" value="Wire topology" />
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Pill href="/venues">Venues</Pill>
          <Pill href="/analytics">Analytics</Pill>
          <Pill href="/admin">Admin</Pill>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
          Build stamp: <code>{BUILD_STAMP}</code>
        </div>
      </div>
    </MarketingShell>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>{value}</div>
    </div>
  );
}

function Pill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px",
        border: "1px solid #ddd",
        borderRadius: 999,
        textDecoration: "none",
        color: "black",
        background: "white",
        fontWeight: 700,
        fontSize: 13,
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}
