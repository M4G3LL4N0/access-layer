import { TrustStrip } from "@/components/TrustStrip";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#fff",
        color: "#0b0b0c",
        minHeight: "100vh",
      }}
    >
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

      <style>{`
        html, body { margin: 0; padding: 0; }
        *, *::before, *::after { box-sizing: border-box; }
        a { color: inherit; }
        
        .container { max-width: 1120px; margin: 0 auto; padding: 56px 16px; }
        @media (min-width: 640px) { .container { padding: 72px 20px; } }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (max-width: 720px) {
          .header { flex-direction: column; align-items: flex-start; }
        }

        .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .brandTitle { font-weight: 900; line-height: 1.1; }
        .brandSub { font-size: 12px; opacity: .7; }

        .topActions { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 520px) { .topActions { width: 100%; } }

        .btnPrimary, .btnGhost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 999px;
          font-weight: 900;
          text-decoration: none;
          border: 1px solid rgba(0,0,0,.14);
          background: #fff;
          color: #0b0b0c;
          white-space: nowrap;
        }
        .btnPrimary {
          background: #0b0b0c;
          color: #fff;
          border: 1px solid rgba(0,0,0,.1);
        }
        .btnPrimary:hover { opacity: .92; }
        .btnGhost:hover { background: rgba(0,0,0,.03); }

        @media (max-width: 520px) {
          .btnPrimary, .btnGhost { width: 100%; border-radius: 16px; }
        }

        /* Hero layout: two columns on desktop, stacked on mobile (NO OVERLAP) */
        .heroGrid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
          gap: 18px;
          align-items: start;
          margin-top: 10px;
          margin-bottom: 26px;
        }
        @media (max-width: 860px) {
          .heroGrid { grid-template-columns: 1fr; }
        }

        /* Left hero text */
        .h1 {
          font-size: clamp(40px, 6vw, 64px);
          letter-spacing: -1.6px;
          margin: 0 0 14px;
          line-height: 1.02;
          overflow-wrap: anywhere;
        }
        .lede {
          font-size: 18px;
          line-height: 1.55;
          opacity: .82;
          max-width: 720px;
          margin: 0 0 18px;
        }
        @media (max-width: 520px) {
          .lede { font-size: 16px; }
        }

        .ctaColumn {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
          max-width: 420px;
        }
        @media (max-width: 860px) {
          .ctaColumn { max-width: 520px; }
        }

        /* Right quick links panel (becomes stacked on mobile) */
        .quickPanel {
          border: 1px solid rgba(0,0,0,.12);
          border-radius: 18px;
          padding: 14px;
          background: rgba(0,0,0,.01);
        }
        .quickTitle {
          font-weight: 950;
          letter-spacing: -0.2px;
          margin: 2px 0 10px;
          font-size: 14px;
          opacity: .85;
          text-transform: uppercase;
        }
        .quickLinks {
          display: grid;
          gap: 10px;
        }
        .quickLink {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,.12);
          background: #fff;
          text-decoration: none;
          font-weight: 900;
          letter-spacing: -0.2px;
        }
        .quickLink:hover { background: rgba(0,0,0,.02); }
        .quickSub {
          margin-top: 10px;
          font-size: 13px;
          opacity: .7;
          line-height: 1.35;
        }

        /* Sections */
        .sectionTitle { font-size: 28px; margin: 0 0 12px; letter-spacing: -0.4px; }
        @media (max-width: 520px) { .sectionTitle { font-size: 22px; } }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin: 34px 0 52px;
        }
        @media (max-width: 980px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }

        .card {
          border: 1px solid rgba(0,0,0,.12);
          border-radius: 16px;
          padding: 16px;
          background: #fff;
        }
        .cardTitle { font-weight: 950; margin-bottom: 6px; }
        .cardDesc { font-size: 14px; opacity: .82; line-height: 1.45; }

        .how {
          margin-bottom: 52px;
        }
        .ol { margin: 0; padding-left: 18px; opacity: .92; line-height: 1.7; max-width: 900px; }
        .ol b { font-weight: 950; }

        .pilot {
          border-radius: 18px;
          padding: 18px;
          border: 1px solid rgba(0,0,0,.12);
          background: rgba(0,0,0,.015);
        }
        .pilot h3 { margin: 0 0 6px; font-size: 18px; letter-spacing: -0.2px; }
        .pilot p { margin: 0 0 12px; opacity: .82; max-width: 920px; line-height: 1.5; }

        .footer { margin-top: 46px; opacity: .65; font-size: 12px; }
      `}</style>

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="brand">
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
            <div>
              <div className="brandTitle">AXW</div>
              <div className="brandSub">Access × World</div>
            </div>
          </div>

          <div className="topActions">
            <a className="btnPrimary" href="https://app.accessxworld.com">
              Open the app
            </a>
            <a className="btnGhost" href="/contact">
              Talk to us
            </a>
          </div>
        </header>

        {/* HERO (No overlap: grid stacks on mobile) */}
        <section className="heroGrid">
          {/* Left: hero copy + CTAs */}
          <div>
            <h1 className="h1">
              Programmable
              <br />
              access,
              <br />
              everywhere.
            </h1>

            <p className="lede">
              AXW is the coordination layer for access: policy-defined permissions,
              time-bounded tokens, and auditable logs — designed to integrate with
              real systems without publishing sensitive codes.
            </p>

            <div className="ctaColumn">
              <a className="btnPrimary" href="https://app.accessxworld.com">
                Launch app
              </a>
              <a className="btnGhost" href="#pilot">
                Run a 7-day pilot
              </a>
              <a className="btnGhost" href="/demo">
                View demo
              </a>
            </div>
          </div>

          {/* Right: quick links panel */}
          <aside className="quickPanel">
            <div className="quickTitle">Quick links</div>

            <div className="quickLinks">
              <a className="quickLink" href="/venues">
                <span>Public Venue Directory</span>
                <span aria-hidden="true">→</span>
              </a>

              <a className="quickLink" href="/sf-pilot">
                <span>SF Pilot Brief</span>
                <span aria-hidden="true">→</span>
              </a>

              <a className="quickLink" href="/onboarding">
                <span>Onboarding (7 days)</span>
                <span aria-hidden="true">→</span>
              </a>

              <a className="quickLink" href="/outreach">
                <span>Outreach kit</span>
                <span aria-hidden="true">→</span>
              </a>

              <a className="quickLink" href="/investors">
                <span>Investor page</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="quickSub">
              No fluff — everything above is intended to be demoable in minutes.
            </div>
          </aside>
        </section>

        {/* Value props */}
        <section id="what">
          <div className="grid">
            {[
              {
                title: "Serious infrastructure",
                desc:
                  "Access is policy, not a shared secret. Built for reliability, accountability, and real-world ops.",
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
                  "Start with a pilot. Prove value fast. Expand to more sites and integrations.",
              },
            ].map((c) => (
              <div key={c.title} className="card">
                <div className="cardTitle">{c.title}</div>
                <div className="cardDesc">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="how">
          <h2 className="sectionTitle">How it works</h2>
          <ol className="ol">
            <li>
              <b>Define policies</b> (who / what / when / where) once.
            </li>
            <li>
              <b>Issue tokens</b> that encode scope + expiry + constraints.
            </li>
            <li>
              <b>Verify access</b> at the edge (apps, controllers, services).
            </li>
            <li>
              <b>Log events</b> for audit, analytics, enforcement, and pricing.
            </li>
          </ol>
        </section>

        {/* Pilot CTA */}
        <section id="pilot" className="pilot">
          <h3>Pilot in 7 days</h3>
          <p>
            Start with one location or one workflow. Define the rules, issue tokens,
            verify instantly, and log everything. Expand after the first proof of value.
          </p>

          <div className="topActions" style={{ marginTop: 10 }}>
            <a className="btnPrimary" href="https://app.accessxworld.com">
              Launch app
            </a>
            <a className="btnGhost" href="/contact">
              Contact
            </a>
            <a className="btnGhost" href="/investors/model">
              See the model
            </a>
          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} AXW — Access × World
        </footer>
      </div>
    <MarketingGraphicsStack />
    </main>
  );
}
