import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ParkingSolutionPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <Link href="/" style={{ opacity: 0.8 }}>
          ← Home
        </Link>

        <h1 style={{ marginTop: 14, fontSize: 34, letterSpacing: -0.6 }}>
          Parking validation (plates → time-bounded tokens)
        </h1>

        <p style={{ maxWidth: 860, lineHeight: 1.65, opacity: 0.85 }}>
          Replace fragile paper validation and vendor lock-in with a universal access primitive:
          a plate entry (or QR scan) issues a time-bounded token. Exits verify tokens via API.
          Everything is logged for analytics and disputes.
        </p>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 18 }}>
          {[
            ["Retail validation", "2-hour validation at checkout kiosks (Target-style)."],
            ["Office + coworking", "Visitors validated for windows; staff enforcement."],
            ["Events", "Tiered access: VIP parking, staff parking, overflow lots."],
            ["Hospitals + campuses", "Policy-driven validation, auditable logs."],
          ].map(([t, d]) => (
            <div key={t} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{t}</div>
              <div style={{ opacity: 0.8, lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, padding: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16 }}>
          <div style={{ fontWeight: 900 }}>Pilot in 7 days</div>
          <ol style={{ marginTop: 8, lineHeight: 1.65 }}>
            <li>Create a venue entry</li>
            <li>Run the kiosk page on a tablet</li>
            <li>Verify from a staff phone or gate integration</li>
            <li>Review logs + measure throughput + disputes prevented</li>
          </ol>
          <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/contact" style={{ padding: "10px 14px", borderRadius: 12, background: "black", color: "white", textDecoration: "none", fontWeight: 900 }}>
              Request onboarding
            </a>
            <a href="/venues" style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.14)", textDecoration: "none", fontWeight: 900 }}>
              View directory
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
