export const dynamic = "force-dynamic";

import Link from "next/link";

function Section({ title, children }: { title: string; children: any }) {
  return (
    <section style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid #eee" }}>
      <div style={{ fontWeight: 950, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>{children}</div>
    </section>
  );
}

export default function InvestorsPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1040, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/venues" style={{ opacity: 0.8 }}>
          ← Product
        </Link>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ opacity: 0.8 }}>
            Pricing
          </Link>
          <Link href="/owners" style={{ opacity: 0.8 }}>
            Owners
          </Link>
        </div>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 38, fontWeight: 950 }}>Access ↔ Space</h1>
      <p style={{ marginTop: 10, fontSize: 18, opacity: 0.85, lineHeight: 1.6 }}>
        We’re building the programmable layer between people and physical space.
        A venue defines rules; the system issues time-limited passes and logs events.
        <b> No codes published.</b>
      </p>

      <Section title="The problem">
        Access to everyday spaces is still mediated by humans, friction, and outdated tooling:
        staff not available, keys get copied, codes leak, and compliance/audit is weak.
        Venues want control; users want reliability.
      </Section>

      <Section title="The solution">
        A neutral access layer: rule-based passes, rate limits, cooldowns, audit logs,
        and owner controls. Start with restrooms and shared spaces, expand to offices,
        gyms, study rooms, storage, and any “controlled-but-public-facing” area.
      </Section>

      <Section title="What exists today (live)">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
          <li>Venue directory and venue pages</li>
          <li>Request access → issue time-limited token</li>
          <li>Rule enforcement (cooldown / max/day)</li>
          <li>Analytics counters per venue</li>
          <li>Owner claim intake + manage stub</li>
        </ul>
      </Section>

      <Section title="Why now">
        Cities are densifying, staffing is expensive, and more spaces are semi-public.
        Phones are universal, and venues are open to “software-defined operations.”
        Access is the next layer that becomes programmable.
      </Section>

      <Section title="Business model">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
          <li>Pro subscriptions for owner controls + advanced analytics</li>
          <li>Network/enterprise plans for multi-site operations</li>
          <li>Optional paid access for non-patrons (future)</li>
        </ul>
      </Section>

      <Section title="Go-to-market (SF)">
        Start with corridors (Hayes Valley, Mission, SoMa) with dense foot traffic.
        Onboard early venues with free pilot + “reduced friction” story.
        Convert the most active venues into Pro via analytics + controls.
      </Section>

      <Section title="Ask">
        We’re looking for early partners and seed support to expand pilots,
        harden verification, and ship paid controls + integrations.
      </Section>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link
          href="/pricing"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            background: "black",
            color: "white",
            textDecoration: "none",
            fontWeight: 950,
          }}
        >
          View pricing →
        </Link>

        <Link
          href="/owners"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            textDecoration: "none",
            fontWeight: 950,
          }}
        >
          Owner onboarding →
        </Link>
      </div>
    </main>
  );
}
