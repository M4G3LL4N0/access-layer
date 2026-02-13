"use client";

import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState<null | "starter" | "pro" | "enterprise">(null);
  const [err, setErr] = useState<string>("");

  async function start(plan: "starter" | "pro" | "enterprise") {
    setErr("");
    setLoading(plan);
    try {
      const r = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const j = await r.json();
      if (!j.ok || !j.url) throw new Error(j.error || "Checkout failed");
      window.location.href = j.url;
    } catch (e: any) {
      setErr(e?.message || "Checkout failed");
      setLoading(null);
    }
  }

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 999 }}>Pricing</h1>
          <div style={{ marginTop: 8, opacity: 0.8, maxWidth: 920, lineHeight: 1.6 }}>
            Owner controls + analytics + compliance-grade logs. This is the monetization layer for Access ↔ Space.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Nav href="/demo">Demo</Nav>
          <Nav href="/investors">Investors</Nav>
          <Nav href="/venues">Directory</Nav>
        </div>
      </header>

      {err ? (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 14,
            border: "1px solid #3a2a2a",
            background: "#2a0b0b",
            fontWeight: 900,
          }}
        >
          {err}
        </div>
      ) : null}

      <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <Plan
          name="Starter"
          price="$49/mo"
          bullets={[
            "Rules: hours, cooldown, daily limits",
            "Basic analytics: requests & passes",
            "Signage QR + staff verify flow",
            "Single venue",
          ]}
          cta="Start Starter"
          loading={loading === "starter"}
          onClick={() => start("starter")}
        />
        <Plan
          name="Pro"
          price="$199/mo"
          bullets={[
            "Everything in Starter",
            "Multi-venue & staff roles",
            "Audit logs + export",
            "Owner onboarding & invites",
          ]}
          cta="Start Pro"
          loading={loading === "pro"}
          onClick={() => start("pro")}
        />
        <Plan
          name="Enterprise"
          price="Custom"
          bullets={[
            "SSO / SAML",
            "Compliance & SLA",
            "Custom integrations",
            "Fleet rollout / chain deployments",
          ]}
          cta="Talk to us"
          loading={loading === "enterprise"}
          onClick={() => start("enterprise")}
        />
      </section>

      <section style={{ marginTop: 18 }}>
        <div style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 18, padding: 16 }}>
          <div style={{ fontWeight: 999, fontSize: 18 }}>What you’re buying</div>
          <div style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7 }}>
            A neutral access layer: rule engine + issuance + verification + logs + analytics. Long-term, this becomes
            infrastructure for multi-category access networks (public + private spaces).
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Nav href="/verify">Verifier</Nav>
            <Nav href="/admin/metrics">Metrics</Nav>
            <Nav href="/reports/sf">SF Report</Nav>
          </div>
        </div>
      </section>
    </main>
  );
}

function Plan({
  name,
  price,
  bullets,
  cta,
  loading,
  onClick,
}: {
  name: string;
  price: string;
  bullets: string[];
  cta: string;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <div style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 18, padding: 16 }}>
      <div style={{ fontWeight: 999, fontSize: 20 }}>{name}</div>
      <div style={{ marginTop: 8, fontSize: 34, fontWeight: 999 }}>{price}</div>
      <ul style={{ marginTop: 10, marginLeft: 18, opacity: 0.9, lineHeight: 1.7 }}>
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <button
        onClick={onClick}
        disabled={loading}
        style={{
          marginTop: 14,
          width: "100%",
          padding: "12px 14px",
          borderRadius: 14,
          border: "1px solid #23232a",
          background: "black",
          color: "white",
          fontWeight: 999,
          cursor: "pointer",
        }}
      >
        {loading ? "Redirecting…" : cta}
      </button>
    </div>
  );
}

function Nav({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        background: "black",
        color: "white",
        textDecoration: "none",
        fontWeight: 950,
        border: "1px solid #23232a",
      }}
    >
      {children}
    </Link>
  );
}
