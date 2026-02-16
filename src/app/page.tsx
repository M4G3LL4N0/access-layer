export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#fff",
        color: "#000",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 16px" }}>
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 34,
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
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
              <div style={{ fontWeight: 950, letterSpacing: -0.3 }}>AXW</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Access × World</div>
            </div>
          </a>

          <nav
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              alignItems: "center",
              fontSize: 14,
            }}
          >
            <a href="#what" style={navLink()}>
              What
            </a>
            <a href="#how" style={navLink()}>
              How
            </a>
            <a href="#proof" style={navLink()}>
              Proof
            </a>
            <a href="#pilot" style={navLink()}>
              Pilot
            </a>
            <a href="/investors" style={navLinkStrong()}>
              Investors
            </a>
          </nav>
        </header>

        {/* Hero + Right rail (responsive grid, no overlap) */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 14,
            alignItems: "start",
          }}
        >
          {/* Left: hero */}
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 18,
              padding: 18,
              background: "white",
            }}
          >
            <h1
              style={{
                margin: "2px 0 10px",
                fontWeight: 950,
                letterSpacing: -1.4,
                lineHeight: 0.98,
                fontSize: "clamp(40px, 7.5vw, 62px)",
                wordBreak: "break-word",
              }}
            >
              Programmable access,
              <br />
              everywhere.
            </h1>

            <p
              style={{
                margin: "0 0 14px",
                fontSize: "clamp(15px, 2.8vw, 18px)",
                lineHeight: 1.6,
                opacity: 0.82,
                maxWidth: 840,
              }}
            >
              AXW is the coordination layer for access: policy-defined permissions, time-bounded tokens, and auditable logs —
              designed to integrate with real systems without publishing sensitive codes.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              <a href="https://app.accessxworld.com" style={btnPrimary()}>
                Open the app
              </a>
              <a href="/contact" style={btnGhost()}>
                Talk to us
              </a>
              <a href="#pilot" style={btnGhost()}>
                Run a 7-day pilot
              </a>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.65 }}>
              Built for: venues • property ops • enterprise access • infrastructure partners
            </div>
          </div>

          {/* Right: demo tiles */}
          <aside
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 18,
              padding: 18,
              background: "white",
            }}
          >
            <div style={{ fontWeight: 950, letterSpacing: -0.3, marginBottom: 10 }}>
              Demo in minutes
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <a href="/venues" style={tile()}>
                <div>Public Venue Directory →</div>
                <div style={tileSub()}>Map + list + request flows</div>
              </a>

              <a href="/sf-pilot" style={tile()}>
                <div>SF Pilot Brief →</div>
                <div style={tileSub()}>Proof-of-work story</div>
              </a>

              <a href="/onboarding" style={tile()}>
                <div>Onboarding (7 days) →</div>
                <div style={tileSub()}>Operator checklist</div>
              </a>

              <a href="/outreach" style={tile()}>
                <div>Outreach kit →</div>
                <div style={tileSub()}>Email + scripts + pitch</div>
              </a>

              <a href="/investors" style={tile()}>
                <div>Investor page →</div>
                <div style={tileSub()}>Interactive model + scenarios</div>
              </a>

              <a href="/demo" style={tile()}>
                <div>VC demo page →</div>
                <div style={tileSub()}>Everything clickable</div>
              </a>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.65, lineHeight: 1.35 }}>
              No fluff — everything above is intended to be demoable quickly.
            </div>
          </aside>
        </section>

        {/* What */}
        <section id="what" style={{ marginTop: 18 }}>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 18,
              padding: 18,
              background: "white",
            }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: 26, letterSpacing: -0.7 }}>What we are building</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
              }}
            >
              {[
                {
                  t: "Universal access primitive",
                  d: "A common layer across doors, staff checkpoints, kiosks, reservations, and verification flows.",
                },
                {
                  t: "Tokenized permissions",
                  d: "Issue scoped, time-bounded passes with explicit rules and enforcement.",
                },
                {
                  t: "Policy engine",
                  d: "Define rules once. Apply consistently across venues and verticals.",
                },
                {
                  t: "Auditable logs",
                  d: "Every request, grant, verification, and denial is logged for compliance and analytics.",
                },
                {
                  t: "Pilot-to-rollout pipeline",
                  d: "7-day pilot pack: signage + kiosk + staff verification + onboarding + outreach.",
                },
                {
                  t: "Conversion-ready",
                  d: "Start with one location, then scale to clusters, portfolios, and integrations.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  style={{
                    border: "1px solid rgba(0,0,0,0.10)",
                    borderRadius: 16,
                    padding: 14,
                    background: "white",
                  }}
                >
                  <div style={{ fontWeight: 950, marginBottom: 6 }}>{x.t}</div>
                  <div style={{ fontSize: 14, opacity: 0.82, lineHeight: 1.45 }}>{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How */}
        <section id="how" style={{ marginTop: 14 }}>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 18,
              padding: 18,
              background: "white",
            }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: 26, letterSpacing: -0.7 }}>How it works</h2>

            <ol style={{ margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.75, maxWidth: 920 }}>
              <li>
                <b>Define policies</b> (who/what/when/where) once.
              </li>
              <li>
                <b>Issue passes</b> that encode scope + expiry + constraints.
              </li>
              <li>
                <b>Verify at the edge</b> (staff scanner, kiosk, check-in, controller).
              </li>
              <li>
                <b>Log events</b> for audit, analytics, and enforcement.
              </li>
            </ol>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              <a href="/verify" style={btnGhost()}>
                Staff verify →
              </a>
              <a href="/scan" style={btnGhost()}>
                QR scan →
              </a>
              <a href="/kiosk/0fc330aa-5c3d-4f7f-a74f-7de10c2b56b6" style={btnGhost()}>
                Kiosk demo →
              </a>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
              (Kiosk demo uses a seeded venue ID — you can swap this to any venue ID from your directory.)
            </div>
          </div>
        </section>

        {/* Proof */}
        <section id="proof" style={{ marginTop: 14 }}>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 18,
              padding: 18,
              background: "white",
            }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: 26, letterSpacing: -0.7 }}>Proof of work (demo pathways)</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 12,
              }}
            >
              <div style={proofCard()}>
                <div style={{ fontWeight: 950 }}>Guest flow</div>
                <div style={proofSub()}>
                  Directory → Venue page → Request access → Pass token → Verify
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                  <a href="/venues" style={btnPrimarySm()}>
                    Start →
                  </a>
                  <a href="/verify" style={btnGhostSm()}>
                    Verify →
                  </a>
                </div>
              </div>

              <div style={proofCard()}>
                <div style={{ fontWeight: 950 }}>Operator flow</div>
                <div style={proofSub()}>
                  Lead capture → Onboarding checklist → Pilot pack routes (signage, kiosk, staff tools)
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                  <a href="/contact" style={btnPrimarySm()}>
                    Start pilot →
                  </a>
                  <a href="/onboarding" style={btnGhostSm()}>
                    Onboarding →
                  </a>
                </div>
              </div>

              <div style={proofCard()}>
                <div style={{ fontWeight: 950 }}>Investor flow</div>
                <div style={proofSub()}>
                  Interactive scenario model → VC demo page → SF pilot brief
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                  <a href="/investors" style={btnPrimarySm()}>
                    Model →
                  </a>
                  <a href="/demo" style={btnGhostSm()}>
                    Demo →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pilot CTA */}
        <section id="pilot" style={{ marginTop: 14 }}>
          <div
            style={{
              borderRadius: 18,
              padding: 18,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "white",
            }}
          >
            <h3 style={{ margin: "0 0 6px", fontSize: 18, letterSpacing: -0.2, fontWeight: 950 }}>Pilot in 7 days</h3>
            <p style={{ margin: "0 0 12px", opacity: 0.82, maxWidth: 900, lineHeight: 1.5 }}>
              Start with one location or one workflow. Define the rules, issue passes, verify at the edge, and log everything.
              Expand after the first proof of value.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="/contact" style={btnPrimary()}>
                Start a pilot
              </a>
              <a href="/outreach" style={btnGhost()}>
                Outreach kit
              </a>
              <a href="/investors" style={btnGhost()}>
                Investor model
              </a>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: 26, opacity: 0.65, fontSize: 12, lineHeight: 1.4 }}>
          © {year} AXW — Access × World •{" "}
          <a href="/legal/terms" style={{ color: "inherit" }}>
            Terms
          </a>{" "}
          •{" "}
          <a href="/legal/privacy" style={{ color: "inherit" }}>
            Privacy
          </a>
        </footer>
      </div>

      {/* Responsive layout rules */}
      <style>{`
        /* Wide screens: hero + rail side-by-side */
        @media (min-width: 980px) {
          main > div > section {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          }
        }

        /* Prevent any weird iOS zoom/overlap behavior */
        * { box-sizing: border-box; }
        img { max-width: 100%; height: auto; }
      `}</style>
    </main>
  );
}

