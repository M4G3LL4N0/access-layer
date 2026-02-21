"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";

/**
 * AXW Mega Homepage (Additive, investor-grade)
 * - Keeps prior homepage at /home-v1
 * - Mobile-first stacked layout
 * - Cross-links to investor pages + product pages + kiosks + pilots
 * - Never removes existing pages; only adds navigation and content
 */

type GlobalMetrics = {
  ok: boolean;
  venues?: number;
  passes?: number;
  leads?: number;
  parkingEvents?: number;
  error?: string;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#fff",
    color: "#111",
    minHeight: "100vh",
  },
  wrap: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "68px 18px 96px",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 26,
  },
  brandLeft: { display: "flex", alignItems: "center", gap: 12 },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    background: "#111",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: 950,
    letterSpacing: 0.6,
  },
  brandTitle: { fontWeight: 950, lineHeight: 1.1 },
  brandSub: { fontSize: 12, opacity: 0.72 },
  nav: { display: "flex", gap: 10, flexWrap: "wrap" },

  hero: { marginTop: 10, marginBottom: 22 },
  h1: { fontSize: 52, letterSpacing: -1.4, margin: "10px 0 12px" },
  lead: {
    fontSize: 18,
    lineHeight: 1.6,
    opacity: 0.85,
    maxWidth: 920,
    margin: "0 0 18px",
  },
  ctas: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 },

  metaLine: { marginTop: 12, fontSize: 13, opacity: 0.7 },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 12,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 12,
  },

  section: { marginTop: 22 },
  sectionTitle: { fontSize: 22, margin: "18px 0 10px" },
  sectionSub: { fontSize: 14, opacity: 0.8, margin: "0 0 12px", maxWidth: 920 },

  card: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 18,
    padding: 16,
    background: "#fff",
  },
  cardHead: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: { fontWeight: 950, fontSize: 15 },
  cardSub: { fontSize: 13, opacity: 0.8, marginTop: 2, lineHeight: 1.4 },
  cardBody: { fontSize: 14, opacity: 0.9, lineHeight: 1.55 },

  pillRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 },
  pill: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.10)",
    opacity: 0.9,
  },

  footer: { marginTop: 36, fontSize: 12, opacity: 0.6, display: "flex", gap: 12, flexWrap: "wrap" },
};

