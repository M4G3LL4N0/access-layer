export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default async function SFPilotReportPage() {
  const supabase = supabaseAdmin();

  const { data: venues } = await supabase
    .from("venues")
    .select("id,name,city,region,country,category,status,created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  // access_passes might be empty early; now it exists, but still handle gracefully
  const { data: passes, error: passErr } = await supabase
    .from("access_passes")
    .select("id,venue_id,status,created_at,issued_at,expires_at")
    .order("created_at", { ascending: false })
    .limit(2000);

  const v = venues || [];
  const p = passes || [];

  const totalVenues = v.length;
  const activeVenues = v.filter((x) => x.status === "active").length;

  const totalPasses = p.length;
  const activePasses = p.filter((x) => x.status === "active").length;
  const expiredPasses = p.filter((x) => x.status === "expired").length;

  const denom = totalPasses || 1;
  const successRate = totalPasses ? activePasses / denom : 0;
  const expiryRate = totalPasses ? expiredPasses / denom : 0;

  const counts: Record<string, number> = {};
  for (const row of p) counts[row.venue_id] = (counts[row.venue_id] || 0) + 1;

  const top = [...v]
    .map((row) => ({ ...row, uses: counts[row.id] || 0 }))
    .sort((a, b) => b.uses - a.uses)
    .slice(0, 10);

  return (
    <main
      style={{
        padding: 24,
        fontFamily: "system-ui",
        maxWidth: 1100,
        margin: "0 auto",
        color: "#111",
        background: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 950 }}>San Francisco Pilot Report</h1>
          <div style={{ marginTop: 6, opacity: 0.85, fontWeight: 800 }}>
            Access ↔ Space — rule-based access, no codes published.
          </div>
          {passErr ? (
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
              Debug: {passErr.message}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/venues" style={{ fontWeight: 950, color: "#111" }}>Directory →</Link>
          <Link href="/investors" style={{ fontWeight: 950, color: "#111" }}>Investors →</Link>
          <Link href="/demo" style={{ fontWeight: 950, color: "#111" }}>Demo →</Link>
        </div>
      </div>

      <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <Card label="Venues onboarded" value={String(totalVenues)} sub={`${activeVenues} active`} />
        <Card label="Access passes issued" value={String(totalPasses)} sub={`${activePasses} active · ${expiredPasses} expired`} />
        <Card label="Pass activation rate" value={pct(successRate)} sub="active / total" />
        <Card label="Expiry rate" value={pct(expiryRate)} sub="expired / total" />
      </section>

      <section style={{ marginTop: 18, padding: 16, borderRadius: 18, border: "1px solid #eaeaea", background: "white" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Top venues by usage</h2>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {top.map((row) => (
            <div key={row.id} style={{ padding: 12, border: "1px solid #eee", borderRadius: 14, background: "#fff" }}>
              <div style={{ fontWeight: 950, fontSize: 16 }}>{row.name}</div>
              <div style={{ opacity: 0.9, marginTop: 4 }}>
                {[row.city, row.region, row.country].filter(Boolean).join(" · ")} ·{" "}
                {[row.category, row.status].filter(Boolean).join(" · ")} · <b>{row.uses}</b> passes
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/v/${row.id}`} style={pillStyle}>View venue</Link>
                <Link href={`/request/${row.id}`} style={pillStyle}>Request access</Link>
                <Link href={`/signage/${row.id}`} style={pillStyle}>Print signage</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Card({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ padding: 16, borderRadius: 18, border: "1px solid #eaeaea", background: "white", color: "#111" }}>
      <div style={{ opacity: 0.75, fontWeight: 900 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 950, marginTop: 6 }}>{value}</div>
      <div style={{ marginTop: 6, opacity: 0.85, fontWeight: 800 }}>{sub}</div>
    </div>
  );
}

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #ddd",
  fontWeight: 900,
  textDecoration: "none",
  color: "#111",
  background: "white",
};
