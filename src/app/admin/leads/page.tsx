export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

function fmt(dt?: string | null) {
  if (!dt) return "";
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

function pill(status?: string | null) {
  const s = (status || "new").toLowerCase();
  const bg =
    s === "converted" ? "#dcfce7" : s === "new" ? "#fff7ed" : "#eef2ff";
  const border =
    s === "converted" ? "#86efac" : s === "new" ? "#fdba74" : "#a5b4fc";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 999,
        background: bg,
        border: `1px solid ${border}`,
        fontWeight: 900,
        fontSize: 12,
      }}
    >
      {s}
    </span>
  );
}

export default async function AdminLeadsPage() {
  const supabase = supabaseServer;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, status, email, company, city, region, venue_type, note")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", background: "#f6f7fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 1000 }}>Admin — Leads</h1>
            <p style={{ marginTop: 6, opacity: 0.75 }}>
              Convert leads into venues and instantly open the Pilot Pack.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/admin" style={{ textDecoration: "underline", fontWeight: 900 }}>
              ← Back to Admin
            </Link>
            <Link href="/admin/metrics" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Metrics →
            </Link>
            <Link href="/outreach" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Outreach →
            </Link>
          </div>
        </div>

        {error ? (
          <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "#fff1f2", border: "1px solid #fecdd3" }}>
            <b>Error:</b> {error.message}
          </div>
        ) : null}

        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {(leads || []).map((l: any) => {
            const venueName = l.company || "Venue";
            const city = l.city || "San Francisco";
            const region = l.region || "CA";

            return (
              <div key={l.id} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      {pill(l.status)}
                      <div style={{ fontWeight: 1000 }}>{venueName}</div>
                      <div style={{ opacity: 0.7 }}>
                        · {city} — {region} · {l.venue_type || "restroom"}
                      </div>
                    </div>
                    <div style={{ marginTop: 6, opacity: 0.85 }}>
                      <b>{l.email}</b>
                      {l.note ? <span style={{ opacity: 0.7 }}> · {l.note}</span> : null}
                    </div>
                    <div style={{ marginTop: 6, opacity: 0.65, fontSize: 13 }}>
                      {fmt(l.created_at)}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <form action="/api/admin/convert-lead" method="post">
                      <input type="hidden" name="leadId" value={l.id} />
                      <input type="hidden" name="redirect" value="1" />
                      <button
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: "1px solid #e5e7eb",
                          background: "black",
                          color: "white",
                          fontWeight: 900,
                          cursor: "pointer",
                        }}
                      >
                        Convert & Open Pilot Pack →
                      </button>
                    </form>

                    <a
                      href="/outreach"
                      style={{
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                        background: "white",
                        fontWeight: 900,
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      Open Outreach →
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: 12, opacity: 0.7, fontSize: 13 }}>
                  Workflow: <b>Convert & Open Pilot Pack</b> → copy the “Core links” block → send to venue owner.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
