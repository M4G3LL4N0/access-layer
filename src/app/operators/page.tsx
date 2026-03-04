export const dynamic = "force-static";

const BUILD_STAMP = "OPERATORS_OK_2026-03-03";

export default function OperatorsPage() {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 16px 80px" }}>
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, letterSpacing: 1.2, color: "#666" }}>AXW CONSOLE</div>
        <h1 style={{ fontSize: 56, margin: "10px 0 8px", letterSpacing: -1.2, lineHeight: 1.02 }}>Operators</h1>
        <p style={{ margin: 0, color: "#444", maxWidth: 760, lineHeight: 1.55 }}>
          Operator tooling for venue access, devices, and verification flows. Use Admin to pick a venue, then jump into Ops.
        </p>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <A href="/admin/ops">Admin Ops</A>
        <A href="/venues">Venues</A>
        <A href="/network">Network</A>
      </div>

      <section
        style={{
          marginTop: 22,
          border: "1px solid #eee",
          borderRadius: 16,
          background: "white",
          padding: 18,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16 }}>Start Here</h2>
        <p style={{ marginTop: 8, color: "#444", lineHeight: 1.55 }}>
          The ops console is venue-scoped. Pick a venue in Admin and open its ops page.
        </p>

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          <Card
            title="Admin → Ops"
            body="Select a venue, view health + controls."
            foot="Go to /admin/ops"
            href="/admin/ops"
          />
          <Card
            title="Admin → Venues"
            body="Manage venues + status."
            foot="Go to /admin/venues"
            href="/admin/venues"
          />
          <Card
            title="Ops Console (venue)"
            body="Venue-scoped ops is at /ops/[venueId]."
            foot="Pick a venue then open ops"
            href="/admin/ops"
          />
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Pill href="/api/health">/api/health</Pill>
          <Pill href="/api/debug/venues">/api/debug/venues</Pill>
          <Pill href="/api/kiosk/stats">/api/kiosk/stats</Pill>
        </div>
      </section>

      <p style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        Build stamp: <code>{BUILD_STAMP}</code>
      </p>
    </main>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "9px 12px",
        border: "1px solid #ddd",
        borderRadius: 999,
        textDecoration: "none",
        color: "black",
        background: "white",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {children}
    </a>
  );
}

function Card({
  title,
  body,
  foot,
  href,
}: {
  title: string;
  body: string;
  foot: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "black",
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 14,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 8, color: "#444", lineHeight: 1.45, fontSize: 13 }}>{body}</div>
      <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>{foot}</div>
    </a>
  );
}

function Pill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "7px 10px",
        border: "1px solid #eee",
        borderRadius: 999,
        textDecoration: "none",
        color: "black",
        background: "#fafafa",
        fontSize: 12,
      }}
    >
      {children}
    </a>
  );
}
