"use client";

import MarketingHeader from "@/components/MarketingHeader";
import React, { useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";

/**
 * Home v2 (Additive)
 * - Self-contained (no "@/..." imports)
 * - Apple/Microsoft-ish: clean, high-contrast, big type, stacked sections, mobile-safe
 * - Uses your existing images if present in /public:
 *   /axw-logo-wordmark.png, /axw-icon.png
 * - Links out to app + investors + other pages (never removes anything)
 */

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "dark";
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        border: tone === "dark" ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.12)",
        background: tone === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 14,
    lineHeight: 1,
    transition: "transform 120ms ease, opacity 120ms ease, background 120ms ease, border 120ms ease",
    userSelect: "none",
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "#0B0B0F", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" },
    secondary: { background: "#fff", color: "#0B0B0F", border: "1px solid rgba(0,0,0,0.14)" },
    ghost: { background: "transparent", color: "inherit", border: "1px solid rgba(255,255,255,0.18)" },
  };

  return (
    <a
      href={href}
      style={{ ...base, ...(styles[variant] || styles.primary) }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children} <span aria-hidden style={{ opacity: 0.65 }}>→</span>
    </a>
  );
}

function Card({
  title,
  children,
  subtle,
}: {
  title?: string;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <section
      style={{
        borderRadius: 20,
        border: subtle ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.10)",
        background: subtle ? "rgba(255,255,255,0.06)" : "#fff",
        boxShadow: subtle ? "none" : "0 20px 60px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {title ? (
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ fontWeight: 950, fontSize: 16 }}>{title}</div>
        </div>
      ) : null}
      <div style={{ padding: 16 }}>{children}</div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, opacity: 0.72 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 950, letterSpacing: -0.5 }}>{value}</div>
    </div>
  );
}

