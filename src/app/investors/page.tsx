"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

/**
 * AXW / Investors — Main page (STACKED layout like your screenshots)
 * - Mobile-first stacked cards (no side-by-side compression)
 * - Interactive slider engine (growth levers)
 * - "2 Trillion Dollar Path" narrative
 * - Links to ALL other investor pages (we only add, never replace)
 */

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.card}>
      {(title || subtitle || right) && (
        <div style={styles.cardHead}>
          <div>
            {title ? <div style={styles.cardTitle}>{title}</div> : null}
            {subtitle ? <div style={styles.cardSub}>{subtitle}</div> : null}
          </div>
          {right ? <div style={styles.cardRight}>{right}</div> : null}
        </div>
      )}
      <div style={styles.cardBody}>{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span style={styles.pill}>{children}</span>;
}

function MiniLink({
  href,
  label,
  note,
}: {
  href: string;
  label: string;
  note?: string;
}) {
  return (
    <a href={href} style={styles.miniLink}>
      <div style={{ fontWeight: 900 }}>{label}</div>
      {note ? <div style={{ opacity: 0.7, fontSize: 12 }}>{note}</div> : null}
    </a>
  );
}

function SliderRow({
  label,
  value,
  setValue,
  min,
  max,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div style={styles.sliderRow}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 900 }}>{label}</div>
        <div style={{ fontWeight: 900, opacity: 0.9 }}>{value}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%" }}
      />
      {hint ? <div style={{ fontSize: 12, opacity: 0.7 }}>{hint}</div> : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.metric}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 1000, letterSpacing: -0.4 }}>{value}</div>
    </div>
  );
}

