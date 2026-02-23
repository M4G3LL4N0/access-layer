import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const font = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';

function Card({ title, value, sub }: { title: string; value: string | number; sub?: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 16,
        padding: 16,
        background: "white",
        color: "#111",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.75 }}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 950, marginTop: 4 }}>{value}</div>
      {sub ? <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{sub}</div> : null}
    </div>
  );
}

function Btn({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const base: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 900,
  };
  const style: React.CSSProperties = primary
    ? { ...base, background: "black", color: "white" }
    : { ...base, background: "white", color: "#111", border: "1px solid rgba(0,0,0,0.14)" };

  return (
    <Link href={href} style={style}>
      {label}
    </Link>
  );
}

export default async function AdminPage() {
  const supabase = supabaseServer();

  // IMPORTANT: count only exists on the awaited response object, not on the query builder.
  const [{ count: venuesCount }, { count: activeVenuesCount }, { count: leadsCount }, { count: passesCount }] =
    await Promise.all([
      supabase.from("venues").select("*", { count: "exact", head: true }),
      supabase.from("venues").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("access_passes").select("*", { count: "exact", head: true }),
    ]);

  return (
    <main style={{ fontFamily: font, background: "white", color: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 64px" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 950 }}>Admin</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Internal demo dashboard</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn href="/venues" label="Directory" />
            <Btn href="/admin/venues" label="Venues" />
            <Btn href="/admin/leads" label="Leads" />
            <Btn href="/admin/ops" label="Ops" />
            <Btn href="/admin/metrics" label="Metrics" primary />
          </div>
        </header>

        <section style={{ marginTop: 18, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <Card title="Venues (total)" value={venuesCount ?? 0} sub={`Active: ${activeVenuesCount ?? 0}`} />
          <Card title="Leads" value={leadsCount ?? 0} sub="Onboarding requests" />
          <Card title="Access passes" value={passesCount ?? 0} sub="Issued tokens" />
        </section>

        <section
          style={{
            marginTop: 18,
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 16,
            padding: 16,
            background: "white",
          }}
        >
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Quick links</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Btn href="/hardware" label="Hardware / Kiosks" />
            <Btn href="/solutions/parking" label="Parking solution" />
            <Btn href="/vc/packet" label="VC packet" />
            <Btn href="/case-studies/sf-pilot" label="SF pilot case study" />
          </div>
        </section>
      </div>
    </main>
  );
}
