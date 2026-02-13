export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default async function SFPilotReportPage() {
  // IMPORTANT: supabaseServer is a client export, not a function.
  const supabase = supabaseServer;

  const [{ data: venues }, { data: passes }] = await Promise.all([
    supabase
      .from("venues")
      .select("id,name,city,state,kind,status,created_at,neighborhood")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("access_passes")
      .select("id,venue_id,status,issued_at,expires_at,created_at")
      .order("created_at", { ascending: false })
      .limit(500),
  ]);

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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 950 }}>
            San Francisco Pilot Report
          </h1>
          <div style={{ marginTop: 6, opacity: 0.8, fontWeight: 700 }}>
            Access ↔ Space — rule-based access, no codes published.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/venues" style={{ fontWeight: 950 }}>
            Directory →
          </Link>
          <Link href="/investors" style={{ fontWeight: 950 }}>
            Investors →
          </Link>
        </div>
      </div>

      <section
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        <Card
          label="Venues onboarded"
          value={String(totalVenues)}
          sub={`${activeVenues} active`}
        />
        <Card
          label="Access passes issued"
          value={String(totalPasses)}
          sub={`${activePasses} active · ${expiredPasses} expired`}
        />
        <Card label="Pass activation rate" value={pct(successRate)} sub="active / total" />
        <Card label="Expiry rate" value={pct(expiryRate)} sub="expired / total" />
      </section>

      <section
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 18,
          border: "1px solid var(--card-border)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>
          What this pilot demonstrates
        </h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, opacity: 0.9 }}>
          <li>
            <b>Neutral access layer</b>: time-boxed passes, no codes published.
          </li>
          <li>
            <b>Rate limits</b>: guards abuse while keeping guest UX fast.
          </li>
          <li>
            <b>Venue controls</b>: rules can be tuned per space (hours, caps,
            cooldown).
          </li>
          <li>
            <b>Proof-of-work</b>: onboarding + usage logs create measurable
            reliability signals.
          </li>
        </ul>
      </section>

      <section
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 18,
          border: "1px solid var(--card-border)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>
          Top venues by usage
        </h2>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {top.map((row) => (
            <div
              key={row.id}
              style={{
                padding: 12,
                border: "1px solid var(--card-border)",
                borderRadius: 14,
              }}
            >
              <div style={{ fontWeight: 950, fontSize: 16 }}>{row.name}</div>
              <div style={{ opacity: 0.8, marginTop: 4 }}>
                {(row.neighborhood ? `${row.neighborhood} — ` : "")}
                {row.city} {row.state} · {row.kind} · {row.status} ·{" "}
                <b>{row.uses}</b> passes
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/v/${row.id}`} style={pillStyle}>
                  View venue
                </Link>
                <Link href={`/request/${row.id}`} style={pillStyle}>
                  Request access
                </Link>
                <Link href={`/signage/${row.id}`} style={pillStyle}>
                  Print signage
                </Link>
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
    <div
      style={{
        padding: 16,
        borderRadius: 18,
        border: "1px solid var(--card-border)",
        background: "var(--card-bg)",
      }}
    >
      <div style={{ opacity: 0.7, fontWeight: 900 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 950, marginTop: 6 }}>{value}</div>
      <div style={{ marginTop: 6, opacity: 0.75, fontWeight: 800 }}>{sub}</div>
    </div>
  );
}

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--card-border)",
  fontWeight: 900,
  textDecoration: "none",
};
