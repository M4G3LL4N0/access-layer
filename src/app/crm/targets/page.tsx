import { SubpageVisual } from "@/components/SubpageVisual";
export const dynamic = "force-dynamic";

export default function CrmTargetsPage() {
  const targets = [
    { area: "Hayes Valley", types: ["cafes", "restaurants", "coworking", "gyms"], why: "high foot traffic, easy pilot wedge" },
    { area: "Mission District", types: ["cafes", "bars", "coworking"], why: "busy nightlife + daytime density" },
    { area: "SOMA", types: ["offices", "coworking", "lobbies"], why: "enterprise pathway + multi-site ops" },
    { area: "FiDi", types: ["office towers", "lobbies"], why: "property ops relationships" },
    { area: "North Beach", types: ["restaurants", "bars"], why: "high demand / simple verification" },
    { area: "Castro", types: ["cafes", "bars"], why: "consistent demand + community density" },
  ];

  const categories = [
    "restroom access (venue-managed)",
    "coworking/workspace day access",
    "office visitor access",
    "property/lobby access",
    "event wristband → pass verification",
  ];

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <SubpageVisual variant="default" />
      <style>{`
        :root{
          --bg:#ffffff; --fg:#0b0f19; --muted:rgba(11,15,25,.70);
          --border:rgba(11,15,25,.12); --card:#ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06); --soft: rgba(11,15,25,.06);
          --btn:#0b0f19; --btnFg:#ffffff;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg:#070a12; --fg:#eef1f7; --muted:rgba(238,241,247,.72);
            --border:rgba(238,241,247,.14); --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.40); --soft: rgba(238,241,247,.08);
            --btn:#ffffff; --btnFg:#070a12;
          }
        }
        body{ background:var(--bg); color:var(--fg); }
        a{ color: inherit; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px 20px", background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>AXW • CRM</div>
            <h1 style={{ margin: "6px 0 0", fontSize: 40, letterSpacing: -1 }}>SF Targets</h1>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 920 }}>
              Your “go to the street” list. Pick 20 targets/day, send pilot pack, book calls, move stages in CRM.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignSelf: "flex-start" }}>
            <a href="/crm/leads" style={{ textDecoration: "none", fontWeight: 1100, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)" }}>
              Open /crm/leads
            </a>
            <a href="/crm/templates" style={{ textDecoration: "none", fontWeight: 1100, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--btn)", color: "var(--btnFg)" }}>
              Open /crm/templates →
            </a>
          </div>
        </header>

        <section style={{ marginTop: 16, border: "1px solid var(--border)", borderRadius: 18, padding: 16, background: "var(--card)", boxShadow: "var(--shadow)" }}>
          <div style={{ fontWeight: 1100, marginBottom: 10 }}>Target categories (your wedge)</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", lineHeight: 1.8 }}>
            {categories.map((c) => (
              <li key={c}><b style={{ color: "var(--fg)" }}>{c}</b></li>
            ))}
          </ul>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12, marginTop: 12 }}>
          {targets.map((t) => (
            <section key={t.area} style={{ border: "1px solid var(--border)", borderRadius: 18, padding: 16, background: "var(--card)", boxShadow: "var(--shadow)" }}>
              <div style={{ fontWeight: 1200, marginBottom: 8 }}>{t.area}</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 10 }}>
                Why: {t.why}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {t.types.map((x) => (
                  <span key={x} style={{ border: "1px solid var(--border)", borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 900, background: "var(--soft)" }}>
                    {x}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted)" }}>
                Action: pull 20 venues in this area → send pilot pack → move to <b style={{ color: "var(--fg)" }}>contacted</b>.
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
