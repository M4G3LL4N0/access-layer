import HomeInvestorWidget from "@/components/HomeInvestorWidget";

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: "#0b0b0b",
        background: "#ffffff",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 18px" }}>
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 54,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="/favicon.ico"
              alt="AXW"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 900, letterSpacing: -0.2 }}>AXW</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Access × World</div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: 16, fontSize: 14, flexWrap: "wrap" }}>
            <a href="#what" style={navLink}>What</a>
            <a href="#how" style={navLink}>How</a>
            <a href="#pilot" style={navLink}>Pilot</a>
            <a href="#proof" style={navLink}>Proof</a>
            <a href="#investor" style={navLink}>Investors</a>
          </nav>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://app.accessxworld.com" style={primaryBtn}>
              Open the app
            </a>
            <a href="/contact" style={secondaryBtn}>
              Talk to us
            </a>
          </div>
        </header>

        {/* Hero */}
        <section style={{ marginBottom: 46 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18, alignItems: "start" }}>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontSize: 56, letterSpacing: -1.2, margin: "0 0 12px", lineHeight: 1.02 }}>
                Programmable access, everywhere.
              </h1>

              <p style={{ fontSize: 18, maxWidth: 820, opacity: 0.85, margin: "0 0 22px", lineHeight: 1.6 }}>
                AXW is the coordination layer for access: policy-defined permissions, time-bounded tokens,
                and auditable logs — designed to integrate with real systems without publishing sensitive codes.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://app.accessxworld.com" style={primaryBtn}>
                  Launch app
                </a>
                <a href="#pilot" style={secondaryBtn}>
                  Run a 7-day pilot
                </a>
                <a href="/demo" style={secondaryBtn}>
                  View demo
                </a>
              </div>

              <div style={{ marginTop: 14, fontSize: 13, opacity: 0.7 }}>
                Built for: venues • property ops • enterprise access • infrastructure partners
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 18,
                padding: 16,
                background: "rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Live proof-of-work</div>

              <div style={{ display: "grid", gap: 10 }}>
                <a href="/venues" style={cardLink}>Public Venue Directory →</a>
                <a href="/sf-pilot" style={cardLink}>SF Pilot Brief →</a>
                <a href="/onboarding" style={cardLink}>Onboarding (7 days) →</a>
                <a href="/outreach" style={cardLink}>Outreach kit →</a>
                <a href="/investors" style={cardLink}>Investor page →</a>
              </div>

              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
                No fluff — everything above is intended to be demoable in minutes.
              </div>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section
          id="what"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginBottom: 46,
          }}
        >
          {[
            { title: "Serious infrastructure", desc: "Access is policy, not a shared secret. Built for reliability and accountability." },
            { title: "Tokenized permissions", desc: "Issue scoped, time-bounded access tokens with explicit rules and constraints." },
            { title: "Auditable logs", desc: "Every grant + verification can be logged for compliance, disputes, and transparency." },
            { title: "Conversion-ready", desc: "Start with a pilot. Prove value fast. Expand to more sites + systems." },
          ].map((c) => (
            <div key={c.title} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.55 }}>{c.desc}</div>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section id="how" style={{ marginBottom: 46 }}>
          <h2 style={{ fontSize: 30, margin: "0 0 10px", letterSpacing: -0.4 }}>How it works</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Core primitive</div>
              <ol style={{ margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.7 }}>
                <li><b>Define policies</b> (who/what/when/where) once.</li>
                <li><b>Issue tokens</b> that encode scope + expiry + constraints.</li>
                <li><b>Verify access</b> at the edge (apps, staff, controllers).</li>
                <li><b>Log events</b> for audit, analytics, and enforcement.</li>
              </ol>
            </div>

            <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Why this wins</div>
              <div style={{ fontSize: 14, opacity: 0.88, lineHeight: 1.65 }}>
                Instead of leaking shared secrets (codes), AXW treats access as a programmable coordination layer.
                That unlocks safe guest access without accounts, controlled owner onboarding, and measurement
                investors can trust (requests, grants, denials, verifications).
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <a href="/legal/terms" style={tinyLink}>Terms</a>
                <a href="/legal/privacy" style={tinyLink}>Privacy</a>
                <a href="/pricing" style={tinyLink}>Pricing</a>
              </div>
            </div>
          </div>
        </section>

        {/* Pilot CTA */}
        <section
          id="pilot"
          style={{
            borderRadius: 18,
            padding: 18,
            border: "1px solid rgba(0,0,0,0.12)",
            marginBottom: 46,
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <h3 style={{ margin: "0 0 6px", fontSize: 20, letterSpacing: -0.2 }}>Pilot in 7 days</h3>
          <p style={{ margin: "0 0 12px", opacity: 0.85, maxWidth: 920, lineHeight: 1.6 }}>
            Start with one location or one workflow. Define the rules, issue tokens, and log everything.
            Expand after the first proof of value.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/onboarding" style={primaryBtn}>Start onboarding</a>
            <a href="/contact" style={secondaryBtn}>Contact</a>
            <a href="/venues" style={secondaryBtn}>Browse venues</a>
          </div>
        </section>

        {/* Proof */}
        <section id="proof" style={{ marginBottom: 46 }}>
          <h2 style={{ fontSize: 28, margin: "0 0 10px", letterSpacing: -0.3 }}>Proof, not promises</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            <div style={proofCard}>
              <div style={proofTitle}>Public product surface</div>
              <div style={proofDesc}>Directory + venue pages + request flow + pass tokens are live.</div>
              <a href="/venues" style={proofLink}>Open directory →</a>
            </div>

            <div style={proofCard}>
              <div style={proofTitle}>Pilot kit</div>
              <div style={proofDesc}>Onboarding steps + outreach kit to walk into SF venues fast.</div>
              <a href="/outreach" style={proofLink}>Open outreach kit →</a>
            </div>

            <div style={proofCard}>
              <div style={proofTitle}>Investor diligence</div>
              <div style={proofDesc}>Model + roadmap + links for a fast technical and go-to-market review.</div>
              <a href="/investors" style={proofLink}>Open investors →</a>
            </div>
          </div>
        </section>

        {/* Interactive Investor Preview */}
        <HomeInvestorWidget />

        {/* Footer */}
        <footer style={{ marginTop: 46, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ opacity: 0.7, fontSize: 12 }}>© {new Date().getFullYear()} AXW — Access × World</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12 }}>
            <a href="/legal/terms" style={tinyLink}>Terms</a>
            <a href="/legal/privacy" style={tinyLink}>Privacy</a>
            <a href="/contact" style={tinyLink}>Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

const navLink: React.CSSProperties = {
  color: "inherit",
  textDecoration: "none",
  opacity: 0.85,
  fontWeight: 800,
};

const primaryBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  background: "black",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
  border: "1px solid rgba(0,0,0,0.10)",
};

const secondaryBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.14)",
  color: "black",
  textDecoration: "none",
  fontWeight: 900,
  background: "white",
};

const tinyLink: React.CSSProperties = {
  color: "inherit",
  textDecoration: "none",
  opacity: 0.75,
  fontWeight: 800,
};

const cardLink: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.14)",
  textDecoration: "none",
  color: "inherit",
  fontWeight: 900,
  background: "white",
};

const proofCard: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 16,
  padding: 16,
};

const proofTitle: React.CSSProperties = { fontWeight: 900, marginBottom: 6 };
const proofDesc: React.CSSProperties = { fontSize: 14, opacity: 0.85, lineHeight: 1.55 };
const proofLink: React.CSSProperties = { display: "inline-block", marginTop: 10, fontWeight: 900, textDecoration: "none", color: "inherit" };
