export const dynamic = "force-dynamic";

import Link from "next/link";

function Card({
  title,
  price,
  items,
  cta,
  href,
  note,
}: {
  title: string;
  price: string;
  items: string[];
  cta: string;
  href: string;
  note?: string;
}) {
  return (
    <div
      style={{
        padding: 18,
        border: "1px solid #eee",
        borderRadius: 16,
        background: "white",
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.75, fontWeight: 900 }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 32, fontWeight: 950 }}>{price}</div>

      <ul style={{ marginTop: 12, paddingLeft: 18, lineHeight: 1.8, opacity: 0.9 }}>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      {note && (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7, lineHeight: 1.6 }}>
          {note}
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        <Link
          href={href}
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
          {cta}
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1040, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/venues" style={{ opacity: 0.8 }}>
          ← Directory
        </Link>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/owners" style={{ opacity: 0.8 }}>
            Owners
          </Link>
          <Link href="/investors" style={{ opacity: 0.8 }}>
            Investors
          </Link>
        </div>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 34, fontWeight: 950 }}>Pricing</h1>
      <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
        Access ↔ Space is a programmable access layer. We don’t publish codes. We issue time-limited passes,
        enforce rules, and provide audit + analytics for venues.
      </p>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <Card
          title="Pilot (Free)"
          price="$0"
          items={[
            "Directory listing",
            "Time-limited access passes (no codes)",
            "Basic rule enforcement",
            "Basic analytics counters",
          ]}
          cta="Join the pilot"
          href="/owners"
          note="Great for early partners while we validate workflows."
        />

        <Card
          title="Pro (Owner Controls)"
          price="$49/mo"
          items={[
            "Owner verification + dashboard",
            "Rule editor (hours, limits, cooldowns)",
            "Advanced analytics + exports",
            "Incident logging + audit trail",
          ]}
          cta="Upgrade to Pro"
          href="/checkout?plan=pro"
          note="Checkout is a stub tonight — we wire Stripe next."
        />

        <Card
          title="Network (Multi-site)"
          price="Custom"
          items={[
            "Multiple locations + roles",
            "SLA + priority support",
            "API access + webhooks",
            "Enterprise reporting + compliance exports",
          ]}
          cta="Talk to us"
          href="/owners"
          note="Designed for chains, offices, campuses, and public spaces."
        />
      </div>

      <div style={{ marginTop: 18, padding: 14, borderRadius: 14, border: "1px solid #eee", opacity: 0.85, lineHeight: 1.6 }}>
        <b>Paid access</b> (future): venues can optionally monetize access for non-patrons via verified passes,
        with policies, time windows, and abuse prevention.
      </div>
    </main>
  );
}
