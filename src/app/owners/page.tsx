import Link from "next/link";

export default function OwnersPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={{ fontSize: 34, fontWeight: 950 }}>Access ↔ Space</h1>
        <div style={{ display: "flex", gap: 14 }}>
          <Link href="/venues" style={{ opacity: 0.8 }}>Directory</Link>
          <a href="mailto:hello@access-layer-five.vercel.app" style={{ opacity: 0.8 }}>Contact</a>
        </div>
      </div>

      <p style={{ marginTop: 10, fontSize: 18, opacity: 0.85, lineHeight: 1.6 }}>
        We help public-facing venues grant time-limited access passes (no codes published),
        using rules, rate limits, and audit logs.
      </p>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
        {[
          ["No codes published", "Guests receive a time-limited pass token. Staff can verify. Codes stay private."],
          ["Rules & rate limits", "Hours, cooldown, and daily limits reduce abuse and keep access controlled."],
          ["Audit + insights", "See requests by day and venue. Export logs when needed."],
          ["Optional monetization", "Offer paid access to non-customers, memberships, or space rentals later."],
        ].map(([t, d]) => (
          <div key={t} style={{ padding: 14, border: "1px solid #eee", borderRadius: 14 }}>
            <div style={{ fontWeight: 900 }}>{t}</div>
            <div style={{ marginTop: 6, opacity: 0.8 }}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, padding: 14, borderRadius: 14, border: "1px solid #eee" }}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>Pilot offer (SF)</div>
        <ul style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.7 }}>
          <li>We’ll onboard your location in under 10 minutes.</li>
          <li>You set access rules (hours, cooldown, max/day).</li>
          <li>You get a “Claim venue” owner link and basic analytics.</li>
        </ul>
        <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/venues" style={{ padding: "10px 14px", borderRadius: 10, background: "black", color: "white", fontWeight: 900, textDecoration: "none" }}>
            View Directory
          </Link>
          <a href="mailto:hello@access-layer-five.vercel.app" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", fontWeight: 900, textDecoration: "none" }}>
            Get onboarded
          </a>
        </div>
      </div>

      <p style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
        Access ↔ Space (MVP). Hayes Valley pilot — rule-based access, no codes published.
      </p>
    </main>
  );
}
