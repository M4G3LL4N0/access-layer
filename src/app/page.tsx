import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 28, fontFamily: "system-ui", background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 1000 }}>Access ↔ Space</h1>
        <p className="muted" style={{ marginTop: 8, fontSize: 18, lineHeight: 1.6 }}>
          Rule-based access passes (no codes published). SF pilot first — prove traction fast.
        </p>

        <div style={{ marginTop: 18, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <a className="card" href="/venues" style={{ padding: 16, textDecoration: "none" }}>
            <div style={{ fontWeight: 1000, fontSize: 18 }}>Public Directory</div>
            <div className="muted" style={{ marginTop: 6 }}>
              Map + list of active pilot venues.
            </div>
          </a>

          <a className="card" href="/outreach" style={{ padding: 16, textDecoration: "none" }}>
            <div style={{ fontWeight: 1000, fontSize: 18 }}>Outreach Engine</div>
            <div className="muted" style={{ marginTop: 6 }}>
              DM/email scripts + 7-day cadence to onboard clients.
            </div>
          </a>

          <a className="card" href="/contact" style={{ padding: 16, textDecoration: "none" }}>
            <div style={{ fontWeight: 1000, fontSize: 18 }}>Onboard a Venue</div>
            <div className="muted" style={{ marginTop: 6 }}>
              Submit a lead → convert → send pilot pack.
            </div>
          </a>

          <a className="card" href="/demo" style={{ padding: 16, textDecoration: "none" }}>
            <div style={{ fontWeight: 1000, fontSize: 18 }}>VC Demo</div>
            <div className="muted" style={{ marginTop: 6 }}>
              Proof-of-work walkthrough.
            </div>
          </a>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/investors" style={{ textDecoration: "underline", fontWeight: 900 }}>
            Investors →
          </Link>
          <Link href="/pricing" style={{ textDecoration: "underline", fontWeight: 900 }}>
            Pricing →
          </Link>
          <Link href="/owners" style={{ textDecoration: "underline", fontWeight: 900 }}>
            For Owners →
          </Link>
          <Link href="/admin/metrics" style={{ textDecoration: "underline", fontWeight: 900 }}>
            Admin Metrics →
          </Link>
        </div>
      </div>
    </main>
  );
}
