import MarketingShell from "@/components/MarketingShell";

export const dynamic = "force-static";

function Card({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "black",
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: -0.2 }}>{title}</div>
      <div style={{ color: "#444", lineHeight: 1.5, fontSize: 14 }}>{body}</div>
      <div style={{ marginTop: 6, fontWeight: 900, fontSize: 13 }}>{cta} →</div>
    </a>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, border: "1px solid #e8e8e8", background: "white", fontSize: 13, fontWeight: 800 }}>
      {children}
    </span>
  );
}

export default function OperatorsPage() {
  return (
    <MarketingShell>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 900, letterSpacing: 1 }}>AXW CONSOLE</div>
          <h1 style={{ margin: "8px 0 0", fontSize: 44, letterSpacing: -0.9 }}>Operators</h1>
          <p style={{ marginTop: 10, color: "#333", lineHeight: 1.6, fontSize: 16, maxWidth: 860 }}>
            Operator tooling for venue access, devices, and verification flows. The goal is simple: faster ops with audit-grade proof.
            Start in Admin, select a venue, then jump into Ops.
          </p>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Chip>Faster throughput</Chip>
            <Chip>Less fraud</Chip>
            <Chip>Cleaner incident trails</Chip>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/admin/ops" style={{ padding: "12px 14px", borderRadius: 999, border: "1px solid #e6e6e6", background: "white", textDecoration: "none", color: "black", fontWeight: 900 }}>
            Admin Ops →
          </a>
          <a href="/venues" style={{ padding: "12px 14px", borderRadius: 999, border: "1px solid #e6e6e6", background: "white", textDecoration: "none", color: "black", fontWeight: 900 }}>
            Venues →
          </a>
          <a href="/network" style={{ padding: "12px 14px", borderRadius: 999, border: "1px solid #e6e6e6", background: "white", textDecoration: "none", color: "black", fontWeight: 900 }}>
            Network →
          </a>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card
          title="Admin → Ops"
          body="Select a venue, view health + controls, then open its ops page."
          href="/admin/ops"
          cta="Go"
        />
        <Card
          title="Admin → Venues"
          body="Manage venues + status. This is where rollout starts."
          href="/admin/venues"
          cta="Manage"
        />
        <Card
          title="Ops Console (venue)"
          body="Venue-scoped ops: /ops/[venueId]. Pick a venue then open ops."
          href="/admin/ops"
          cta="Open"
        />
      </div>

      <div style={{ marginTop: 18, border: "1px solid #eee", borderRadius: 18, padding: 18, background: "linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)" }}>
        <div style={{ fontWeight: 900 }}>Health shortcuts</div>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/api/health" style={{ padding: "10px 12px", borderRadius: 999, border: "1px solid #e6e6e6", background: "white", textDecoration: "none", color: "black", fontWeight: 900, fontSize: 13 }}>
            /api/health
          </a>
          <a href="/api/debug/venues" style={{ padding: "10px 12px", borderRadius: 999, border: "1px solid #e6e6e6", background: "white", textDecoration: "none", color: "black", fontWeight: 900, fontSize: 13 }}>
            /api/debug/venues
          </a>
          <a href="/api/kiosk/stats" style={{ padding: "10px 12px", borderRadius: 999, border: "1px solid #e6e6e6", background: "white", textDecoration: "none", color: "black", fontWeight: 900, fontSize: 13 }}>
            /api/kiosk/stats
          </a>
        </div>
      </div>
    </MarketingShell>
  );
}
