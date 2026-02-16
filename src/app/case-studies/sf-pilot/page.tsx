import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function asClient(maybeFn: any) {
  return typeof maybeFn === "function" ? maybeFn() : maybeFn;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function card(): React.CSSProperties {
  return { border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16, background: "#fff" };
}

export default async function CaseStudySFPilot() {
  const supabase = await asClient(supabaseServer);

  const now = new Date();
  const d7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const d30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { count: venuesActive } = await supabase
    .from("venues")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  const { count: passes7 } = await supabase
    .from("access_passes")
    .select("id", { count: "exact", head: true })
    .gte("created_at", d7);

  const { count: passes30 } = await supabase
    .from("access_passes")
    .select("id", { count: "exact", head: true })
    .gte("created_at", d30);

  const { data: recent } = await supabase
    .from("access_passes")
    .select("venue_id, created_at")
    .gte("created_at", d7)
    .limit(5000);

  const counts = new Map<string, number>();
  (recent || []).forEach((p: any) => {
    if (!p.venue_id) return;
    counts.set(p.venue_id, (counts.get(p.venue_id) || 0) + 1);
  });

  const top = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const venueIds = top.map(([id]) => id);
  const { data: venueRows } = await supabase
    .from("venues")
    .select("id,name,city,region,category")
    .in("id", venueIds.length ? venueIds : ["00000000-0000-0000-0000-000000000000"]);

  const vmap = new Map<string, any>();
  (venueRows || []).forEach((v: any) => vmap.set(v.id, v));

  return (
    <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 1000, letterSpacing: -0.5 }}>
              Case Study: SF Pilot
            </h1>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              Real pilot data proving the “Access ↔ Space” coordination layer works in production.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/demo" style={btn()}>Demo</Link>
            <Link href="/reports/sf" style={btn()}>SF Report</Link>
            <Link href="/venues" style={btn()}>Directory</Link>
            <Link href="/outreach" style={btn()}>Outreach</Link>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          <div style={card()}>
            <div style={kpiLabel()}>Active venues</div>
            <div style={kpiValue()}>{fmt(venuesActive || 0)}</div>
            <div style={kpiNote()}>Live venues in pilot</div>
          </div>
          <div style={card()}>
            <div style={kpiLabel()}>Passes issued (7d)</div>
            <div style={kpiValue()}>{fmt(passes7 || 0)}</div>
            <div style={kpiNote()}>Token issuance velocity</div>
          </div>
          <div style={card()}>
            <div style={kpiLabel()}>Passes issued (30d)</div>
            <div style={kpiValue()}>{fmt(passes30 || 0)}</div>
            <div style={kpiNote()}>Scaling trend</div>
          </div>
          <div style={card()}>
            <div style={kpiLabel()}>Core claim</div>
            <div style={{ fontWeight: 1000, marginTop: 8, lineHeight: 1.4 }}>
              Policies + time-limited tokens + verification + audit logs — no code publication.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, ...card() }}>
          <div style={{ fontWeight: 1000, marginBottom: 10 }}>Top venues (7d)</div>
          {top.length ? (
            <div style={{ display: "grid", gap: 10 }}>
              {top.map(([id, c]) => {
                const v = vmap.get(id);
                return (
                  <div key={id} style={{ display: "flex", justifyContent: "space-between", gap: 12, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 1000, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {v?.name || id}
                      </div>
                      <div style={{ opacity: 0.75, fontSize: 12 }}>
                        {v?.city || "—"} {v?.region || ""}{v?.category ? ` · ${v.category}` : ""}
                      </div>
                    </div>
                    <div style={{ fontWeight: 1000 }}>{fmt(c)}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ opacity: 0.75 }}>No recent pass activity yet.</div>
          )}
        </div>

        <div style={{ marginTop: 12, ...card() }}>
          <div style={{ fontWeight: 1000, marginBottom: 8 }}>Narrative (what investors care about)</div>
          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.92 }}>
            <li><b>Universal primitive:</b> Space + Access Point + Policy + Credential + Verification.</li>
            <li><b>Tier 0 adoption:</b> Works immediately via staff verify + signage (no hardware needed).</li>
            <li><b>Tier 1–3 expansion:</b> Connectors to locks/controllers + SSO + compliance logs.</li>
            <li><b>Moat:</b> policy engine + audit + integrations + network effects across spaces.</li>
          </ol>
        </div>

        <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>
          This page is intentionally simple, live-data driven, and Vercel-safe.
        </div>
      </div>
    </main>
  );
}

function btn(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.14)",
    textDecoration: "none",
    color: "inherit",
    fontWeight: 950,
    background: "#fff",
  };
}

function kpiLabel(): React.CSSProperties {
  return { fontSize: 13, opacity: 0.75, fontWeight: 900 };
}
function kpiValue(): React.CSSProperties {
  return { fontSize: 32, fontWeight: 1000, letterSpacing: -0.6, marginTop: 6 };
}
function kpiNote(): React.CSSProperties {
  return { fontSize: 12, opacity: 0.7, marginTop: 6 };
}
