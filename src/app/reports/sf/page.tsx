import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function SFReportPage() {
  const supa = supabaseAdmin();

  const { data: venues } = await supa
    .from("venues")
    .select("id,name,city,region,country,category,status,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const { count: passes } = await supa.from("access_passes").select("id", { count: "exact", head: true });
  const { count: invites } = await supa.from("venue_owner_invites").select("id", { count: "exact", head: true });
  const { count: leads } = await supa.from("owner_leads").select("id", { count: "exact", head: true });

  // Simple scaling simulation (illustrative)
  const v = venues?.length || 0;
  const avgMonthlySaaS = 99; // blended starter/pro for demo
  const mrr = v * avgMonthlySaaS;
  const arr = mrr * 12;

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 999 }}>SF Pilot Report</h1>
          <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.6, maxWidth: 920 }}>
            Proof-of-work report for the SF rollout. This is a live pull from Supabase (venues + passes + invites).
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn href="/demo">Demo</Btn>
          <Btn href="/admin/metrics">Metrics</Btn>
          <Btn href="/venues">Directory</Btn>
        </div>
      </header>

      <section style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Card label="Active Venues" value={v} />
        <Card label="Passes Issued" value={passes || 0} />
        <Card label="Owner Invites" value={invites || 0} />
        <Card label="Owner Leads" value={leads || 0} />
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 999, marginBottom: 10 }}>Economics simulation (illustrative)</h2>
        <div style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 18, padding: 16 }}>
          <div style={{ opacity: 0.9, lineHeight: 1.7 }}>
            <div>
              Assumption: <b>${avgMonthlySaaS}/mo</b> blended owner SaaS per active venue (starter+pro mix)
            </div>
            <div>
              Current MRR: <b>${mrr.toLocaleString()}</b>
            </div>
            <div>
              Current ARR: <b>${arr.toLocaleString()}</b>
            </div>
            <div style={{ marginTop: 10, opacity: 0.75 }}>
              Next: add Stripe plans and convert owner claims into paid subscriptions.
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 999, marginBottom: 10 }}>Active venues</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {(venues || []).map((x) => (
            <div key={x.id} style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 18, padding: 14 }}>
              <div style={{ fontWeight: 999 }}>{x.name}</div>
              <div style={{ opacity: 0.75, marginTop: 6 }}>
                {x.city} {x.region} · {x.category} · {x.status}
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn href={`/v/${x.id}`}>Venue</Btn>
                <Btn href={`/request/${x.id}`}>Request</Btn>
                <Btn href={`/claim/${x.id}`}>Claim</Btn>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ width: 240, padding: 16, borderRadius: 18, border: "1px solid #23232a", background: "#111118" }}>
      <div style={{ fontSize: 38, fontWeight: 999 }}>{value}</div>
      <div style={{ opacity: 0.75, fontWeight: 900 }}>{label}</div>
    </div>
  );
}

function Btn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        background: "black",
        color: "white",
        textDecoration: "none",
        fontWeight: 950,
        border: "1px solid #23232a",
      }}
    >
      {children}
    </Link>
  );
}
