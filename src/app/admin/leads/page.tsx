import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  // IMPORTANT: call the function to get a client
  const supabase = await supabaseServer();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, status, email, company, city, region, venue_type, note")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ background: "#fff", color: "#111", minHeight: "100vh", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 18px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Admin</div>
            <h1 style={{ margin: 0, fontSize: 26, letterSpacing: -0.4 }}>Admin — Leads</h1>
            <div style={{ marginTop: 6, fontSize: 13, opacity: 0.75 }}>
              Incoming venue onboarding requests (demo admin view).
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/admin" style={{ textDecoration: "none", fontWeight: 800, color: "#111" }}>
              ← Back to Admin
            </Link>
            <Link
              href="/contact"
              style={{
                textDecoration: "none",
                fontWeight: 800,
                color: "#111",
                border: "1px solid rgba(0,0,0,0.16)",
                padding: "10px 12px",
                borderRadius: 12,
              }}
            >
              Open Contact Form
            </Link>
          </div>
        </div>

        <div style={{ height: 16 }} />

        {error ? (
          <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, padding: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Error loading leads</div>
            <pre style={{ margin: 0, fontSize: 12, whiteSpace: "pre-wrap" }}>{String(error.message || error)}</pre>
          </div>
        ) : null}

        <div style={{ marginTop: 14, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: 12, fontSize: 13, opacity: 0.85, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            Showing {leads?.length || 0} lead(s)
          </div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ textAlign: "left", fontSize: 12, opacity: 0.75 }}>
                  <th style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>Status</th>
                  <th style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>Contact</th>
                  <th style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>Location</th>
                  <th style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>Type</th>
                  <th style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>Note</th>
                  <th style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>Created</th>
                </tr>
              </thead>

              <tbody>
                {(leads || []).map((l: any) => {
                  const status = String(l.status || "new");
                  const badgeBg =
                    status === "new" ? "rgba(0,0,0,0.06)" : status === "contacted" ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.06)";

                  return (
                    <tr key={l.id} style={{ fontSize: 13, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <td style={{ padding: 12 }}>
                        <span style={{ display: "inline-block", padding: "6px 10px", borderRadius: 999, background: badgeBg, fontWeight: 800 }}>
                          {status}
                        </span>
                      </td>

                      <td style={{ padding: 12 }}>
                        <div style={{ fontWeight: 900 }}>{l.company || "—"}</div>
                        <div style={{ opacity: 0.75 }}>{l.email || "—"}</div>
                      </td>

                      <td style={{ padding: 12, whiteSpace: "nowrap" }}>
                        {(l.city || "—") + " · " + (l.region || "—")}
                      </td>

                      <td style={{ padding: 12 }}>{l.venue_type || "—"}</td>

                      <td style={{ padding: 12, maxWidth: 360 }}>
                        <div style={{ opacity: 0.9, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {l.note || "—"}
                        </div>
                      </td>

                      <td style={{ padding: 12, whiteSpace: "nowrap", opacity: 0.85 }}>
                        {l.created_at ? new Date(l.created_at).toLocaleString() : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, opacity: 0.65 }}>
          Tip: This admin page is intentionally white-background for consistent readability across all modes.
        </div>
      </div>
    </main>
  );
}
