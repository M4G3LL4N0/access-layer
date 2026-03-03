export const dynamic = "force-static";

export default function NetworkPage() {
  return (
    <main style={{ padding: 28, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, margin: 0 }}>Network</h1>
      <p style={{ marginTop: 10, color: "#666", lineHeight: 1.5 }}>
        Network view is live. Next step: connect topology + live metrics.
      </p>

      <div style={{ marginTop: 18, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Status</div>
        <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, color: "#444", lineHeight: 1.6 }}>
          <li>Routing: OK</li>
          <li>UI shell: OK</li>
          <li>Supabase wiring: next</li>
        </ul>
      </div>
    </main>
  );
}
