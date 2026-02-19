export const metadata = {
  title: "Investors — AXW",
  description: "Programmable access across every space, every access point, every sector.",
};

function fmt(n: number) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

export default function InvestorsPage() {
  // Defaults that “feel insane but coherent”
  const venues = 250_000;          // scaled network
  const accessPointsPerVenue = 6;  // doors/garage/gates/turnstiles/etc
  const mrrPerVenue = 149;         // base SaaS per venue
  const mrrPerAccessPoint = 12;    // per access point add-on
  const tokenFee = 0.02;           // per token issued
  const tokensPerVenuePerDay = 120;

  const annualRevenue =
    (venues * (mrrPerVenue + accessPointsPerVenue * mrrPerAccessPoint) * 12) +
    (venues * tokensPerVenuePerDay * 365 * tokenFee);

  const impliedVal = annualRevenue * 20; // crude 20x ARR multiple

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 16px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 950, fontSize: 28, letterSpacing: -0.6 }}>AXW Investor Model</div>
            <div style={{ opacity: 0.75, marginTop: 6 }}>
              The universal access ↔ space coordination layer (tokens, policies, audit logs, operators, devices).
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/vc/packet" style={{ textDecoration: "none", fontWeight: 900, color: "#111", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 12, padding: "10px 12px" }}>
              VC Packet
            </a>
            <a href="/demo" style={{ textDecoration: "none", fontWeight: 900, color: "#fff", background: "#111", borderRadius: 12, padding: "10px 12px" }}>
              Live Demo
            </a>
          </div>
        </header>

        <section style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {[
            { t: "What we replace", d: "Fragmented controllers, ad-hoc validations, siloed access apps, un-auditable keys/codes." },
            { t: "What we become", d: "A programmable policy layer spanning all access points: doors, garages, gates, elevators, turnstiles, wifi, APIs." },
            { t: "Why we win", d: "Tokens + policy + audit + edge verification = infrastructure moat. Expand horizontally into every sector." },
          ].map((x) => (
            <div key={x.t} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 900 }}>{x.t}</div>
              <div style={{ opacity: 0.78, marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>{x.d}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 22, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            <div>
              <div style={{ fontWeight: 900 }}>Model snapshot (fixed demo numbers)</div>
              <div style={{ opacity: 0.75, marginTop: 6, fontSize: 14 }}>
                Venues: <b>{venues.toLocaleString()}</b><br />
                Access points/venue: <b>{accessPointsPerVenue}</b><br />
                Tokens/venue/day: <b>{tokensPerVenuePerDay}</b>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 900 }}>Revenue</div>
              <div style={{ opacity: 0.75, marginTop: 6, fontSize: 14 }}>
                Annual revenue: <b>{fmt(annualRevenue)}</b><br />
                Implied valuation (20×): <b>{fmt(impliedVal)}</b>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 900 }}>Path to scale</div>
              <div style={{ opacity: 0.75, marginTop: 6, fontSize: 14 }}>
                1) Parking validation<br />
                2) Venue kiosks + passes<br />
                3) Operators + devices<br />
                4) Access points abstraction<br />
                5) Enterprise rollups
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.10)", display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href="/analytics" style={{ textDecoration: "none", fontWeight: 900, color: "#111", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 12, padding: "10px 12px" }}>
              Live Metrics
            </a>
            <a href="/sdk" style={{ textDecoration: "none", fontWeight: 900, color: "#111", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 12, padding: "10px 12px" }}>
              SDK
            </a>
            <a href="/case-studies/sf-pilot" style={{ textDecoration: "none", fontWeight: 900, color: "#fff", background: "#111", borderRadius: 12, padding: "10px 12px" }}>
              SF Pilot
            </a>
          </div>
        </section>

        <section style={{ marginTop: 24, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16 }}>
          <div style={{ fontWeight: 950, fontSize: 18 }}>“Access × Space” sectors we take over</div>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {[
              "Parking garages & validation",
              "Retail + customer validation",
              "Coworking + office access",
              "Residential buildings",
              "Events & festivals",
              "Universities & campuses",
              "Hospitals & clinics",
              "Warehouses & industrial yards",
              "Government facilities",
              "Data centers & critical infra",
              "Storage units & lockers",
              "EV charging access",
            ].map((s) => (
              <div key={s} style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12, fontWeight: 800, fontSize: 13 }}>
                {s}
              </div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: 26, opacity: 0.65, fontSize: 12 }}>
          © {new Date().getFullYear()} AXW — Access × World
        </footer>
      </div>
    </main>
  );
}