export default function InvestorsPage() {
  // Simple “interactive engine” — this is a storytelling tool, not financial guidance.
  const [venues, setVenues] = useState(2500); // onboarded “spaces”
  const [activation, setActivation] = useState(30); // % that become recurring paying
  const [arpu, setArpu] = useState(350); // $ per month per active venue
  const [takeRate, setTakeRate] = useState(12); // % of GMV / payments / revenue pass-through
  const [attach, setAttach] = useState(20); // % adopting hardware/edge verification
  const [geo, setGeo] = useState(2); // # major metros
  const [enterprise, setEnterprise] = useState(3); // # enterprise integrations

  const model = useMemo(() => {
    const activeVenues = Math.round((venues * activation) / 100);
    const mrr = activeVenues * arpu;

    // “GMV” style layer for payments/validation/etc (illustrative)
    const gmv = activeVenues * (arpu * 6); // assume value passing through is higher than ARPU
    const take = Math.round((gmv * takeRate) / 100);

    const hardwareMonthly = Math.round(activeVenues * (attach / 100) * 25); // edge fee
    const enterpriseMonthly = enterprise * 25000;

    const totalMonthly = mrr + take + hardwareMonthly + enterpriseMonthly;
    const arr = totalMonthly * 12;

    // Loose “story” multipliers for an investor narrative; not a valuation claim.
    const scaleIndex = Math.min(
      100,
      Math.round(
        (Math.log10(Math.max(venues, 10)) * 18) +
          activation * 0.35 +
          takeRate * 0.8 +
          attach * 0.25 +
          geo * 3 +
          enterprise * 4
      )
    );

    return {
      activeVenues,
      mrr,
      gmv,
      take,
      hardwareMonthly,
      enterpriseMonthly,
      totalMonthly,
      arr,
      scaleIndex,
    };
  }, [venues, activation, arpu, takeRate, attach, geo, enterprise]);

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <header style={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={styles.logoBox}>AXW</div>
            <div style={{ lineHeight: 1.05 }}>
              <div style={{ fontWeight: 1000, letterSpacing: -0.4 }}>Investors</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Access × World — programmable access infrastructure</div>
            </div>
          </div>
          <div style={styles.topLinks}>
            <a href="/" style={styles.topLink}>Home</a>
            <a href="/venues" style={styles.topLink}>Directory</a>
            <a href="/demo" style={styles.topLink}>Demo</a>
            <a href="/contact" style={styles.topLinkStrong}>Contact</a>
          </div>
        </header>

        {/* ===== STACKED cards like your screenshots ===== */}

        <Card
          title="The Access × Space Layer"
          subtitle="We are building the universal coordination layer between people, policy, and physical space — across every access point."
          right={<Pill>Investor Hub</Pill>}
        >
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 900 }}>
              Thesis: Access isn’t “a code.” It’s a programmable permission system — time-bounded tokens, policy rules, and auditable logs.
            </div>
            <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
              AXW standardizes how access is issued, verified, revoked, and audited — across doors, gates, elevators, parking, shared workspaces,
              event entrances, loading docks, lockers, equipment rooms, and more.
            </div>

            <div style={styles.kvRow}>
              <Pill>Tokens</Pill>
              <Pill>Rules</Pill>
              <Pill>Edge verification</Pill>
              <Pill>Audit logs</Pill>
              <Pill>Partner integrations</Pill>
            </div>
          </div>
        </Card>

        <Card
          title="Interactive Engine (Sliders)"
          subtitle="Use sliders to tell the growth story and unit economics story in one place. (Illustrative model.)"
          right={<Pill>Live</Pill>}
        >
          <div style={styles.metricsGrid}>
            <Metric label="Venues onboarded" value={`${venues.toLocaleString()}`} />
            <Metric label="Active venues" value={`${model.activeVenues.toLocaleString()}`} />
            <Metric label="Monthly revenue (blend)" value={`$${Math.round(model.totalMonthly).toLocaleString()}`} />
            <Metric label="ARR (blend)" value={`$${Math.round(model.arr).toLocaleString()}`} />
            <Metric label="Scale Index" value={`${model.scaleIndex}/100`} />
            <Metric label="Metros" value={`${geo}`} />
          </div>

          <div style={{ height: 14 }} />

          <div style={{ display: "grid", gap: 12 }}>
            <SliderRow
              label="Venues (spaces) onboarded"
              value={venues}
              setValue={setVenues}
              min={10}
              max={250000}
              step={10}
              hint="Total onboarded spaces across categories (cafe, office, parking, venue, etc.)."
            />
            <SliderRow
              label="Activation rate (%)"
              value={activation}
              setValue={setActivation}
              min={1}
              max={85}
              step={1}
              hint="Percent of onboarded venues that become recurring."
            />
            <SliderRow
              label="ARPU ($/month per active venue)"
              value={arpu}
              setValue={setArpu}
              min={25}
              max={5000}
              step={25}
              hint="Blended software subscription / ops fee."
            />
            <SliderRow
              label="Payments/GMV take rate (%)"
              value={takeRate}
              setValue={setTakeRate}
              min={0}
              max={25}
              step={1}
              hint="Optional layer: validation / token issuance / payments / partner rev share."
            />
            <SliderRow
              label="Edge/hardware attach rate (%)"
              value={attach}
              setValue={setAttach}
              min={0}
              max={80}
              step={1}
              hint="Percent adopting edge verification devices, kiosk workflows, or hardware integrations."
            />
            <SliderRow
              label="Metros"
              value={geo}
              setValue={setGeo}
              min={1}
              max={30}
              step={1}
              hint="Geographic expansion — rollout city-by-city."
            />
            <SliderRow
              label="Enterprise integrations"
              value={enterprise}
              setValue={setEnterprise}
              min={0}
              max={50}
              step={1}
              hint="Integrations with access control vendors / property management / parking operators."
            />
          </div>

          <div style={{ height: 16 }} />

          <div style={styles.noteBox}>
            <div style={{ fontWeight: 1000 }}>What investors should see</div>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.7, opacity: 0.9 }}>
              <li>We can win bottom-up (SMB venues) and top-down (enterprise/partners).</li>
              <li>We monetize per space + per verification + per workflow + (optionally) payments.</li>
              <li>We’re building a category-defining API + edge layer that can standardize access globally.</li>
            </ul>
          </div>
        </Card>

        <Card
          title="The 2 Trillion Dollar Path"
          subtitle="A long-term vision narrative: universal infrastructure across all access points and all spaces."
          right={<Pill>Moonshot</Pill>}
        >
          <div style={{ display: "grid", gap: 10, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 1000 }}>Phase 1 — Pilot & Proof (weeks)</div>
            <div style={{ opacity: 0.9 }}>
              Pick a narrow workflow, ship a pilot pack, demonstrate: issue tokens → verify → log → revoke. Expand inside the venue.
            </div>

            <div style={{ fontWeight: 1000 }}>Phase 2 — Multi-Workflow Expansion (months)</div>
            <div style={{ opacity: 0.9 }}>
              Add parking validation, staff kiosk issuance, QR scanning, device verification, audit reports, and owner onboarding.
              Win multiple venue categories.
            </div>

            <div style={{ fontWeight: 1000 }}>Phase 3 — Partner Layer (1–2 years)</div>
            <div style={{ opacity: 0.9 }}>
              Become the “Stripe layer” for access vendors: unify issuance & verification across controllers, mobile apps, kiosks, gates, elevators.
            </div>

            <div style={{ fontWeight: 1000 }}>Phase 4 — Global Standard (long-term)</div>
            <div style={{ opacity: 0.9 }}>
              AXW becomes the universal protocol + network for access permissions and space coordination — across real estate, events, logistics, transport,
              government facilities, education, healthcare, and enterprise.
            </div>

            <div style={styles.kvRow}>
              <Pill>Doors</Pill>
              <Pill>Gates</Pill>
              <Pill>Elevators</Pill>
              <Pill>Parking</Pill>
              <Pill>Lockers</Pill>
              <Pill>Loading docks</Pill>
              <Pill>Venues</Pill>
              <Pill>Campuses</Pill>
            </div>
          </div>
        </Card>

        <Card
          title="Investor Pages & Packets"
          subtitle="We link everything here. (We do not remove pages — we add cross-links.)"
          right={<Pill>Links</Pill>}
        >
          <div style={styles.linksGrid}>
            <MiniLink href="/investors/model" label="Investors — Model" note="Detailed model narrative & assumptions." />
            <MiniLink href="/vc" label="VC — Hub" note="Pitch hub landing." />
            <MiniLink href="/vc/packet" label="VC — Packet" note="Investor packet style page." />
            <MiniLink href="/vc/checklist" label="VC — Checklist" note="Due diligence prep checklist." />
            <MiniLink href="/press" label="Press" note="PR landing." />
            <MiniLink href="/case-studies/sf-pilot" label="Case Study — SF Pilot" note="Pilot narrative." />
            <MiniLink href="/sf-pilot" label="SF Pilot (legacy)" note="Earlier pilot page." />
            <MiniLink href="/demo" label="Demo" note="Product demo page." />
            <MiniLink href="/hardware" label="Hardware" note="Device verification + kiosk links." />
            <MiniLink href="/kiosk" label="Kiosk Index" note="Select venue → kiosk mode." />
            <MiniLink href="/solutions/parking" label="Parking Solution" note="Parking validation workflows." />
            <MiniLink href="/parking" label="Parking Ops" note="Operator view & tests." />
          </div>
        </Card>

        <Card
          title="Next: What we ship in the product (website-first, investor-ready)"
          subtitle="This is the product story, in features."
          right={<Pill>Roadmap</Pill>}
        >
          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.75, opacity: 0.95 }}>
            <li><b>Owner onboarding</b>: lead capture → invite → claim → configure access rules.</li>
            <li><b>Token issuance</b>: kiosk + API + QR codes + time-bound passes.</li>
            <li><b>Verification</b>: staff verify page + device verify + parking verify.</li>
            <li><b>Audit & metrics</b>: security events, parking events, global metrics endpoints.</li>
            <li><b>Partner-ready</b>: edge issue/verify endpoints, device provisioning, admin ops.</li>
          </ol>

          <div style={{ height: 14 }} />

          <div style={styles.ctaRow}>
            <a href="/contact" style={styles.btnPrimary}>Talk to us</a>
            <a href="/demo" style={styles.btnGhost}>View demo</a>
            <a href="/venues" style={styles.btnGhost}>Explore venues</a>
          </div>
        </Card>

        <footer style={styles.footer}>
          <div style={{ opacity: 0.7 }}>© {new Date().getFullYear()} AXW — Access × World</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/legal/terms" style={styles.footerLink}>Terms</a>
            <a href="/legal/privacy" style={styles.footerLink}>Privacy</a>
            <a href="/contact" style={styles.footerLink}>Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#ffffff",
    color: "#0b0f19",
    minHeight: "100vh",
    fontFamily:
      "system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji",
  },
  wrap: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "22px 14px 42px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    display: "grid",
    placeItems: "center",
    fontWeight: 1000,
    letterSpacing: -0.6,
  },
  topLinks: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  topLink: {
    textDecoration: "none",
    color: "inherit",
    fontWeight: 800,
    opacity: 0.8,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.08)",
  },
  topLinkStrong: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: 1000,
    background: "#0b0f19",
    padding: "8px 12px",
    borderRadius: 10,
  },

  card: {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
    background: "#fff",
  },
  cardHead: {
    padding: "14px 14px 10px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 1000,
    letterSpacing: -0.4,
  },
  cardSub: {
    marginTop: 4,
    fontSize: 13,
    opacity: 0.75,
    maxWidth: 820,
    lineHeight: 1.35,
  },
  cardRight: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  cardBody: {
    padding: 14,
  },

  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    fontSize: 12,
    fontWeight: 900,
    opacity: 0.9,
    whiteSpace: "nowrap",
  },

  kvRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 8,
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },

  metric: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 12,
  },

  sliderRow: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 12,
    background: "#fff",
  },

  noteBox: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 12,
    background: "rgba(0,0,0,0.02)",
  },

  linksGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },

  miniLink: {
    textDecoration: "none",
    color: "inherit",
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 12,
    display: "block",
  },

  ctaRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  btnPrimary: {
    textDecoration: "none",
    color: "#fff",
    background: "#0b0f19",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 1000,
  },
  btnGhost: {
    textDecoration: "none",
    color: "#0b0f19",
    border: "1px solid rgba(0,0,0,0.14)",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 1000,
  },

  footer: {
    marginTop: 18,
    paddingTop: 14,
    borderTop: "1px solid rgba(0,0,0,0.10)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    fontSize: 12,
  },
  footerLink: {
    textDecoration: "none",
    color: "inherit",
    opacity: 0.75,
    fontWeight: 800,
  },
};

// Mobile-first already. Add a tiny responsive bump for larger screens:
if (typeof window !== "undefined") {
  // no-op, keeps file client-safe
}
