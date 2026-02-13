export const dynamic = "force-dynamic";

import Link from "next/link";

function Section({ title, children }: { title: string; children: any }) {
  return (
    <section
      style={{
        marginTop: 18,
        padding: 16,
        borderRadius: 16,
        border: "1px solid var(--card-border)",
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>
        {children}
      </div>
    </section>
  );
}

export default function InvestorsPage() {
  return (
    <main
      style={{
        padding: 24,
        fontFamily: "system-ui",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Link href="/venues" style={{ opacity: 0.8 }}>
          ← Product
        </Link>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ opacity: 0.8 }}>
            Pricing
          </Link>
          <Link href="/network" style={{ opacity: 0.8 }}>
            Network
          </Link>
        </div>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 38, fontWeight: 950 }}>
        Access ↔ Space
      </h1>

      <p
        style={{
          marginTop: 10,
          fontSize: 18,
          opacity: 0.85,
          lineHeight: 1.6,
        }}
      >
        We are building the programmable layer between people and physical
        space.
      </p>

      <Section title="The Thesis">
        Access to physical space is still mediated by humans, friction, and
        outdated systems. We convert access intent into time-limited,
        rule-based passes — without publishing codes — and produce network
        telemetry.
      </Section>

      <Section title="What Exists Live Today">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
          <li>Venue directory + maps</li>
          <li>Time-limited access token issuance</li>
          <li>Rate limiting + cooldown enforcement</li>
          <li>Per-venue analytics counters</li>
          <li>Admin network dashboard</li>
          <li>Public reliability report</li>
        </ul>
      </Section>

      <Section title="Expansion Path">
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
          <li>Corridor density (SF pilot)</li>
          <li>Owner authentication + rule editor</li>
          <li>Paid Pro controls</li>
          <li>Multi-site + enterprise</li>
          <li>Optional paid access layer</li>
          <li>Hardware + building integrations</li>
        </ol>
      </Section>

      <Section title="Market Potential (Scenario Based)">
        This is modeled using assumptions — not promises.
        <br />
        <br />
        If 1M venues globally adopt a programmable access layer at $50/month,
        that is $600M ARR.
        <br />
        <br />
        If 10M venues adopt at $50/month, that is $6B ARR.
        <br />
        <br />
        Expansion layers increase TAM further.
      </Section>

      <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link
          href="/investors/model"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "black",
            color: "white",
            textDecoration: "none",
            fontWeight: 950,
          }}
        >
          Open Scenario Model →
        </Link>

        <Link
          href="/network"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--card-border)",
            textDecoration: "none",
            fontWeight: 950,
          }}
        >
          View Network Telemetry →
        </Link>
      </div>
    </main>
  );
}
