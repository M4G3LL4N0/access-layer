// src/app/investors/page.tsx
export const dynamic = "force-dynamic";

type MixKey = "restrooms" | "cowork" | "offices" | "events" | "enterprise" | "mixed";
type ScaleKey = "pilot" | "city" | "regional" | "national" | "global";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fmtInt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}
function fmtMoney(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

function btnBase(active: boolean) {
  return {
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.14)",
    background: active ? "black" : "white",
    color: active ? "white" : "black",
    fontWeight: 800 as const,
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  };
}

function card() {
  return {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 18,
    padding: 16,
    background: "white",
  };
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={card()}>
      <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 900, marginTop: 6 }}>{value}</div>
    </div>
  );
}

function SliderRow({
  label,
  helper,
  min,
  max,
  step,
  value,
  onChange,
  rightLabel,
}: {
  label: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  rightLabel: string;
}) {
  return (
    <div style={{ padding: "10px 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 900 }}>{label}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{helper}</div>
        </div>
        <div style={{ fontWeight: 900 }}>{rightLabel}</div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", marginTop: 8 }}
      />
    </div>
  );
}

export default function InvestorsPage() {
  // --- “Scenario engine” state (defaults match your screenshot vibe)
  const [mix, setMix] = React.useState<MixKey>("mixed");
  const [scale, setScale] = React.useState<ScaleKey>("city");

  const [venues, setVenues] = React.useState(2500);
  const [eventsPerVenuePerDay, setEventsPerVenuePerDay] = React.useState(35);
  const [revPerEvent, setRevPerEvent] = React.useState(0.25);
  const [attachRate, setAttachRate] = React.useState(0.45);
  const [grossMargin, setGrossMargin] = React.useState(0.85);
  const [years, setYears] = React.useState(7);
  const [revMultiple, setRevMultiple] = React.useState(18);

  // Scale presets
  React.useEffect(() => {
    const presets: Record<ScaleKey, number> = {
      pilot: 3,
      city: 2500,
      regional: 15000,
      national: 120000,
      global: 800000,
    };
    setVenues(presets[scale]);
  }, [scale]);

  // Mix presets (nudges the “events per venue per day” baseline)
  React.useEffect(() => {
    const base: Record<MixKey, number> = {
      restrooms: 80,
      cowork: 30,
      offices: 20,
      events: 120,
      enterprise: 15,
      mixed: 35,
    };
    setEventsPerVenuePerDay(base[mix]);
  }, [mix]);

  const totalEventsPerDay = venues * eventsPerVenuePerDay;
  const monetizedEventsPerDay = totalEventsPerDay * attachRate;

  // simple annual revenue model: monetized events/day * $/event * 365
  const annualRevenue = monetizedEventsPerDay * revPerEvent * 365;

  // gross profit
  const annualGrossProfit = annualRevenue * grossMargin;

  // valuation from revenue multiple (intentionally simplified)
  const valuation = annualRevenue * revMultiple;

  // “$2T path” solver (simple: how many venues or events needed at current assumptions)
  const targetValuation = 2_000_000_000_000;
  const revenueNeeded = targetValuation / revMultiple;
  const monetizedEventsPerDayNeeded = revenueNeeded / (revPerEvent * 365);
  const totalEventsPerDayNeeded = monetizedEventsPerDayNeeded / attachRate;
  const venuesNeeded = totalEventsPerDayNeeded / eventsPerVenuePerDay;

  // defensibility index: density * attach * margin * integration horizon (made-up but useful narrative)
  const defensibility =
    Math.log10(venues + 10) * (attachRate * 100) * (grossMargin * 100) * (1 + years / 10) * 0.01;

  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#f7f7f7",
        color: "black",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 72px" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.4, opacity: 0.75 }}>
              AXW / INVESTORS
            </div>
            <h1 style={{ fontSize: 48, lineHeight: 1.02, margin: "8px 0 8px", letterSpacing: -1.2 }}>
              Access ↔ Space is
              <br />
              a universal
              <br />
              primitive.
            </h1>
            <p style={{ maxWidth: 760, opacity: 0.8, margin: 0, lineHeight: 1.55 }}>
              This is an <b>interactive pitch model</b>. Tune venue scale, access frequency, monetization,
              and valuation multiple to explore why AXW becomes a network once density and verification
              are standardized.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/investors/model" style={btnBase(false)}>
              Clean model →
            </a>
            <a
              href="/demo"
              style={{
                ...btnBase(true),
              }}
            >
              View demo →
            </a>
          </div>
        </header>

        {/* Top stats */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
            marginTop: 18,
          }}
        >
          <Stat label="Total events/day" value={fmtInt(totalEventsPerDay)} />
          <Stat label="Monetized events/day" value={fmtInt(monetizedEventsPerDay)} />
          <Stat label="Annual revenue (simple)" value={fmtMoney(annualRevenue)} />
          <Stat label="Valuation (rev multiple)" value={fmtMoney(valuation)} />
        </section>

        {/* Main grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 12,
            marginTop: 12,
          }}
        >
          {/* Scenario engine */}
          <div style={card()}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Scenario engine</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4, lineHeight: 1.45 }}>
              Pick a vertical mix and a scenario, then adjust sliders. This is built for demos — fast to
              understand, fast to update.
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.7 }}>Vertical mix</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                {[
                  ["restrooms", "Restrooms / public amenities"],
                  ["cowork", "Cowork / workspace"],
                  ["offices", "Offices / property ops"],
                  ["events", "Events / venues / festivals"],
                  ["enterprise", "Enterprise / infrastructure partners"],
                  ["mixed", "Mixed network (default)"],
                ].map(([k, label]) => (
                  <button key={k} style={btnBase(mix === (k as MixKey))} onClick={() => setMix(k as MixKey)}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.7 }}>Scale scenario</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  {[
                    ["pilot", "Pilot"],
                    ["city", "City cluster"],
                    ["regional", "Regional"],
                    ["national", "National"],
                    ["global", "Global"],
                  ].map(([k, label]) => (
                    <button
                      key={k}
                      style={btnBase(scale === (k as ScaleKey))}
                      onClick={() => setScale(k as ScaleKey)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <SliderRow
                  label="Live venues / sites"
                  helper="Active locations in the network (venues, properties, facilities)."
                  min={1}
                  max={1_000_000}
                  step={1}
                  value={venues}
                  onChange={(v) => setVenues(v)}
                  rightLabel={fmtInt(venues)}
                />

                <SliderRow
                  label="Access events per venue per day"
                  helper="Requests / verifications / kiosk grants per site per day."
                  min={1}
                  max={300}
                  step={1}
                  value={eventsPerVenuePerDay}
                  onChange={(v) => setEventsPerVenuePerDay(v)}
                  rightLabel={fmtInt(eventsPerVenuePerDay)}
                />

                <SliderRow
                  label="Revenue per monetized event"
                  helper="Avg revenue per monetized verification event (fee / SaaS allocation)."
                  min={0.05}
                  max={5}
                  step={0.05}
                  value={revPerEvent}
                  onChange={(v) => setRevPerEvent(Number(v.toFixed(2)))}
                  rightLabel={`$${revPerEvent.toFixed(2)}`}
                />

                <SliderRow
                  label="Attach rate (paid workflows)"
                  helper="Percent of events that are monetized."
                  min={0.01}
                  max={0.95}
                  step={0.01}
                  value={attachRate}
                  onChange={(v) => setAttachRate(Number(v.toFixed(2)))}
                  rightLabel={`${Math.round(attachRate * 100)}%`}
                />

                <SliderRow
                  label="Gross margin"
                  helper="Blended GM after infra + payments + support."
                  min={0.2}
                  max={0.95}
                  step={0.01}
                  value={grossMargin}
                  onChange={(v) => setGrossMargin(Number(v.toFixed(2)))}
                  rightLabel={`${Math.round(grossMargin * 100)}%`}
                />

                <SliderRow
                  label="Time horizon (years)"
                  helper="Used for the roadmap narrative below."
                  min={1}
                  max={10}
                  step={1}
                  value={years}
                  onChange={(v) => setYears(v)}
                  rightLabel={`${years}y`}
                />

                <SliderRow
                  label="Revenue multiple (valuation)"
                  helper="Very simplified. Use this to explore ranges."
                  min={3}
                  max={30}
                  step={1}
                  value={revMultiple}
                  onChange={(v) => setRevMultiple(v)}
                  rightLabel={`${revMultiple}×`}
                />
              </div>
            </div>
          </div>

          {/* Right rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={card()}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>“$2T path” scenario solver</div>
              <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, lineHeight: 1.45 }}>
                Given your current assumptions, here’s what would need to be true to reach a{" "}
                <b>$2.00T</b> valuation using the chosen revenue multiple. This is an exploration tool —
                not a prediction.
              </div>

              <div
                style={{
                  marginTop: 12,
                  border: "1px solid rgba(0,0,0,0.10)",
                  borderRadius: 14,
                  padding: 14,
                  background: "#fafafa",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.65 }}>
                  Required scale at current assumptions
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>Venues needed</div>
                    <div style={{ fontSize: 22, fontWeight: 900 }}>{fmtInt(venuesNeeded)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>Total events/day needed</div>
                    <div style={{ fontSize: 22, fontWeight: 900 }}>{fmtInt(totalEventsPerDayNeeded)}</div>
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>Defensibility index</div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{defensibility.toFixed(2)}</div>
                </div>

                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75, lineHeight: 1.45 }}>
                  Tip: the fastest “cheat codes” are usually <b>density</b> (more venues),{" "}
                  <b>paid attach rate</b>, and <b>enterprise revenue</b> (higher $/event or contract allocation).
                </div>
              </div>
            </div>

            <div style={card()}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Roadmap (time horizon)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                {[
                  ["Year 1: Pilot", "Signage + kiosk pass issuance + staff verification + audit logs."],
                  ["Year 2: Density", "Neighborhood cluster; referral + onboarding; repeatable installs."],
                  ["Year 3: Multi-vertical", "Restrooms, cowork, offices, events; common policy primitives."],
                  ["Year 4: Trust graph", "Cross-venue verification patterns; identity + logs compound."],
                  ["Year 5: Integrations", "Property ops, access controllers, check-in workflows, payments."],
                  ["Year 6: Enterprise deals", "Portfolio operators; standardized compliance; SLAs."],
                  ["Year 7: Global rollouts", "Local partners; multi-region reliability; standardized onboarding."],
                ].slice(0, clamp(years, 1, 7)).map(([t, d]) => (
                  <div
                    key={t}
                    style={{
                      border: "1px solid rgba(0,0,0,0.10)",
                      borderRadius: 14,
                      padding: 12,
                      background: "white",
                    }}
                  >
                    <div style={{ fontWeight: 900 }}>{t}</div>
                    <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={card()}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Demo shortcuts</div>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                {[
                  ["/venues", "Public directory →"],
                  ["/case-studies/sf-pilot", "SF pilot brief →"],
                  ["/onboarding", "Onboarding →"],
                  ["/outreach", "Outreach kit →"],
                  ["/verify", "Staff verify →"],
                  ["/scan", "QR scan →"],
                  ["/solutions/parking", "Parking validation →"],
                  ["/kiosk", "Kiosk mode →"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      ...btnBase(false),
                      borderRadius: 14,
                      display: "block",
                      padding: "12px 12px",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7, lineHeight: 1.45 }}>
                No fluff — everything above is intended to be demoable in minutes.
              </div>
            </div>

            <div style={card()}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>How to pitch this (30 seconds)</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                  <div style={{ fontWeight: 900 }}>Problem</div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, lineHeight: 1.5 }}>
                    Access is fragmented, insecure, and operationally expensive. Codes leak. Enforcement is inconsistent.
                    No universal policy layer.
                  </div>
                </div>
                <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                  <div style={{ fontWeight: 900 }}>Product</div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, lineHeight: 1.5 }}>
                    AXW issues time-bounded access passes with rules. Verification is instant. Everything is logged.
                    No codes are published.
                  </div>
                </div>
                <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                  <div style={{ fontWeight: 900 }}>Wedge</div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, lineHeight: 1.5 }}>
                    SF pilots: restrooms + cowork + offices. Kiosk issuance + staff verification + signage + onboarding kit.
                  </div>
                </div>
                <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                  <div style={{ fontWeight: 900 }}>Why we win</div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, lineHeight: 1.5 }}>
                    Once you have density, access becomes a network. Policy + verification + analytics becomes default infrastructure.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
                Note: This is intentionally simplified for demo/storytelling. We can harden into a real financial model later.
              </div>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
          © {new Date().getFullYear()} AXW — Access × World
        </footer>
      </div>

      {/* IMPORTANT: React import for useState/useEffect in App Router pages */}
      <script
        dangerouslySetInnerHTML={{
          __html: "",
        }}
      />
    </main>
  );
}

/**
 * App Router pages can use React hooks, but React must be in scope.
 * Next usually injects it, but for safety in TS + lint contexts, import it.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
