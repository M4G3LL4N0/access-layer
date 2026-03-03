export const dynamic = "force-static";

const BUILD_STAMP = "NETWORK_OK_2026-02-26_1907PST";

export default function NetworkPage() {
  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ fontSize: 34, margin: 0 }}>Network</h1>

      <p style={{ marginTop: 10, color: "#444", lineHeight: 1.55 }}>
        Network view is live. Next step: connect Supabase-backed topology + live metrics.
      </p>

      <div
        style={{
          marginTop: 18,
          border: "1px solid #eee",
          borderRadius: 14,
          padding: 16,
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 16 }}>Status</h2>
          <span
            style={{
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fafafa",
            }}
          >
            ONLINE
          </span>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Card title="Routing" value="OK" />
          <Card title="Render" value="OK" />
          <Card title="Data" value="Not connected" />
          <Card title="Next" value="Wire topology" />
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <A href="/venues">Venues</A>
          <A href="/analytics">Analytics</A>
          <A href="/admin">Admin</A>
        </div>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        Build stamp: <code>{BUILD_STAMP}</code>
      </p>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 18 }}>{value}</div>
    </div>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: 10,
        textDecoration: "none",
        color: "black",
        background: "white",
      }}
    >
      {children}
    </a>
  );
}
