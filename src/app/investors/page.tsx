import Link from "next/link";

export const dynamic = "force-dynamic";

<<<<<<< HEAD
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 18,
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 8 }}>{title}</div>
      <div style={{ opacity: 0.9, lineHeight: 1.5 }}>{children}</div>
    </section>
  );
}

export default function InvestorsPage() {
  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#f6f6f6",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 16px 60px" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>
            AXW / INVESTORS
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href="/investors/model"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                background: "#fff",
                color: "#111",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Clean model →
            </Link>

            <Link
              href="/demo"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              View demo →
            </Link>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 46, lineHeight: 1.02, margin: "14px 0 10px" }}>
          Access ↔ Space is a universal primitive.
        </h1>

        <p style={{ margin: 0, maxWidth: 740, opacity: 0.75, lineHeight: 1.6 }}>
          This is an interactive pitch model. Tune venue scale, access frequency,
          monetization, and valuation multiple to explore why AXW becomes a network
          once density and verification are standardized.
        </p>

        {/* Everything below is STACKED */}
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <Card title="Key outputs">
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 800, opacity: 0.7, fontSize: 13 }}>
                  Total events/day
                </div>
                <div style={{ fontWeight: 950, fontSize: 30 }}>87,500</div>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 800, opacity: 0.7, fontSize: 13 }}>
                  Monetized events/day
                </div>
                <div style={{ fontWeight: 950, fontSize: 30 }}>39,375</div>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 800, opacity: 0.7, fontSize: 13 }}>
                  Annual revenue (simple)
                </div>
                <div style={{ fontWeight: 950, fontSize: 30 }}>$3.59M</div>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 800, opacity: 0.7, fontSize: 13 }}>
                  Valuation (rev multiple)
                </div>
                <div style={{ fontWeight: 950, fontSize: 30 }}>$64.67M</div>
              </div>
            </div>
          </Card>

          <Card title="Scenario engine (stacked)">
            <div style={{ opacity: 0.85 }}>
              Use the model page for the sliders + scenario solver.
            </div>

            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/investors/model" style={{ fontWeight: 900 }}>
                → Open the interactive model
              </Link>
            </div>
          </Card>

          <Card title="Roadmap (time horizon)">
            <div style={{ display: "grid", gap: 10 }}>
              {[
                ["Year 1: Pilot", "Signage + kiosk pass issuance + staff verification + audit logs."],
                ["Year 2: Density", "Neighborhood cluster; referral + onboarding; repeatable installs."],
                ["Year 3: Multi-vertical", "Restrooms, cowork, offices, events; common policy primitives."],
                ["Year 4: Trust graph", "Cross-venue verification patterns; identity + logs compound."],
                ["Year 5: Integrations", "Property ops, access controllers, check-in workflows, payments."],
                ["Year 6: Enterprise deals", "Portfolio operators; standardized compliance; SLAs."],
                ["Year 7: Global rollouts", "Local partners; multi-region reliability; standardized onboarding."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  style={{
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRadius: 16,
                    padding: 14,
                    background: "#fff",
                  }}
                >
                  <div style={{ fontWeight: 900 }}>{t}</div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Demo shortcuts">
            <div style={{ display: "grid", gap: 10 }}>
              {[
                ["/venues", "Public directory →"],
                ["/sf-pilot", "SF pilot brief →"],
                ["/onboarding", "Onboarding →"],
                ["/outreach", "Outreach kit →"],
                ["/verify", "Staff verify →"],
                ["/scan", "QR scan →"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "#fff",
                    textDecoration: "none",
                    color: "#111",
                    fontWeight: 900,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </Card>
        </div>
=======
export default function InvestorsHub() {
  return (
    <main style={{ padding: 40, maxWidth: 1100 }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>
        AXW Investor Portal
      </h1>

      <p style={{ marginTop: 10, color: "#666" }}>
        Access is becoming programmable infrastructure.
      </p>

      <div style={{ marginTop: 40, display: "grid", gap: 20 }}>

        <Link href="/investors/interactive">
          → Interactive Scenario Engine
        </Link>

        <Link href="/investors/2t">
          → $2 Trillion Path
        </Link>

        <Link href="/investors/model">
          → Clean Financial Model
        </Link>

        <Link href="/vc">
          → VC Narrative Deck
        </Link>

        <Link href="/vc/packet">
          → Data Room Packet
        </Link>

>>>>>>> f0a27cf (Add investor hub + interactive engine + T path)
      </div>
    </main>
  );
}