function btnBase(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.12)",
    textDecoration: "none",
    color: "inherit",
    fontWeight: 900,
    background: "#fff",
  };
}
function btnPrimary(): React.CSSProperties {
  return { ...btnBase(), background: "#111", color: "#fff", border: "1px solid #111", fontWeight: 950 };
}
function btnGhost(): React.CSSProperties {
  return { ...btnBase(), background: "transparent" };
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

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 16,
        padding: 12,
        minWidth: 180,
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 950, letterSpacing: -0.5 }}>{value}</div>
      {hint ? <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>{hint}</div> : null}
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 900 }}>{label}</div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          {value}
          {suffix || ""}
        </div>
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
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.65 }}>
        <span>
          {min}
          {suffix || ""}
        </span>
        <span>
          {max}
          {suffix || ""}
        </span>
      </div>
    </div>
  );
}

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (abs >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

export default function Home() {
  const [metrics, setMetrics] = useState<GlobalMetrics>({ ok: false });
  const [mErr, setMErr] = useState<string>("");

  // Interactive “2T path” engine
  const [locations, setLocations] = useState<number>(25000);
  const [entryPointsPerLocation, setEntryPointsPerLocation] = useState<number>(8);
  const [monthlyARPUPerEntry, setMonthlyARPUPerEntry] = useState<number>(20);
  const [takeRatePct, setTakeRatePct] = useState<number>(15);

  const model = useMemo(() => {
    // Simple, legible “path” model:
    // total entry points = locations * entryPointsPerLocation
    // gross = entryPoints * monthlyARPUPerEntry * 12
    // platform revenue = gross * takeRatePct
    const entryPoints = locations * entryPointsPerLocation;
    const gross = entryPoints * monthlyARPUPerEntry * 12;
    const platform = gross * (takeRatePct / 100);
    return { entryPoints, gross, platform };
  }, [locations, entryPointsPerLocation, monthlyARPUPerEntry, takeRatePct]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setMErr("");
        const res = await fetch("/api/debug/env", { cache: "no-store" });
        // If env route exists it should return ok; if not, silently fail.
        if (!res.ok) return;
        const j = await res.json();
        // If you later expose real metrics, you can swap this to /api/metrics/global.
        // For now keep it safe: show minimal counts if present.
        const venues = typeof j?.venues === "number" ? j.venues : undefined;
        const passes = typeof j?.passes === "number" ? j.passes : undefined;
        if (!ignore) setMetrics({ ok: true, venues, passes });
      } catch (e: any) {
        if (!ignore) setMErr(String(e?.message || e));
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        {/* Top bar */}
        <header style={styles.topbar}>
          <div style={styles.brandLeft}>
            <div style={styles.logoBox}>AXW</div>
            <div>
              <div style={styles.brandTitle}>Access × World</div>
              <div style={styles.brandSub}>Programmable access infrastructure · policy → tokens → verification → audit</div>
            </div>
          </div>

          <nav style={styles.nav}>
            <Link href="/investors" style={btnBase()}>
              Investors
            </Link>
            <Link href="/case-studies/sf-pilot" style={btnBase()}>
              SF Pilot
            </Link>
            <Link href="/demo" style={btnBase()}>
              Demo
            </Link>
            <Link href="/kiosk" style={btnBase()}>
              Kiosk
            </Link>
            <Link href="/solutions/parking" style={btnBase()}>
              Parking
            </Link>
            <Link href="/contact" style={btnBase()}>
              Contact
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section style={styles.hero}>
          <h1 style={styles.h1}>Make access programmable.</h1>
          <p style={styles.lead}>
            AXW is the universal coordination layer between <b>access</b> and <b>space</b>.
            Replace shared secrets with policy-defined permissions, time-bounded tokens, verification tooling, and audit-grade logs —
            designed to integrate with real environments without publishing sensitive codes.
          </p>

          <div style={styles.ctas}>
            <a href="https://app.accessxworld.com" style={btnPrimary()}>
              Open the app
            </a>
            <Link href="/investors" style={btnGhost()}>
              Investor hub
            </Link>
            <Link href="/kiosk" style={btnGhost()}>
              Launch kiosk
            </Link>
            <Link href="/home-v1" style={btnGhost()}>
              Legacy homepage
            </Link>
          </div>

          <div style={styles.metaLine}>
            Built for: venues • workspaces • buildings • garages • logistics • campuses • enterprise ops • infrastructure partners
          </div>
        </section>

        {/* Live-ish metrics row (safe) */}
        <section style={styles.section}>
          <div style={styles.grid3}>
            <Stat label="Live venues (seed)" value={metrics.venues ?? "—"} hint="Seeded pilot venues in Supabase" />
            <Stat label="Tokens issued (seed)" value={metrics.passes ?? "—"} hint="Access pass tokens created in pilots" />
            <Stat label="Model: entry points" value={model.entryPoints.toLocaleString()} hint="From sliders below" />
          </div>
          {mErr ? <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>Metrics note: {mErr}</div> : null}
        </section>

        {/* What */}
        <section id="what" style={styles.section}>
          <h2 style={styles.sectionTitle}>What AXW delivers</h2>
          <p style={styles.sectionSub}>
            We standardize access primitives across sectors so onboarding new space types becomes configuration, not reinvention.
          </p>

          <div style={styles.grid3}>
            <Card
              title="Universal primitives"
              subtitle="Spaces · entrypoints · devices · policies · credentials"
            >
              A normalized model for every access point: doors, gates, garages, kiosks, turnstiles, desks, lockers, docks, elevators, and more.
            </Card>

            <Card
              title="Tokenized permissions"
              subtitle="Time-scoped · revocable · auditable"
            >
              Issue scoped tokens instead of sharing codes. Verify tokens in staff tools, kiosk modes, or edge integrations. Log every event.
            </Card>

            <Card
              title="Operator workflows"
              subtitle="Kiosk · staff verify · parking validation"
            >
              Instant pass issuing, staff QR verification, and parking validation flows that match what you see in the real world — but standardized.
            </Card>
          </div>

          <div style={styles.pillRow}>
            <span style={styles.pill}>No code publication</span>
            <span style={styles.pill}>Policy-driven</span>
            <span style={styles.pill}>Audit trail</span>
            <span style={styles.pill}>Works across sectors</span>
          </div>
        </section>

        {/* How */}
        <section id="how" style={styles.section}>
          <h2 style={styles.sectionTitle}>How it works</h2>
          <div style={styles.grid2}>
            <Card title="1) Define policies" subtitle="Who · what · when · where · constraints">
              Create rules once, then reuse across venues and sectors. Days/times, rate limits, payment requirements, and scope controls.
            </Card>

            <Card title="2) Issue credentials" subtitle="Tokens · QR · kiosk issuance">
              Kiosk mode can mint access passes in seconds. Parking kiosk can issue validations. Everything is time-bounded by default.
            </Card>

            <Card title="3) Verify at the edge" subtitle="Staff verifier · operator tools · device APIs">
              Staff can verify via /verify. Operators can validate parking tokens. Devices can verify via API endpoints.
            </Card>

            <Card title="4) Log and enforce" subtitle="Audit-grade events + operational analytics">
              Every issuance/verification becomes structured events for compliance, dispute resolution, security analysis, and billing reconciliation.
            </Card>
          </div>
        </section>

        {/* Investor-style “2T path” engine */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>The $2T path (interactive model)</h2>
          <p style={styles.sectionSub}>
            This is a simple, legible model for how a universal access × space coordination layer becomes a massive platform:
            scale locations → scale entrypoints → monetize per-entrypoint workflows → take-rate across a network.
          </p>

          <div style={styles.grid2}>
            <Card
              title="Scale inputs"
              subtitle="Move the sliders — watch the platform revenue change"
              right={
                <div style={{ fontSize: 12, opacity: 0.75, textAlign: "right" }}>
                  Platform rev/yr<br />
                  <span style={{ fontSize: 18, fontWeight: 950, opacity: 1 }}>
                    {formatMoney(model.platform)}
                  </span>
                </div>
              }
            >
              <Slider label="Locations" min={100} max={2500000} step={100} value={locations} onChange={setLocations} />
              <Slider
                label="Entry points per location"
                min={1}
                max={50}
                step={1}
                value={entryPointsPerLocation}
                onChange={setEntryPointsPerLocation}
              />
              <Slider
                label="Monthly ARPU per entry point"
                min={1}
                max={250}
                step={1}
                value={monthlyARPUPerEntry}
                onChange={setMonthlyARPUPerEntry}
                suffix=""
              />
              <Slider label="Platform take rate" min={1} max={40} step={1} value={takeRatePct} onChange={setTakeRatePct} suffix="%" />
              <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
                <b>Entry points:</b> {model.entryPoints.toLocaleString()} · <b>Gross:</b> {formatMoney(model.gross)} / yr ·{" "}
                <b>Platform:</b> {formatMoney(model.platform)} / yr
              </div>
            </Card>

            <Card title="Why this compounds" subtitle="Network effects and operational lock-in">
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.65 }}>
                <li><b>Standardization moat:</b> onboarding new space types becomes configuration.</li>
                <li><b>Audit + compliance:</b> once operators depend on logs, switching costs rise.</li>
                <li><b>Workflow gravity:</b> parking, doors, kiosks, vendors, deliveries, staff — all converge.</li>
                <li><b>Payments + identity:</b> paid access flows become a platform layer.</li>
                <li><b>Device ecosystem:</b> hardware integrations expand distribution.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Pilot CTA */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Pilot in 7 days</h2>
          <div style={styles.grid2}>
            <Card title="Pilot pack" subtitle="Everything a venue needs to run a first proof">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/onboarding/new" style={btnPrimary()}>
                  Start onboarding
                </Link>
                <Link href="/sf-pilot" style={btnGhost()}>
                  SF pilot page
                </Link>
                <Link href="/case-studies/sf-pilot" style={btnGhost()}>
                  Case study
                </Link>
              </div>
              <div style={{ marginTop: 12, fontSize: 13, opacity: 0.85 }}>
                Start with one workflow (staff verification, kiosk issuance, or parking validation). Prove value. Expand to more entrypoints.
              </div>
            </Card>

            <Card title="Operator-ready demos" subtitle="Show, don’t tell — use the live routes">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/kiosk" style={btnGhost()}>
                  Kiosk index
                </Link>
                <Link href="/verify" style={btnGhost()}>
                  Staff verify
                </Link>
                <Link href="/solutions/parking" style={btnGhost()}>
                  Parking solution
                </Link>
                <Link href="/hardware" style={btnGhost()}>
                  Hardware page
                </Link>
              </div>
              <div style={{ marginTop: 12, fontSize: 13, opacity: 0.85 }}>
                Kiosk can mint passes instantly. Verify can validate QR/token. Parking can issue and verify validations. Everything logs events.
              </div>
            </Card>
          </div>
        </section>

        {/* Navigation hub */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Explore the platform</h2>
          <p style={styles.sectionSub}>
            Everything below already exists in the site. This homepage just makes it discoverable and investor-friendly.
          </p>

          <div style={styles.grid3}>
            <Card title="Investor hub" subtitle="Pitch, model, packet, checklist">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/investors" style={btnPrimary()}>
                  /investors
                </Link>
                <Link href="/vc" style={btnGhost()}>
                  /vc
                </Link>
                <Link href="/vc/packet" style={btnGhost()}>
                  /vc/packet
                </Link>
                <Link href="/vc/checklist" style={btnGhost()}>
                  /vc/checklist
                </Link>
              </div>
            </Card>

            <Card title="Commercial" subtitle="Pricing + enterprise + government">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/pricing" style={btnGhost()}>
                  /pricing
                </Link>
                <Link href="/enterprise" style={btnGhost()}>
                  /enterprise
                </Link>
                <Link href="/government" style={btnGhost()}>
                  /government
                </Link>
                <Link href="/press" style={btnGhost()}>
                  /press
                </Link>
              </div>
            </Card>

            <Card title="Ops + admin" subtitle="Admin, ops, metrics, venues">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/admin" style={btnGhost()}>
                  /admin
                </Link>
                <Link href="/admin/metrics" style={btnGhost()}>
                  /admin/metrics
                </Link>
                <Link href="/venues" style={btnGhost()}>
                  /venues
                </Link>
                <Link href="/network" style={btnGhost()}>
                  /network
                </Link>
              </div>
            </Card>
          </div>
        </section>

        <footer style={styles.footer}>
          <span>© {new Date().getFullYear()} AXW — Access × World</span>
          <Link href="/home-v1">Legacy homepage</Link>
          <Link href="/investors">Investors</Link>
          <Link href="/contact">Contact</Link>
        </footer>
      </div>
    </main>
  );
}
