export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

function num(n?: number | null) {
  return typeof n === "number" ? n : 0;
}

function Card({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={{ padding: 16, borderRadius: 14, border: "1px solid #e5e7eb", background: "white" }}>
      <div style={{ fontWeight: 900, opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{value}</div>
      {sub ? <div style={{ marginTop: 6, opacity: 0.7 }}>{sub}</div> : null}
    </div>
  );
}

export default async function AdminMetricsPage() {
  const supabase = supabaseServer;

  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
  const startIso = start.toISOString();

  const [{ count: leadsCount }, { count: venuesCount }] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("venues").select("*", { count: "exact", head: true }),
  ]);

  const { count: passesToday } = await supabase
    .from("access_passes")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startIso);

  const { data: reqRows } = await supabase
    .from("access_passes")
    .select("requester_id")
    .gte("created_at", startIso)
    .limit(5000);

  const uniqueRequesters = new Set((reqRows || []).map((r: any) => r.requester_id).filter(Boolean)).size;

  return (
    <main style={{ padding: 30, fontFamily: "system-ui", background: "#f6f7fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, fontWeight: 900 }}>Admin — Metrics</h1>
        <p style={{ opacity: 0.75 }}>Traction counters for demo and pilot reporting.</p>

        <div style={{ marginTop: 14 }}>
          <Link href="/admin" style={{ textDecoration: "underline" }}>
            ← Back to Admin
          </Link>
        </div>

        <div style={{ marginTop: 18, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <Card title="Leads (total)" value={String(num(leadsCount))} />
          <Card title="Venues (total)" value={String(num(venuesCount))} />
          <Card title="Passes issued (today)" value={String(num(passesToday))} sub="Count created since 00:00 UTC." />
          <Card title="Unique requesters (today)" value={String(uniqueRequesters)} sub="Distinct requester_id values." />
        </div>

        <div style={{ marginTop: 18, padding: 16, borderRadius: 14, background: "white", border: "1px solid #e5e7eb" }}>
          <div style={{ fontWeight: 900 }}>Demo script (60 seconds)</div>
          <ol style={{ marginTop: 10, lineHeight: 1.8 }}>
            <li>Open /venues, click a venue, request an access pass.</li>
            <li>Open /verify, paste token, show “valid”.</li>
            <li>Refresh this page — “passes today” increments.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
