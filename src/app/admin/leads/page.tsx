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

function onboardingMessage(args: {
  venueName: string;
  city: string;
  region: string;
  venueId: string;
}) {
  const origin = "https://access-layer-five.vercel.app";
  const pack = `${origin}/pilot-pack/${args.venueId}`;
  const signage = `${origin}/signage/${args.venueId}`;
  const request = `${origin}/request/${args.venueId}`;
  const verify = `${origin}/verify`;

  return `Pilot links for ${args.venueName} (${args.city} ${args.region}):

Pilot Pack (all links + 60-sec demo):
${pack}

Printable Signage (QR):
${signage}

Request page (patrons):
${request}

Staff verify page:
${verify}

If you want, reply with preferred hours + daily limit and we’ll tune the rule.`;
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
              Incoming venue onboarding requests (demo admin view).
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/admin" style={{ textDecoration: "underline", fontWeight: 900 }}>
              ← Back to Admin
            </Link>
            <Link href="/admin/metrics" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Metrics →
            </Link>
            <Link href="/contact" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Contact Form →
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
                      <button
                        formAction="/api/admin/convert-lead"
                        formMethod="post"
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
                        Convert → Venue
                      </button>
                    </form>

                    <button
                      onClick={() => {
                        const msg = onboardingMessage({
                          venueName,
                          city,
                          region,
                          venueId: "REPLACE_AFTER_CONVERT",
                        });
                        navigator.clipboard.writeText(msg);
                        alert("Copied template. After converting, paste the real venueId into the Pilot Pack URL.");
                      }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                        background: "white",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      Copy onboarding msg
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 12, opacity: 0.7, fontSize: 13 }}>
                  Tip: Click <b>Convert → Venue</b>, then open the returned Pilot Pack link and send it to the lead.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
