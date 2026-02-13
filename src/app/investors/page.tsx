import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvestorsPage() {
  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 999 }}>Access ↔ Space</h1>
          <div style={{ marginTop: 8, opacity: 0.8, maxWidth: 980, lineHeight: 1.6 }}>
            We are building the <b>access layer</b> between people and spaces: a neutral coordination primitive for
            permissions, rules, logs, and monetization — <b>without publishing codes</b>.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Nav href="/demo">VC Demo</Nav>
          <Nav href="/admin/metrics">Metrics</Nav>
          <Nav href="/venues">Directory</Nav>
        </div>
      </header>

      <Section title="The Problem">
        <Grid>
          <Box title="Spaces are underutilized">
            <div style={p}>
              Millions of spaces sit idle: restrooms, workspaces, study rooms, meeting rooms, gyms, museums, storage,
              facilities — even emergency shelters. The friction is <b>access</b>, not supply.
            </div>
          </Box>
          <Box title="Access is fragmented and insecure">
            <div style={p}>
              Access is currently managed by ad-hoc mechanisms (keys, codes, staff, PDFs, multiple vendor apps). It’s
              hard to audit, hard to price, and impossible to network across venues.
            </div>
          </Box>
          <Box title="No neutral layer exists">
            <div style={p}>
              There is no standardized layer that can govern rules, rate limits, identity, payment, and verification
              across a public network of spaces.
            </div>
          </Box>
        </Grid>
      </Section>

      <Section title="Our Solution">
        <Grid>
          <Box title="Tokenized permissions (no codes)">
            <div style={p}>
              Venues define rules. Users request access. The system issues a time-limited <b>access pass token</b>.
              Staff verifies via QR. Everything is logged.
            </div>
          </Box>
          <Box title="Owner controls + analytics">
            <div style={p}>
              Owners can claim a venue, set hours, cooldowns, daily limits, login requirements, and paid access tiers —
              and see usage analytics and conversion metrics.
            </div>
          </Box>
          <Box title="Network effects">
            <div style={p}>
              The same verification + policy layer works across many categories: restrooms, workspaces, offices,
              facilities, venues, museums, events, and disaster response.
            </div>
          </Box>
        </Grid>
      </Section>

      <Section title="Business Model">
        <Grid>
          <Box title="Venue SaaS (B2B)">
            <ul style={ul}>
              <li>Starter: $49/mo — rules + basic analytics</li>
              <li>Pro: $199/mo — multiple venues + staff roles + audits</li>
              <li>Enterprise: custom — compliance, SSO, integrations</li>
            </ul>
          </Box>
          <Box title="Payments (B2C / take-rate)">
            <ul style={ul}>
              <li>Pay-per-access (venue sets price) — we take 5–12%</li>
              <li>Membership bundles (city passes / partner passes)</li>
              <li>Insurance / deposits for higher-risk spaces</li>
            </ul>
          </Box>
          <Box title="Infrastructure layer (platform)">
            <ul style={ul}>
              <li>Verification API for partners</li>
              <li>Access policy engine as a service</li>
              <li>Identity + risk scoring</li>
            </ul>
          </Box>
        </Grid>
      </Section>

      <Section title="Market Size (why this can be massive)">
        <div style={{ ...p, maxWidth: 1100 }}>
          Access is not a “bathroom product.” It is a universal primitive. Every physical and digital system that gates
          a resource creates access friction. We start with a narrow pilot, then expand to a network utility.
        </div>

        <Grid>
          <Box title="Phase 1: SF pilot (proof)">
            <ul style={ul}>
              <li>Onboard 25–100 venues in SF</li>
              <li>Show measurable issuance + verification</li>
              <li>Convert owners to paid controls</li>
            </ul>
          </Box>

          <Box title="Phase 2: City network (unit economics)">
            <ul style={ul}>
              <li>10,000 venues → $10M–$40M ARR (SaaS mix)</li>
              <li>Paid access take-rate adds upside</li>
              <li>Network effects: repeat usage + trust</li>
            </ul>
          </Box>

          <Box title="Phase 3: Global layer (platform)">
            <ul style={ul}>
              <li>1,000,000 venues → $1B–$4B ARR potential</li>
              <li>Payments + verification API compound</li>
              <li>Becomes a category-defining infrastructure layer</li>
            </ul>
          </Box>
        </Grid>

        <div style={{ marginTop: 14, padding: 16, borderRadius: 18, border: "1px solid #23232a", background: "#111118" }}>
          <div style={{ fontWeight: 999, fontSize: 18 }}>Valuation Path (illustrative)</div>
          <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.7 }}>
            Infrastructure platforms that become network standards can trade at large revenue multiples.
            A plausible path to very large outcomes requires:
            <ul style={ul}>
              <li>High retention + repeat usage (consumer)</li>
              <li>Owner SaaS expansion + multi-venue rollout</li>
              <li>Payments volume + verification as API</li>
              <li>Global partnerships (transit, campuses, municipalities)</li>
            </ul>
            The “$2T” narrative is an <b>end-state</b> scenario where the access layer becomes a global utility across
            categories (space, events, facilities, emergency response, and beyond). The near-term goal is SF proof.
          </div>
        </div>
      </Section>

      <Section title="Roadmap (blitzscale execution)">
        <Grid>
          <Box title="0–30 days">
            <ul style={ul}>
              <li>SF pilot: seed venues, onboard real owners</li>
              <li>Pass issuance + staff verification polished</li>
              <li>Owner dashboard v1 + analytics</li>
            </ul>
          </Box>
          <Box title="30–90 days">
            <ul style={ul}>
              <li>Paid plans + Stripe checkout</li>
              <li>Invite + role-based staff controls</li>
              <li>Partner integrations (campus/chain)</li>
            </ul>
          </Box>
          <Box title="90–180 days">
            <ul style={ul}>
              <li>Multi-city rollout</li>
              <li>Risk scoring + deposits / insurance</li>
              <li>Access Graph (identity, trust, utilization)</li>
            </ul>
          </Box>
        </Grid>
      </Section>

      <Section title="Links">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Nav href="/demo">/demo</Nav>
          <Nav href="/venues">/venues</Nav>
          <Nav href="/verify">/verify</Nav>
          <Nav href="/admin/metrics">/admin/metrics</Nav>
          <Nav href="/reports/sf">/reports/sf</Nav>
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 20 }}>
      <h2 style={{ margin: "0 0 10px 0", fontSize: 22, fontWeight: 999 }}>{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
      {children}
    </div>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 18, padding: 16 }}>
      <div style={{ fontWeight: 999, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 10 }}>{children}</div>
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

const p: React.CSSProperties = { opacity: 0.85 };
const ul: React.CSSProperties = { margin: "8px 0 0 18px", opacity: 0.9, lineHeight: 1.7 };
