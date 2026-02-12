kimport Link from "next/link";

export default function OwnersPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34, fontWeight: 950 }}>Access ↔ Space</h1>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/venues" style={{ opacity: 0.85 }}>Directory</Link>
          <a href="mailto:hello@access-layer-five.vercel.app" style={{ opacity: 0.85 }}>Contact</a>
        </div>
      </div>

      <p style={{ marginTop: 10, fontSize: 18, opacity: 0.85, lineHeight: 1.6 }}>
        We’re building the programmable access layer for physical space — rule-based, rate-limited access passes with auditability.
        <b> No codes are published.</b>
      </p>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {[
          ["Rule-based access", "Set hours, cooldown, daily caps. Reduce abuse while keeping access usable."],
          ["Time-limited passes", "Guests get a short-lived token. Staff can verify. You keep control."],
          ["Audit + insights", "See requests and grants over time. Export logs when needed."],
          ["Monetization-ready", "Offer paid access to non-customers later (optional)."],
        ].map(([t, d]) => (
          <div key={t} style={{ padding: 14, border: "1px solid #eee", borderRadius: 16 }}>
            <div style={{ fontWeight: 950 }}>{t}</div>
            <div style={{ marginTop: 6, opacity: 0.85, lineHeight: 1.5 }}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid #eee" }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>SF Pilot</div>
        <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.7 }}>
          We onboard venues fast. You get a venue page, access rules, and a claim/manage flow.
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/venues"
            style={{ padding: "10px 14px", borderRadius: 12, background: "black", color: "white", fontWeight: 950, textDecoration: "none" }}
          >
            View pilot directory
          </Link>
          <a
            href="mailto:hello@access-layer-five.vercel.app?subject=SF%20Pilot%20Onboarding"
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ddd", fontWeight: 950, textDecoration: "none" }}
          >
            Get onboarded
          </a>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
          Built for public-facing spaces. Built to expand into broader access + scheduling + utilization.
        </div>
      </div>

      <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid #eee" }}>
        <div style={{ fontWeight: 950 }}>Growth loop</div>
        <ol style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.8 }}>
          <li>Guest requests a pass → sees “want this at your venue?”</li>
          <li>Owner claims venue → manages rules + sees analytics</li>
          <li>City density → directory becomes default discovery layer</li>
        </ol>
      </div>
    </main>
  );
}
