"use client";

// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import React, { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

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
          {right ? <div>{right}</div> : null}
        </div>
      )}
      <div style={styles.cardBody}>{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...styles.pill,
        ...(active ? styles.pillActive : null),
      }}
    >
      {children}
    </button>
  );
}

function SliderRow({
  label,
  help,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  help?: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={styles.sliderTop}>
        <div>
          <div style={styles.sliderLabel}>{label}</div>
          {help ? <div style={styles.sliderHelp}>{help}</div> : null}
        </div>
        <div style={styles.sliderValue}>{valueLabel}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={styles.slider}
      />
    </div>
  );
}

export default function Home() {
  // “Apple/Microsoft” style: minimal, sharp copy, interactive proof.
  const [venues, setVenues] = useState(2500);
  const [eventsPerVenue, setEventsPerVenue] = useState(35);
  const [revPerEvent, setRevPerEvent] = useState(0.25);
  const [attachRate, setAttachRate] = useState(45); // %
  const [grossMargin, setGrossMargin] = useState(85); // %
  const [years, setYears] = useState(7);
  const [revMultiple, setRevMultiple] = useState(18);

  const [vertical, setVertical] = useState<
    "mixed" | "restrooms" | "cowork" | "offices" | "events" | "enterprise"
  >("mixed");

  const verticalLabel = useMemo(() => {
    switch (vertical) {
      case "restrooms":
        return "Restrooms / public amenities";
      case "cowork":
        return "Cowork / workspace";
      case "offices":
        return "Offices / property ops";
      case "events":
        return "Events / venues / festivals";
      case "enterprise":
        return "Enterprise / infrastructure partners";
      default:
        return "Mixed network (default)";
    }
  }, [vertical]);

  const totalEventsPerDay = useMemo(() => venues * eventsPerVenue, [venues, eventsPerVenue]);

  const monetizedEventsPerDay = useMemo(() => {
    // attachRate = % of events that monetize
    return Math.round(totalEventsPerDay * (attachRate / 100));
  }, [totalEventsPerDay, attachRate]);

  const annualRevenueSimple = useMemo(() => {
    // simple “rev/event * monetized events/day * 365”
    return monetizedEventsPerDay * revPerEvent * 365;
  }, [monetizedEventsPerDay, revPerEvent]);

  const valuation = useMemo(() => annualRevenueSimple * revMultiple, [annualRevenueSimple, revMultiple]);

  // “$2T path” scenario solver (exploration, not prediction)
  const twoT = useMemo(() => {
    const target = 2_000_000_000_000;
    const requiredAnnualRevenue = target / revMultiple;
    const requiredDailyRevenue = requiredAnnualRevenue / 365;
    const requiredMonetizedEventsPerDay = requiredDailyRevenue / Math.max(0.01, revPerEvent);
    const requiredTotalEventsPerDay = requiredMonetizedEventsPerDay / Math.max(0.01, attachRate / 100);
    const requiredVenues = requiredTotalEventsPerDay / Math.max(1, eventsPerVenue);
    const defensibilityIndex =
      Math.log10(Math.max(10, venues)) * (attachRate / 100) * (grossMargin / 100) * 10;

    return {
      requiredVenues,
      requiredTotalEventsPerDay,
      defensibilityIndex,
    };
  }, [revMultiple, revPerEvent, attachRate, eventsPerVenue, venues, grossMargin]);

  const money = (n: number) => {
    if (!isFinite(n)) return "$0";
    const abs = Math.abs(n);
    if (abs >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
    if (abs >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
    if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `$${(n / 1_000).toFixed(2)}k`;
    return `$${n.toFixed(2)}`;
  };

  const int = (n: number) => Math.round(n).toLocaleString();

  return (
    <main style={styles.page}>
      {/* Top nav */}
      <div style={styles.navWrap}>
        <div style={styles.nav}>
          <div style={styles.navLeft}>
            <div style={styles.logoBox}>
              <Image
                alt="AXW"
                src="/brand/axw-icon.png"
                width={28}
                height={28}
                style={{ borderRadius: 8 }}
                priority
              />
            </div>
            <div style={{ display: "grid", lineHeight: 1.1 }}>
              <div style={styles.brand}>AXW</div>
              <div style={styles.brandSub}>Access × World</div>
            </div>
          </div>

          <div style={styles.navRight}>
            <Link href="/investors" style={styles.navLink}>
              Investors
            </Link>
            <Link href="/demo" style={styles.navLink}>
              Demo
            </Link>
            <Link href="/venues" style={styles.navLink}>
              Directory
            </Link>
            <Link href="/kiosk" style={styles.navLink}>
              Kiosk
            </Link>
            <Link href="/login" style={styles.cta}>
              Owner login
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.wrap}>
        {/* Hero */}
        <header style={{ marginTop: 22 }}>
          <div style={styles.kicker}>Programmable access infrastructure</div>
          <h1 style={styles.h1}>
            Access ↔ Space is <br />
            a universal primitive.
          </h1>
          <p style={styles.lede}>
            AXW standardizes issuance, verification, and audit logs for physical access.
            Build rule-driven workflows across venues — without publishing codes.
          </p>

          <div style={styles.heroButtons}>
            <Link href="/demo" style={styles.primaryBtn}>
              View demo →
            </Link>
            <Link href="/investors" style={styles.ghostBtn}>
              Investor model →
            </Link>
            <Link href="/solutions/parking" style={styles.ghostBtn}>
              Parking validation →
            </Link>
          </div>

          <div style={styles.heroTiles}>
            <div style={styles.heroTile}>
              <div style={styles.heroTileTitle}>Policy</div>
              <div style={styles.heroTileText}>Rules decide who gets access, when, and why.</div>
            </div>
            <div style={styles.heroTile}>
              <div style={styles.heroTileTitle}>Verification</div>
              <div style={styles.heroTileText}>Staff + device verification, instant and logged.</div>
            </div>
            <div style={styles.heroTile}>
              <div style={styles.heroTileTitle}>Evidence</div>
              <div style={styles.heroTileText}>Audit logs become the system of record.</div>
            </div>
          </div>
        </header>

        {/* Interactive proof */}
        <Card
          title="Scenario engine"
          subtitle="Tune scale + frequency + monetization to see how access becomes a network."
        >
          <div style={styles.sectionLabel}>Vertical mix</div>
          <div style={styles.pills}>
            <Pill active={vertical === "restrooms"} onClick={() => setVertical("restrooms")}>
              Restrooms / public amenities
            </Pill>
            <Pill active={vertical === "cowork"} onClick={() => setVertical("cowork")}>
              Cowork / workspace
            </Pill>
            <Pill active={vertical === "offices"} onClick={() => setVertical("offices")}>
              Offices / property ops
            </Pill>
            <Pill active={vertical === "events"} onClick={() => setVertical("events")}>
              Events / venues / festivals
            </Pill>
            <Pill active={vertical === "enterprise"} onClick={() => setVertical("enterprise")}>
              Enterprise / infrastructure partners
            </Pill>
            <Pill active={vertical === "mixed"} onClick={() => setVertical("mixed")}>
              Mixed network (default)
            </Pill>
          </div>

          <div style={{ marginTop: 12, ...styles.muted }}>
            <b>{verticalLabel}</b>: the demo narrative changes, but the primitives stay constant —
            issue → verify → log → enforce.
          </div>

          <div style={styles.statsGrid}>
            <Stat label="Total events/day" value={int(totalEventsPerDay)} />
            <Stat label="Monetized events/day" value={int(monetizedEventsPerDay)} />
            <Stat label="Annual revenue (simple)" value={money(annualRevenueSimple)} />
            <Stat label="Valuation (rev multiple)" value={money(valuation)} />
          </div>

          <SliderRow
            label="Live venues / sites"
            help="Active locations in the network (venues, properties, facilities)."
            valueLabel={int(venues)}
            min={50}
            max={250000}
            step={50}
            value={venues}
            onChange={setVenues}
          />

          <SliderRow
            label="Access events per venue per day"
            help="Requests / verifications / kiosk grants per site per day."
            valueLabel={int(eventsPerVenue)}
            min={1}
            max={250}
            step={1}
            value={eventsPerVenue}
            onChange={setEventsPerVenue}
          />

          <SliderRow
            label="Revenue per monetized event"
            help="Avg revenue per verification event (fee / SaaS allocation)."
            valueLabel={money(revPerEvent)}
            min={0.05}
            max={10}
            step={0.05}
            value={revPerEvent}
            onChange={setRevPerEvent}
          />

          <SliderRow
            label="Attach rate (paid workflows)"
            help="Percent of events that are monetized."
            valueLabel={`${attachRate}%`}
            min={1}
            max={95}
            step={1}
            value={attachRate}
            onChange={setAttachRate}
          />

          <SliderRow
            label="Gross margin"
            help="Blended GM after infra + payments + support."
            valueLabel={`${grossMargin}%`}
            min={40}
            max={95}
            step={1}
            value={grossMargin}
            onChange={setGrossMargin}
          />

          <SliderRow
            label="Time horizon (years)"
            help="Used for the roadmap narrative below."
            valueLabel={`${years}y`}
            min={1}
            max={12}
            step={1}
            value={years}
            onChange={setYears}
          />

          <SliderRow
            label="Revenue multiple (valuation)"
            help="Very simplified. Use this to explore ranges."
            valueLabel={`${revMultiple}×`}
            min={2}
            max={30}
            step={1}
            value={revMultiple}
            onChange={setRevMultiple}
          />
        </Card>

        {/* $2T path */}
        <Card
          title="“$2T path” scenario solver"
          subtitle="Given your current assumptions, here’s what would need to be true to reach $2.00T valuation using the chosen revenue multiple. Exploration only — not a prediction."
        >
          <div style={styles.twoTGrid}>
            <div style={styles.twoTBox}>
              <div style={styles.twoTLabel}>Required scale at current assumptions</div>
              <div style={styles.twoTRow}>
                <div>
                  <div style={styles.twoTBig}>{int(twoT.requiredVenues)}</div>
                  <div style={styles.twoTSub}>Venues needed</div>
                </div>
                <div>
                  <div style={styles.twoTBig}>{int(twoT.requiredTotalEventsPerDay)}</div>
                  <div style={styles.twoTSub}>Total events/day needed</div>
                </div>
              </div>
              <div style={{ marginTop: 10, ...styles.muted }}>
                <b>Defensibility index</b>: {twoT.defensibilityIndex.toFixed(2)}
                <div style={{ marginTop: 6 }}>
                  Tip: the fastest “cheat codes” are usually <b>density</b> (more venues),{" "}
                  <b>paid attach rate</b>, and <b>enterprise revenue</b> (higher $/event or contract allocation).
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Roadmap */}
        <Card title="Roadmap (time horizon)">
          <div style={styles.roadmap}>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 1: Pilot</div>
              <div style={styles.roadText}>
                Signage + kiosk issuance + staff verification + audit logs.
              </div>
            </div>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 2: Density</div>
              <div style={styles.roadText}>
                Neighborhood clusters; referral + onboarding; repeatable installs.
              </div>
            </div>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 3: Multi-vertical</div>
              <div style={styles.roadText}>
                Restrooms, cowork, offices, events; common policy primitives.
              </div>
            </div>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 4: Trust graph</div>
              <div style={styles.roadText}>
                Cross-venue verification patterns; identity + logs compound.
              </div>
            </div>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 5: Integrations</div>
              <div style={styles.roadText}>
                Property ops, access controllers, check-in workflows, payments.
              </div>
            </div>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 6: Enterprise deals</div>
              <div style={styles.roadText}>
                Portfolio operators; standardized compliance; SLAs.
              </div>
            </div>
            <div style={styles.roadItem}>
              <div style={styles.roadTitle}>Year 7: Global rollouts</div>
              <div style={styles.roadText}>
                Local partners; multi-region reliability; standardized onboarding.
              </div>
            </div>
          </div>
        </Card>

        {/* Demo shortcuts */}
        <Card title="Demo shortcuts" subtitle="Fast links for showing the system live.">
          <div style={styles.shortcuts}>
            <Link style={styles.shortcut} href="/venues">
              Public directory →
            </Link>
            <Link style={styles.shortcut} href="/sf-pilot">
              SF pilot brief →
            </Link>
            <Link style={styles.shortcut} href="/onboarding">
              Onboarding →
            </Link>
            <Link style={styles.shortcut} href="/outreach">
              Outreach kit →
            </Link>
            <Link style={styles.shortcut} href="/verify">
              Staff verify →
            </Link>
            <Link style={styles.shortcut} href="/demo">
              QR scan →
            </Link>
          </div>
        </Card>

        {/* 30-second pitch */}
        <Card title="How to pitch this (30 seconds)">
          <div style={styles.pitchGrid}>
            <div style={styles.pitchBox}>
              <div style={styles.pitchTitle}>Problem</div>
              <div style={styles.pitchText}>
                Access is fragmented, insecure, and operationally expensive. Codes leak.
                Enforcement is inconsistent. No universal policy layer.
              </div>
            </div>
            <div style={styles.pitchBox}>
              <div style={styles.pitchTitle}>Product</div>
              <div style={styles.pitchText}>
                AXW issues time-bounded access passes with rules. Verification is instant.
                Everything is logged. No codes are published.
              </div>
            </div>
            <div style={styles.pitchBox}>
              <div style={styles.pitchTitle}>Wedge</div>
              <div style={styles.pitchText}>
                SF pilots: restrooms + cowork + offices. Kiosk issuance + staff verification +
                signage + onboarding kit.
              </div>
            </div>
            <div style={styles.pitchBox}>
              <div style={styles.pitchTitle}>Why we win</div>
              <div style={styles.pitchText}>
                Once you have density, access becomes a network. Policy + verification + analytics
                becomes default infrastructure.
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, ...styles.muted }}>
            Note: This is intentionally simplified for demos/storytelling. It’s built to communicate
            shape + leverage fast.
          </div>
        </Card>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              alt="AXW"
              src="/brand/axw-icon.png"
              width={22}
              height={22}
              style={{ borderRadius: 7 }}
            />
            <div style={{ fontWeight: 800 }}>AXW</div>
            <div style={{ opacity: 0.7 }}>Access × World</div>
          </div>

          <div style={styles.footerLinks}>
            <Link href="/legal/terms" style={styles.footerLink}>
              Terms
            </Link>
            <Link href="/legal/privacy" style={styles.footerLink}>
              Privacy
            </Link>
            <Link href="/contact" style={styles.footerLink}>
              Contact
            </Link>
            <Link href="/investors" style={styles.footerLink}>
              Investors
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 700px at 10% 0%, rgba(80,120,255,0.18), transparent 60%), radial-gradient(900px 500px at 100% 10%, rgba(255,255,255,0.08), transparent 55%), #060A12",
    color: "rgba(255,255,255,0.92)",
  },
  wrap: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "0 18px 50px",
  },

  navWrap: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background: "rgba(6,10,18,0.7)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  nav: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "12px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  navLeft: { display: "flex", alignItems: "center", gap: 10 },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  brand: { fontWeight: 900, letterSpacing: 0.3 },
  brandSub: { fontSize: 12, opacity: 0.7 },

  navRight: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  navLink: {
    fontSize: 13,
    opacity: 0.85,
    textDecoration: "none",
    color: "rgba(255,255,255,0.9)",
    padding: "8px 10px",
    borderRadius: 12,
  },
  cta: {
    textDecoration: "none",
    color: "rgba(255,255,255,0.95)",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.14)",
    padding: "9px 12px",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 13,
  },

  kicker: { opacity: 0.8, fontSize: 13, letterSpacing: 0.4, marginTop: 8 },
  h1: {
    fontSize: 54,
    lineHeight: 1.02,
    margin: "12px 0 10px",
    letterSpacing: -1.2,
    fontWeight: 950,
  },
  lede: {
    maxWidth: 760,
    fontSize: 16,
    lineHeight: 1.6,
    opacity: 0.86,
    marginBottom: 16,
  },
  heroButtons: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 },
  primaryBtn: {
    textDecoration: "none",
    color: "#0B1220",
    background: "rgba(255,255,255,0.92)",
    padding: "11px 14px",
    borderRadius: 16,
    fontWeight: 900,
    fontSize: 13,
  },
  ghostBtn: {
    textDecoration: "none",
    color: "rgba(255,255,255,0.92)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    padding: "11px 14px",
    borderRadius: 16,
    fontWeight: 800,
    fontSize: 13,
  },
  heroTiles: { display: "grid", gap: 10, gridTemplateColumns: "1fr", marginTop: 10 },
  heroTile: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 14,
  },
  heroTileTitle: { fontWeight: 900, marginBottom: 6 },
  heroTileText: { opacity: 0.8, lineHeight: 1.5, fontSize: 13 },

  card: {
    marginTop: 14,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 22,
    overflow: "hidden",
  },
  cardHead: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  cardTitle: { fontWeight: 950, letterSpacing: -0.2 },
  cardSub: { opacity: 0.75, fontSize: 13, marginTop: 4, maxWidth: 760 },
  cardBody: { padding: 16 },

  sectionLabel: { fontWeight: 900, marginBottom: 8, opacity: 0.95 },
  pills: { display: "flex", flexWrap: "wrap", gap: 8 },
  pill: {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.9)",
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  pillActive: {
    background: "rgba(255,255,255,0.92)",
    color: "#0B1220",
    border: "1px solid rgba(255,255,255,0.95)",
  },

  statsGrid: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },
  stat: {
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.10)",
    borderRadius: 18,
    padding: 14,
  },
  statLabel: { opacity: 0.72, fontSize: 12, fontWeight: 800 },
  statValue: { fontSize: 22, fontWeight: 950, marginTop: 6, letterSpacing: -0.3 },

  sliderTop: { display: "flex", justifyContent: "space-between", gap: 10 },
  sliderLabel: { fontWeight: 900, marginBottom: 3 },
  sliderHelp: { opacity: 0.72, fontSize: 12, lineHeight: 1.35 },
  sliderValue: { fontWeight: 950, opacity: 0.92 },
  slider: { width: "100%" },

  twoTGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
  twoTBox: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 16,
    background: "rgba(0,0,0,0.10)",
  },
  twoTLabel: { opacity: 0.72, fontSize: 12, fontWeight: 900 },
  twoTRow: {
    marginTop: 10,
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12,
  },
  twoTBig: { fontWeight: 950, fontSize: 26, letterSpacing: -0.4 },
  twoTSub: { opacity: 0.72, fontSize: 12, marginTop: 4 },

  roadmap: { display: "grid", gap: 10 },
  roadItem: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 14,
    background: "rgba(0,0,0,0.10)",
  },
  roadTitle: { fontWeight: 950 },
  roadText: { opacity: 0.78, fontSize: 13, marginTop: 4, lineHeight: 1.45 },

  shortcuts: { display: "grid", gap: 10 },
  shortcut: {
    display: "block",
    textDecoration: "none",
    color: "rgba(255,255,255,0.94)",
    fontWeight: 900,
    padding: 14,
    borderRadius: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
  },

  pitchGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
  pitchBox: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 14,
    background: "rgba(0,0,0,0.10)",
  },
  pitchTitle: { fontWeight: 950, marginBottom: 6 },
  pitchText: { opacity: 0.8, fontSize: 13, lineHeight: 1.55 },

  footer: {
    marginTop: 18,
    padding: "18px 2px 0",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    opacity: 0.92,
  },
  footerLinks: { display: "flex", gap: 12, flexWrap: "wrap" },
  footerLink: { color: "rgba(255,255,255,0.86)", textDecoration: "none", fontWeight: 800, fontSize: 13 },

  muted: { opacity: 0.78, fontSize: 13, lineHeight: 1.5 },
};
