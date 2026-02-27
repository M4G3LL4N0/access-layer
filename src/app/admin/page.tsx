import Link from "next/link";

export const dynamic = "force-dynamic";

const Card = ({ href, title, desc }: { href: string; title: string; desc: string }) => (
  <Link
    href={href}
    style={{
      display: "block",
      border: "1px solid rgba(0,0,0,0.12)",
      borderRadius: 14,
      padding: 16,
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <div style={{ fontWeight: 700 }}>{title}</div>
    <div style={{ marginTop: 6, opacity: 0.75, fontSize: 14 }}>{desc}</div>
  </Link>
);

export default function AdminHome() {
  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Admin</h1>
          <p style={{ marginTop: 6, opacity: 0.7 }}>AXW control plane (3.0)</p>
        </div>
        <Link href="/" style={{ textDecoration: "none", fontSize: 14 }}>← Home</Link>
      </header>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <Card href="/admin/venues" title="Venues" desc="Create / view venues" />
        <Card href="/admin/access-points" title="Access Points" desc="Doors / gates / entrypoints" />
        <Card href="/admin/ops" title="Ops" desc="Operator console" />
        <Card href="/admin/leads" title="Leads" desc="Owner leads + CRM" />
        <Card href="/admin/seed" title="Seed" desc="Seed demo data" />
        <Card href="/api/debug/env" title="Debug Env" desc="Verify server env wiring" />
      </div>
    </main>
  );
}
