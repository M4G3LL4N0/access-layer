import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function MetricsPage() {
  const supa = supabaseAdmin();

  const { count: venues } = await supa.from("venues").select("id", { count: "exact", head: true });
  const { count: passes } = await supa.from("access_passes").select("id", { count: "exact", head: true });
  const { count: invites } = await supa.from("venue_owner_invites").select("id", { count: "exact", head: true });
  const { count: leads } = await supa.from("owner_leads").select("id", { count: "exact", head: true });

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh", background: "#0b0b0d", color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: 950, margin: 0 }}>Network Metrics</h1>
      <p style={{ marginTop: 10, opacity: 0.75 }}>
        Investor snapshot: activity + conversion signals.
      </p>

      <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Card label="Venues" value={venues || 0} />
        <Card label="Passes Issued" value={passes || 0} />
        <Card label="Owner Invites" value={invites || 0} />
        <Card label="Owner Leads" value={leads || 0} />
      </div>
    </main>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        width: 240,
        padding: 16,
        borderRadius: 16,
        border: "1px solid #23232a",
        background: "#111118",
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 999 }}>{value}</div>
      <div style={{ opacity: 0.75, fontWeight: 800 }}>{label}</div>
    </div>
  );
}
