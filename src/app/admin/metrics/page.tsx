import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const supabase = await supabaseServer();

  const [{ count: leadsCount }, { count: venuesCount }, { count: passesCount }] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("venues").select("*", { count: "exact", head: true }),
    supabase.from("access_passes").select("*", { count: "exact", head: true }),
  ]);

  return (
    <main style={{ background: "#fff", color: "#111", minHeight: "100vh", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 18px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Admin</div>
            <h1 style={{ margin: 0, fontSize: 26, letterSpacing: -0.4 }}>Admin — Metrics</h1>
            <div style={{ marginTop: 6, fontSize: 13, opacity: 0.75 }}>Live counts pulled from Supabase (server-rendered).</div>
          </div>

          <Link href="/admin" style={{ textDecoration: "none", fontWeight: 900, color: "#111" }}>
            ← Back to Admin
          </Link>
        </div>

        <div style={{ height: 16 }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { k: "Venues", v: venuesCount ?? 0 },
            { k: "Leads", v: leadsCount ?? 0 },
            { k: "Access passes", v: passesCount ?? 0 },
          ].map((m) => (
            <div key={m.k} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 14 }}>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>{m.k}</div>
              <div style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.6 }}>{m.v}</div>
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>Exact count (server query)</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, fontSize: 12, opacity: 0.65 }}>
          Tip: If a count shows 0 unexpectedly, confirm the table exists (you already have /api/debug/schema).
        </div>
      </div>
    </main>
  );
}