export default function HomeV2() {
  const [metrics, setMetrics] = useState<{ venues?: number; passes?: number } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/debug/schema", { cache: "no-store" });
        // We don't rely on schema, but this confirms API reachability.
        await r.json().catch(() => null);

        const r2 = await fetch("/api/debug/venues", { cache: "no-store" });
        const j2 = await r2.json().catch(() => null);

        // fallback: /api/debug/venues returns {ok,count,venues:[...]} in your logs
        const venueCount = Number(j2?.count ?? j2?.ok?.count ?? j2?.venues?.length ?? j2?.venues ?? 0) || 0;

        const r3 = await fetch("/api/debug/passes", { cache: "no-store" });
        const j3 = await r3.json().catch(() => null);
        // you mentioned {venues:5, passes:4} on one endpoint output
        const passes = Number(j3?.passes ?? j3?.count ?? 0) || 0;

        if (!alive) return;
        setMetrics({ venues: venueCount, passes });
      } catch {
        if (!alive) return;
        setMetrics(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const nav = useMemo(
    () => [
      { label: "Investors", href: "/investors" },
      { label: "Case Study", href: "/case-studies/sf-pilot" },
      { label: "Pricing", href: "/pricing" },
      { label: "Network", href: "/network" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: "#0B0B0F",
        background: "#fff",
      }}
    >
      {/* Top bar */}
      <MarketingHeader />

      {/* Hero */}
      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "54px 18px 22px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          <Pill>Policy-defined access</Pill>
          <Pill>Time-bounded tokens</Pill>
          <Pill>Audit logs</Pill>
          <Pill>Parking validation</Pill>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 18,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: 52,
                letterSpacing: -1.4,
                lineHeight: 1.03,
                margin: "0 0 14px",
                fontWeight: 980,
              }}
            >
              Programmable access,
              <br />
              everywhere.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.82, margin: "0 0 20px", maxWidth: 760 }}>
              AXW is the universal coordination layer between <b>access</b> and <b>space</b>: define rules once,
              issue scoped tokens, verify at any edge, and log every grant + use — without publishing sensitive codes.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ButtonLink href="https://app.accessxworld.com" variant="primary">
                Launch app
              </ButtonLink>
              <ButtonLink href="/investors" variant="secondary">
                Investor hub
              </ButtonLink>
              <ButtonLink href="/kiosk" variant="secondary">
                Kiosk mode
              </ButtonLink>
              <ButtonLink href="/solutions/parking" variant="secondary">
                Parking
              </ButtonLink>
            </div>

            <div style={{ marginTop: 18, fontSize: 13, opacity: 0.7 }}>
              Built for: venues • property ops • parking • enterprise • government • infrastructure partners
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <Card title="Live snapshot">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <Metric label="Venues" value={String(metrics?.venues ?? "—")} />
                <Metric label="Passes issued" value={String(metrics?.passes ?? "—")} />
              </div>

              <div style={{ height: 12 }} />

              <div style={{ display: "grid", gap: 10 }}>
                <a href="/case-studies/sf-pilot" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ fontWeight: 900 }}>SF Pilot</div>
                  <div style={{ fontSize: 13, opacity: 0.72 }}>Case study + rollout pack</div>
                </a>

                <a href="/investors/model" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ fontWeight: 900 }}>Model</div>
                  <div style={{ fontSize: 13, opacity: 0.72 }}>Unit economics + growth loops</div>
                </a>

                <a href="/vc/packet" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ fontWeight: 900 }}>VC Packet</div>
                  <div style={{ fontSize: 13, opacity: 0.72 }}>Pitch narrative + rollout</div>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile safety: single column on narrow screens */}
        <style>{`
          @media (max-width: 980px) {
            section > div[style*="grid-template-columns: 1.2fr 0.8fr"] { grid-template-columns: 1fr !important; }
            h1 { font-size: 42px !important; }
          }
        `}</style>
      </section>

      {/* Dark band (Apple-ish) */}
      <section
        style={{
          background: "#0B0B0F",
          color: "#fff",
          marginTop: 26,
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "42px 18px" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            <Pill tone="dark">Universal points of access</Pill>
            <Pill tone="dark">Doors • gates • garages • kiosks • APIs</Pill>
            <Pill tone="dark">Edge verify</Pill>
          </div>

          <h2 style={{ margin: "0 0 10px", fontSize: 32, letterSpacing: -0.8, fontWeight: 980 }}>
            One engine, many sectors.
          </h2>

          <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.7, maxWidth: 980 }}>
            AXW is designed as a neutral access-and-space coordination layer:
            tokenized permissions, policy rules, device verification, kiosk issuance, parking validation,
            staff scanning, and audit trails — scalable across every space type.
          </p>

          <div style={{ height: 20 }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <Card subtle title="Venues & Events">
              <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
                Staff verification, guest tokens, time windows, rate-limits, incident logs.
              </div>
              <div style={{ height: 10 }} />
              <ButtonLink href="/kiosk" variant="ghost">Kiosk hub</ButtonLink>
            </Card>

            <Card subtle title="Parking">
              <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
                Plate-entry kiosks, validation tokens, operator verify tools, event trails.
              </div>
              <div style={{ height: 10 }} />
              <ButtonLink href="/solutions/parking" variant="ghost">Parking solution</ButtonLink>
            </Card>

            <Card subtle title="Enterprise & Property Ops">
              <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
                Policy-based access across buildings, teams, vendors, and workflows.
              </div>
              <div style={{ height: 10 }} />
              <ButtonLink href="/enterprise" variant="ghost">Enterprise</ButtonLink>
            </Card>

            <Card subtle title="Government">
              <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
                Compliance-grade logging, workflows, standardized issuance and verification.
              </div>
              <div style={{ height: 10 }} />
              <ButtonLink href="/government" variant="ghost">Government</ButtonLink>
            </Card>
          </div>

          <style>{`
            @media (max-width: 980px) {
              h2 { font-size: 26px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 18px" }}>
        <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 980, letterSpacing: -0.4 }}>
          How it works
        </h3>
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.85, opacity: 0.9, maxWidth: 980 }}>
          <li><b>Define policies</b>: who/what/when/where constraints.</li>
          <li><b>Issue tokens</b>: scoped, expiring, rate-limited grants.</li>
          <li><b>Verify at the edge</b>: apps, kiosks, devices, APIs.</li>
          <li><b>Log everything</b>: audit, analytics, enforcement, dispute resolution.</li>
        </ol>

        <div style={{ height: 18 }} />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/investors" variant="primary">See the full investor story</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Talk to us</ButtonLink>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 18px", opacity: 0.75, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>© {new Date().getFullYear()} AXW — Access × World</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/legal/privacy" style={{ color: "inherit" }}>Privacy</a>
              <a href="/legal/terms" style={{ color: "inherit" }}>Terms</a>
              <a href="/press" style={{ color: "inherit" }}>Press</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
