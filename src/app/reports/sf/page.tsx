export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function safeStr(v: any) {
  return typeof v === "string" ? v : "";
}

export default async function SFPilotReportPage() {
  const supabase = supabaseAdmin();

  // Pull full rows so schema drift doesn't break pages
  const [{ data: venues, error: vErr }, { data: passes, error: pErr }] = await Promise.all([
    supabase.from("venues").select("*").order("created_at", { ascending: false }).limit(500),
    supabase.from("access_passes").select("*").order("created_at", { ascending: false }).limit(2000),
  ]);

  const v = venues || [];
  const p = passes || [];

  const totalVenues = v.length;
  const activeVenues = v.filter((x: any) => safeStr(x.status) === "active").length;

  const totalPasses = p.length;
  const activePasses = p.filter((x: any) => safeStr(x.status) === "active").length;
  const expiredPasses = p.filter((x: any) => safeStr(x.status) === "expired").length;

  const denom = totalPasses || 1;
  const successRate = totalPasses ? activePasses / denom : 0;
  const expiryRate = totalPasses ? expiredPasses / denom : 0;

  const counts: Record<string, number> = {};
  for (const row of p as any[]) {
    const vid = row.venue_id;
    if (typeof vid === "string") counts[vid] = (counts[vid] || 0) + 1;
  }

  const top = [...v]
    .map((row: any) => ({
      ...row,
      uses: typeof row.id === "string" ? counts[row.id] || 0 : 0,
    }))
    .sort((a: any, b: any) => b.uses - a.uses)
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
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 950, color: "#111" }}>
            San Francisco Pilot Report
          </h1>
          <div style={{ marginTop: 6, opacity: 0.85, fontWeight: 800, color: "#111" }}>
            Access ↔ Space — rule-based access, no codes published.
          </div>
          {(vErr || pErr) ? (
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
              Debug: {vErr?.message || pErr?.message}
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

      <section style={{ marginTop: 18, padding: 16, borderRadius: 18, border: "1px solid #eaeaea", background: "white", color: "#111" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950, color: "#111" }}>Top venues by usage</h2>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {top.map((row: any) => (
            <div key={row.id || row.name} style={{ padding: 12, border: "1px solid #eee", borderRadius: 14, background: "#fff", color: "#111" }}>
              <div style={{ fontWeight: 950, fontSize: 16, color: "#111" }}>
                {row.name || "Venue"}
              </div>
              <div style={{ opacity: 0.9, marginTop: 4, color: "#222" }}>
                <b>{row.uses}</b> passes
              </div>
              {typeof row.id === "string" ? (
                <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link href={`/v/${row.id}`} style={pillStyle}>View venue</Link>
                  <Link href={`/request/${row.id}`} style={pillStyle}>Request access</Link>
                  <Link href={`/signage/${row.id}`} style={pillStyle}>Print signage</Link>
                </div>
              ) : null}
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
      <div style={{ opacity: 0.75, fontWeight: 900, color: "#111" }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 950, marginTop: 6, color: "#111" }}>{value}</div>
      <div style={{ marginTop: 6, opacity: 0.85, fontWeight: 800, color: "#111" }}>{sub}</div>
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
