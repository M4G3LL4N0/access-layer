export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#ffffff",
        color: "#0b0b0c",
        minHeight: "100vh",
      }}
    >
      {/* Mobile-safe global helpers */}
      <style>{`
        html, body { margin: 0; padding: 0; }
        *, *:before, *:after { box-sizing: border-box; }
        a { color: inherit; }
        .axw-container { max-width: 1100px; margin: 0 auto; padding: 56px 16px; }
        @media (min-width: 640px) { .axw-container { padding: 72px 20px; } }
        
        /* Header */
        .axw-header { display: flex; gap: 16px; align-items: center; justify-content: space-between; margin-bottom: 42px; }
        @media (max-width: 720px) { 
          .axw-header { flex-direction: column; align-items: flex-start; margin-bottom: 34px; }
        }

        .axw-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .axw-brandTitle { font-weight: 900; line-height: 1.1; }
        .axw-brandSub { font-size: 12px; opacity: .7; margin-top: 2px; }

        .axw-nav { display: flex; flex-wrap: wrap; gap: 12px; font-size: 14px; opacity: .85; }
        @media (max-width: 720px) { .axw-nav { width: 100%; } }
        .axw-nav a { text-decoration: none; padding: 6px 10px; border-radius: 10px; border: 1px solid rgba(0,0,0,.08); background: rgba(0,0,0,.02); }
        .axw-nav a:hover { background: rgba(0,0,0,.04); }

        /* Hero */
        .axw-hero { margin-bottom: 46px; }
        .axw-h1 { 
          font-size: clamp(34px, 5.5vw, 56px);
          letter-spacing: -1.2px;
          margin: 0 0 14px;
          line-height: 1.05;
          word-break: break-word;
        }
        .axw-lede { font-size: 18px; max-width: 780px; opacity: .82; margin: 0 0 22px; line-height: 1.55; }
        @media (max-width: 520px) { .axw-lede { font-size: 16px; } }

        .axw-ctaRow { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 520px) { .axw-ctaRow { flex-direction: column; } }

        .axw-btnPrimary, .axw-btnGhost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 900;
          text-decoration: none;
          width: fit-content;
        }
        @media (max-width: 520px) { .axw-btnPrimary, .axw-btnGhost { width: 100%; } }

        .axw-btnPrimary { background: #0b0b0c; color: #fff; border: 1px solid rgba(0,0,0,.1); }
        .axw-btnPrimary:hover { opacity: .92; }

        .axw-btnGhost { background: #fff; color: #0b0b0c; border: 1px solid rgba(0,0,0,.14); }
        .axw-btnGhost:hover { background: rgba(0,0,0,.02); }

        .axw-subnote { margin-top: 14px; font-size: 13px; opacity: .65; line-height: 1.4; }

        /* Sections */
        .axw-sectionTitle { font-size: 28px; margin: 0 0 12px; letter-spacing: -0.4px; }
        @media (max-width: 520px) { .axw-sectionTitle { font-size: 22px; } }

        /* Value props grid */
        .axw-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 52px;
        }
        @media (max-width: 980px) { .axw-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 520px) { .axw-grid { grid-template-columns: 1fr; } }

        .axw-card { border: 1px solid rgba(0,0,0,.12); border-radius: 16px; padding: 16px; background: #fff; }
        .axw-cardTitle { font-weight: 950; margin-bottom: 6px; }
        .axw-cardDesc { font-size: 14px; opacity: .82; line-height: 1.45; }

        /* How list */
        .axw-how { margin-bottom: 52px; }
        .axw-ol { margin: 0; padding-left: 18px; opacity: .92; line-height: 1.7; max-width: 900px; }
        .axw-ol b { font-weight: 950; }

        /* Pilot CTA */
        .axw-pilot { border-radius: 18px; padding: 18px; border: 1px solid rgba(0,0,0,.12); background: rgba(0,0,0,.015); }
        .axw-pilot h3 { margin: 0 0 6px; font-size: 18px; letter-spacing: -0.2px; }
        .axw-pilot p { margin: 0 0 12px; opacity: .82; max-width: 920px; line-height: 1.5; }
        
        /* Footer */
        .axw-footer { margin-top: 46px; opacity: .65; font-size: 12px; }
      `}</style>

      <div className="axw-container">
        {/* Top bar */}
        <header className="axw-header">
          <div className="axw-brand">
            <img
              src="/favicon.ico"
              alt="AXW"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.12)",
                flex: "0 0 auto",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div className="axw-brandTitle">AXW</div>
              <div className="axw-brandSub">Access × World</div>
            </div>
          </div>

          <nav className="axw-nav" aria-label="Primary">
            <a href="#what">What</a>
            <a href="#how">How</a>
            <a href="#pilot">Pilot</a>
            <a href="/investors">Investors</a>
            <a href="/onboarding">Onboarding</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="axw-hero">
          <h1 className="axw-h1">Programmable access, everywhere.</h1>

          <p className="axw-lede">
            AXW is the coordination layer for access: policy-defined permissions,
            time-bounded tokens, and auditable logs — designed to integrate with real
            systems without publishing sensitive codes.
          </p>

          <div className="axw-ctaRow">
            <a href="https://app.accessxworld.com" className="axw-btnPrimary">
              Open the app
            </a>

            <a href="#pilot" className="axw-btnGhost">
              Run a pilot
            </a>

            <a href="/demo" className="axw-btnGhost">
              Live demo
            </a>
          </div>

          <div className="axw-subnote">
            Built for: venues • property ops • enterprise access • infrastructure partners
          </div>
        </section>

        {/* Value props */}
        <section id="what" style={{ marginBottom: 10 }}>
          <div className="axw-grid">
            {[
              {
                title: "Serious infrastructure",
                desc:
                  "Access is policy, not a shared secret. Built for reliability, accountability, and real-world operations.",
              },
              {
                title: "Tokenized permissions",
                desc:
                  "Issue scoped, time-bounded access tokens with explicit rules and constraints — no codes displayed.",
              },
              {
                title: "Auditable logs",
                desc:
                  "Every grant and verification is logged for compliance, dispute resolution, and continuous improvement.",
              },
              {
                title: "Conversion-ready",
                desc:
                  "Start with a 7-day pilot. Prove value fast. Expand to more sites, workflows, and integrations.",
              },
            ].map((c) => (
              <div key={c.title} className="axw-card">
                <div className="axw-cardTitle">{c.title}</div>
                <div className="axw-cardDesc">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="axw-how">
          <h2 className="axw-sectionTitle">How it works</h2>
          <ol className="axw-ol">
            <li>
              <b>Define policies</b> (who/what/when/where) once.
            </li>
            <li>
              <b>Issue tokens</b> that encode scope + expiry + constraints.
            </li>
            <li>
              <b>Verify access</b> at the edge (apps, controllers, services).
            </li>
            <li>
              <b>Log events</b> for audit, analytics, and enforcement.
            </li>
          </ol>
        </section>

        {/* Pilot CTA */}
        <section id="pilot" className="axw-pilot">
          <h3>Pilot in 7 days</h3>
          <p>
            Start with one location or one workflow. Define the rules, issue tokens,
            and verify in seconds. Expand after the first proof of value.
          </p>

          <div className="axw-ctaRow">
            <a href="https://app.accessxworld.com" className="axw-btnPrimary">
              Launch app
            </a>

            <a href="/contact" className="axw-btnGhost">
              Contact
            </a>

            <a href="/sf-pilot" className="axw-btnGhost">
              SF pilot plan
            </a>
          </div>
        </section>

        <footer className="axw-footer">
          © {new Date().getFullYear()} AXW — Access × World
        </footer>
      </div>
    </main>
  );
}
