export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ padding: 12, border: "1px solid var(--card-border)", borderRadius: 12, minWidth: 200 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 950, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default async function NetworkReportPage() {
  const now = Date.now();
  const iso1h = new Date(now - 1 * 3600 * 1000).toISOString();
  const iso24h = new Date(now - 24 * 3600 * 1000).toISOString();
  const iso7d = new Date(now - 7 * 24 * 3600 * 1000).toISOString();

  const venuesActive = await supabaseServer
    .from("venues")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  const req1h = await supabaseServer
    .from("access_requests")
    .select("id", { count: "exact", head: true })
    .gte("requested_at", iso1h);

  const req24h = await supabaseServer
    .from("access_requests")
    .select("id", { count: "exact", head: true })
    .gte("requested_at", iso24h);

  const req7d = await supabaseServer
    .from("access_requests")
    .select("id", { count: "exact", head: true })
    .gte("requested_at", iso7d);

  const tok1h = await supabaseServer
    .from("access_tokens")
    .select("id", { count: "exact", head: true })
    .gte("issued_at", iso1h);

  const tok24h = await supabaseServer
    .from("access_tokens")
    .select("id", { count: "exact", head: true })
    .gte("issued_at", iso24h);

  const tok7d = await supabaseServer
    .from("access_tokens")
    .select("id", { count: "exact", head: true })
    .gte("issued_at", iso7d);

  const approvals7d =
    (req7d.count ?? 0) > 0 ? Math.round(((tok7d.count ?? 0) / (req7d.count ?? 1)) * 100) : 0;

  // MVP “latency” proxy: tokens/requests ratio is a signal; true latency comes later via events
  const health = (venuesActive.count ?? 0) > 0 ? "Operational" : "Limited (no active venues)";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/venues" style={{ opacity: 0.8 }}>
          ← Directory
        </Link>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/investors" style={{ opacity: 0.8 }}>
            Investors
          </Link>
          <Link href="/pricing" style={{ opacity: 0.8 }}>
            Pricing
          </Link>
        </div>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 34, fontWeight: 950 }}>Network Reliability Report</h1>
      <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
        A live, public view of Access ↔ Space activity. (MVP telemetry; deeper SLA/latency metrics ship next.)
      </p>

      <div style={{ marginTop: 16, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Network status" value={health} sub="Based on active venues + token activity" />
        <Stat label="Active venues" value={venuesActive.count ?? 0} />
        <Stat label="Approval rate (7d)" value={`${approvals7d}%`} sub="Tokens issued / Requests" />
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Requests (1h)" value={req1h.count ?? 0} />
        <Stat label="Requests (24h)" value={req24h.count ?? 0} />
        <Stat label="Requests (7d)" value={req7d.count ?? 0} />
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Tokens (1h)" value={tok1h.count ?? 0} />
        <Stat label="Tokens (24h)" value={tok24h.count ?? 0} />
        <Stat label="Tokens (7d)" value={tok7d.count ?? 0} />
      </div>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid var(--card-border)", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>What this means</div>
        <div style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>
          This system converts access intent into time-limited passes, enforces venue rules, and produces
          network-level telemetry. Next upgrades: event-based latency measurements, incident reports,
          and owner-controlled SLA thresholds.
        </div>
      </section>
    </main>
  );
}
