export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 12, minWidth: 180 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 950 }}>{value}</div>
    </div>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max <= 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 60px", gap: 10, alignItems: "center" }}>
      <div style={{ fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ height: 10, borderRadius: 999, background: "#eee", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "black" }} />
      </div>
      <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", opacity: 0.85 }}>{value}</div>
    </div>
  );
}

export default async function AdminMetrics({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) || {};
  const token = sp.token || "";

  const now = Date.now();
  const iso24h = new Date(now - 24 * 3600 * 1000).toISOString();
  const iso7d = new Date(now - 7 * 24 * 3600 * 1000).toISOString();
  const iso30d = new Date(now - 30 * 24 * 3600 * 1000).toISOString();

  // Venue counts
  const venuesActive = await supabaseServer.from("venues").select("id", { count: "exact", head: true }).eq("status", "active");
  const venuesTotal = await supabaseServer.from("venues").select("id", { count: "exact", head: true });

  // Requests
  const req24h = await supabaseServer.from("access_requests").select("id", { count: "exact", head: true }).gte("requested_at", iso24h);
  const req7d = await supabaseServer.from("access_requests").select("id", { count: "exact", head: true }).gte("requested_at", iso7d);
  const req30d = await supabaseServer.from("access_requests").select("id", { count: "exact", head: true }).gte("requested_at", iso30d);

  // Tokens
  const tok24h = await supabaseServer.from("access_tokens").select("id", { count: "exact", head: true }).gte("issued_at", iso24h);
  const tok7d = await supabaseServer.from("access_tokens").select("id", { count: "exact", head: true }).gte("issued_at", iso7d);
  const tok30d = await supabaseServer.from("access_tokens").select("id", { count: "exact", head: true }).gte("issued_at", iso30d);

  // Owner leads
  const leads = await supabaseServer.from("owner_leads").select("id", { count: "exact", head: true });

  // Top venues by tokens (7d) — compute via joins-free approach:
  // Pull tokens last 7d with venue_id, then aggregate in JS (fine for MVP).
  const { data: tokRows } = await supabaseServer
    .from("access_tokens")
    .select("venue_id")
    .gte("issued_at", iso7d)
    .limit(10000);

  const counts = new Map<string, number>();
  for (const r of tokRows || []) counts.set(r.venue_id, (counts.get(r.venue_id) || 0) + 1);

  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topIds = top.map(([id]) => id);

  const { data: venues } = topIds.length
    ? await supabaseServer.from("venues").select("id,name").in("id", topIds)
    : { data: [] as any[] };

  const nameById = new Map<string, string>((venues || []).map((v: any) => [v.id, v.name]));
  const topNamed = top.map(([id, n]) => ({ id, name: nameById.get(id) || id, n }));
  const maxVal = topNamed.length ? topNamed[0].n : 0;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 28, fontWeight: 950 }}>Admin · Metrics</h1>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/admin?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Admin</Link>
          <Link href={`/admin/venues?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Venues</Link>
          <Link href="/network" style={{ opacity: 0.8 }}>Public report</Link>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Active venues" value={venuesActive.count ?? 0} />
        <Stat label="Total venues" value={venuesTotal.count ?? 0} />
        <Stat label="Owner leads" value={leads.count ?? 0} />
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Requests (24h)" value={req24h.count ?? 0} />
        <Stat label="Requests (7d)" value={req7d.count ?? 0} />
        <Stat label="Requests (30d)" value={req30d.count ?? 0} />
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Tokens (24h)" value={tok24h.count ?? 0} />
        <Stat label="Tokens (7d)" value={tok7d.count ?? 0} />
        <Stat label="Tokens (30d)" value={tok30d.count ?? 0} />
      </div>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Top venues by tokens (7d)</div>
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {topNamed.length === 0 && <div style={{ opacity: 0.8 }}>No token activity in last 7 days yet.</div>}
          {topNamed.map((v) => (
            <div key={v.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
                <BarRow label={v.name} value={v.n} max={maxVal} />
              </div>
              <Link href={`/v/${v.id}`} style={{ fontWeight: 900, whiteSpace: "nowrap" }}>
                View →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid #eee", borderRadius: 16, opacity: 0.9 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Narrative (what to say)</div>
        <div style={{ marginTop: 10, lineHeight: 1.7 }}>
          This is the control plane for a programmable access layer. The system converts access intent into
          time-limited passes, enforces rules, and produces network-level telemetry that turns “access” into
          an operational metric.
        </div>
      </section>
    </main>
  );
}
