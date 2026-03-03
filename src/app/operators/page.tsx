export const dynamic = "force-dynamic";

import SiteHeader from "@/components/SiteHeader";

export default function OperatorsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fafafa" }}>
      <SiteHeader />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 54px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 0.6, color: "#666", textTransform: "uppercase" }}>AXW Console</div>
            <h1 style={{ fontSize: 44, margin: "8px 0 0", lineHeight: 1.05 }}>Operators</h1>
            <p style={{ marginTop: 10, color: "#444", lineHeight: 1.55, maxWidth: 760 }}>
              Operator tooling for venue access, devices, and verification flows. Use Admin to pick a venue, then jump into Ops.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/admin/ops" style={btn}>Admin Ops</a>
            <a href="/venues" style={btn}>Venues</a>
            <a href="/network" style={btn}>Network</a>
          </div>
        </div>

        <section style={panel}>
          <div style={{ fontSize: 14, fontWeight: 650 }}>Start Here</div>
          <div style={{ marginTop: 6, fontSize: 12, color: "#666", lineHeight: 1.45 }}>
            The ops console is venue-scoped. Pick a venue in Admin and open its ops page.
          </div>

          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            <Card
              title="Admin → Ops"
              body="Select a venue, view health + controls."
              href="/admin/ops"
              foot="Go to /admin/ops"
            />
            <Card
              title="Admin → Venues"
              body="Manage venues + status."
              href="/admin/venues"
              foot="Go to /admin/venues"
            />
            <Card
              title="Ops Console (venue)"
              body="Venue-scoped ops is at /ops/[venueId]."
              href="/admin/ops"
              foot="Pick venue then open ops"
            />
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/api/health" style={chip}>/api/health</a>
            <a href="/api/debug/venues" style={chip}>/api/debug/venues</a>
            <a href="/api/kiosk/stats" style={chip}>/api/kiosk/stats</a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, body, href, foot }: { title: string; body: string; href: string; foot: string }) {
  return (
    <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "#fafafa" }}>
        <div style={{ fontSize: 14, fontWeight: 650 }}>{title}</div>
        <div style={{ marginTop: 6, fontSize: 13, color: "#444", lineHeight: 1.5 }}>{body}</div>
        <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>{foot}</div>
      </div>
    </a>
  );
}

const panel: React.CSSProperties = {
  marginTop: 18,
  background: "white",
  border: "1px solid #eee",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
};

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "white",
  color: "black",
  textDecoration: "none",
  fontSize: 13,
};

const chip: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid #eee",
  background: "white",
  color: "black",
  textDecoration: "none",
  fontSize: 12,
};