function navLink() {
  return { color: "inherit", textDecoration: "none", opacity: 0.78, fontWeight: 850 };
}
function navLinkStrong() {
  return {
    color: "inherit",
    textDecoration: "none",
    opacity: 0.95,
    fontWeight: 950 as const,
    border: "1px solid rgba(0,0,0,0.14)",
    padding: "8px 10px",
    borderRadius: 12,
  };
}
function btnPrimary() {
  return {
    padding: "12px 16px",
    borderRadius: 14,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 950 as const,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(0,0,0,0.14)",
  };
}
function btnGhost() {
  return {
    padding: "12px 16px",
    borderRadius: 14,
    background: "white",
    color: "black",
    textDecoration: "none",
    fontWeight: 950 as const,
    border: "1px solid rgba(0,0,0,0.14)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
function btnPrimarySm() {
  return {
    padding: "10px 12px",
    borderRadius: 12,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 950 as const,
    border: "1px solid rgba(0,0,0,0.14)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
function btnGhostSm() {
  return {
    padding: "10px 12px",
    borderRadius: 12,
    background: "white",
    color: "black",
    textDecoration: "none",
    fontWeight: 950 as const,
    border: "1px solid rgba(0,0,0,0.14)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
function tile() {
  return {
    textDecoration: "none",
    color: "inherit",
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 16,
    padding: 12,
    background: "white",
    fontWeight: 950 as const,
    lineHeight: 1.25,
  };
}
function tileSub() {
  return { fontSize: 12, opacity: 0.65, fontWeight: 850 as const, marginTop: 4, lineHeight: 1.25 };
}
function proofCard() {
  return { border: "1px solid rgba(0,0,0,0.10)", borderRadius: 16, padding: 14, background: "white" };
}
function proofSub() {
  return { fontSize: 13, opacity: 0.8, lineHeight: 1.4, marginTop: 6 };
}
