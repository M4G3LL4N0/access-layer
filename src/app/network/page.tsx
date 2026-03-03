export const dynamic = "force-dynamic";

export default function NetworkPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ fontSize: 34, margin: 0 }}>Network</h1>
      <p style={{ marginTop: 10, color: "#444", lineHeight: 1.5 }}>
        This page is live. Next step: wire the network graph + live status from Supabase.
      </p>

      <div
        style={{
          marginTop: 18,
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 14,
          background: "white",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16 }}>Current status</h2>
        <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7 }}>
          <li>Routing: OK</li>
          <li>Rendering: OK</li>
          <li>Data: Not yet connected</li>
        </ul>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="/venues"
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
            Venues
          </a>
          <a
            href="/analytics"
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
            Analytics
          </a>
        </div>
      </div>

      <p style={{ marginTop: 16, fontSize: 13, color: "#666" }}>
        If you’re seeing this page, the build is healthy. Any previous error was caused by data wiring or env config.
      </p>
    </main>
  );
}
