import { HeroProductPanel } from "@/components/HeroProductPanel";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
const sectors = [
  "Venues",
  "Parking operators",
  "Real estate",
  "Enterprise campuses",
  "Infrastructure teams",
];

const proofPoints = [
  {
    value: "Policy",
    label: "Rules become signed, time-bounded access decisions.",
  },
  {
    value: "Proof",
    label: "Every grant, denial, scan, and revocation is verifiable.",
  },
  {
    value: "Throughput",
    label: "Operators move people and vehicles faster without sharing codes.",
  },
];

const steps = [
  {
    title: "Define the policy",
    body: "Set who can enter, where, when, under what conditions, and for how long.",
  },
  {
    title: "Issue access",
    body: "Generate signed credentials for guests, staff, vendors, vehicles, or devices.",
  },
  {
    title: "Verify at the edge",
    body: "Check access at doors, gates, kiosks, scanners, and operator workflows.",
  },
  {
    title: "Audit the outcome",
    body: "Keep a neutral event trail for liability, compliance, billing, and operations.",
  },
];

const useCases = [
  "Parking passes that expire automatically after a reservation window.",
  "Venue credentials for contractors, staff, talent, security, and VIP zones.",
  "Property access workflows that prove who entered without exposing lock codes.",
  "Enterprise site access with revocation, audit, and policy consistency across locations.",
];

export default function Page() {
  return (
    <main>
      <style>{`
        :root {
          color-scheme: light;
          --ink: #07110f;
          --muted: #52615d;
          --line: rgba(7, 17, 15, 0.12);
          --soft: #f6f4ef;
          --accent: #1f7a5b;
          --accent-strong: #0d5f46;
          --gold: #c99d45;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #fbfaf7; color: var(--ink); }
        a { color: inherit; text-decoration: none; }

        .shell {
          min-height: 100vh;
          font-family: var(--font-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            linear-gradient(180deg, rgba(251,250,247,0.88), #fbfaf7 28rem),
            radial-gradient(circle at 74% 6%, rgba(31,122,91,0.14), transparent 27rem),
            #fbfaf7;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(22px);
          background: rgba(251, 250, 247, 0.84);
          border-bottom: 1px solid rgba(7, 17, 15, 0.08);
        }

        .navInner, .sectionInner, .heroInner {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .navInner {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          font-weight: 760;
          letter-spacing: 0;
        }

        .brand img {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(7, 17, 15, 0.12);
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: 24px;
          color: #33413d;
          font-size: 14px;
          font-weight: 620;
        }

        .navLinks a:hover { color: var(--accent-strong); }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid rgba(7, 17, 15, 0.14);
          background: white;
          color: var(--ink);
          font-weight: 720;
          box-shadow: 0 10px 30px rgba(7, 17, 15, 0.06);
        }

        .button.primary {
          background: var(--ink);
          color: white;
          border-color: var(--ink);
        }

        .hero {
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(7, 17, 15, 0.08);
        }

        .heroInner {
          display: grid;
          grid-template-columns: minmax(0, 1.06fr) minmax(340px, 0.72fr);
          gap: 56px;
          align-items: center;
          padding: 80px 0 74px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--accent-strong);
          font-size: 13px;
          font-weight: 780;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .eyebrow::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: var(--gold);
        }

        h1 {
          max-width: 780px;
          margin: 18px 0 0;
          font-size: clamp(54px, 7.2vw, 98px);
          line-height: 0.94;
          letter-spacing: 0;
          font-weight: 820;
        }

        .lede {
          max-width: 680px;
          margin: 24px 0 0;
          color: var(--muted);
          font-size: 21px;
          line-height: 1.55;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 34px;
        }

        .sectorRail {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 34px;
        }

        .pill {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 9px 12px;
          color: #3a4844;
          background: rgba(255,255,255,0.66);
          font-size: 13px;
          font-weight: 650;
        }

        .console {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(7, 17, 15, 0.12);
          border-radius: 8px;
          background: #07110f;
          color: white;
          box-shadow: 0 34px 90px rgba(7, 17, 15, 0.22);
        }

        .consoleTop {
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.68);
          font-size: 12px;
          font-weight: 700;
        }

        .consoleBody { padding: 20px; }

        .accessCard {
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 8px;
          padding: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
        }

        .accessStatus {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: #a5f3d2;
          font-size: 13px;
          font-weight: 780;
        }

        .accessTitle {
          margin-top: 30px;
          font-size: 28px;
          line-height: 1.08;
          font-weight: 780;
        }

        .accessMeta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 24px;
        }

        .metaBox {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 12px;
          background: rgba(255,255,255,0.04);
        }

        .metaLabel {
          color: rgba(255,255,255,0.48);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 760;
        }

        .metaValue {
          margin-top: 6px;
          color: rgba(255,255,255,0.92);
          font-size: 14px;
          font-weight: 700;
        }

        .eventList {
          display: grid;
          gap: 10px;
          margin-top: 16px;
        }

        .event {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 13px;
          color: rgba(255,255,255,0.74);
          font-size: 13px;
        }

        section {
          border-bottom: 1px solid rgba(7, 17, 15, 0.08);
        }

        .sectionInner {
          padding: 86px 0;
        }

        .split {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr);
          gap: 56px;
          align-items: start;
        }

        .kicker {
          color: var(--accent-strong);
          font-size: 13px;
          font-weight: 780;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        h2 {
          margin: 12px 0 0;
          font-size: clamp(34px, 4.3vw, 58px);
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: 0;
        }

        .sectionCopy {
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 18px;
          line-height: 1.6;
        }

        .proofGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .proof, .step, .useCase {
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,0.72);
          padding: 22px;
        }

        .proofValue {
          color: var(--ink);
          font-size: 27px;
          line-height: 1;
          font-weight: 800;
        }

        .proofLabel, .step p, .useCase {
          color: var(--muted);
          line-height: 1.55;
        }

        .proofLabel { margin-top: 12px; font-size: 15px; }

        .stepGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-top: 34px;
        }

        .stepNumber {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 99px;
          background: #e8efe9;
          color: var(--accent-strong);
          font-weight: 800;
          font-size: 13px;
        }

        .step h3 {
          margin: 22px 0 0;
          font-size: 19px;
          line-height: 1.15;
        }

        .step p { margin: 10px 0 0; font-size: 15px; }

        .useCaseGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .benefitBand {
          background: #07110f;
          color: white;
        }

        .benefitBand .kicker { color: #a5f3d2; }
        .benefitBand .sectionCopy { color: rgba(255,255,255,0.68); }

        .benefitList {
          display: grid;
          gap: 14px;
        }

        .benefit {
          display: grid;
          grid-template-columns: 28px minmax(0, 1fr);
          gap: 14px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.82);
          line-height: 1.55;
        }

        .check {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 99px;
          background: rgba(165,243,210,0.14);
          color: #a5f3d2;
          font-weight: 900;
        }

        .cta {
          text-align: center;
        }

        .cta h2 {
          margin-left: auto;
          margin-right: auto;
          max-width: 760px;
        }

        .cta .sectionCopy {
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }

        footer {
          color: #62706c;
          font-size: 14px;
        }

        .footerInner {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 28px 0;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 920px) {
          .navLinks a:not(.button) { display: none; }
          .hero { min-height: auto; }
          .heroInner, .split {
            grid-template-columns: 1fr;
            gap: 34px;
          }
          .proofGrid, .stepGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .navInner, .sectionInner, .heroInner, .footerInner {
            width: min(100% - 28px, 1180px);
          }
          .navInner { height: 66px; }
          .brand span { display: none; }
          .button { width: 100%; }
          .navLinks .button { width: auto; min-height: 40px; padding: 0 14px; }
          .heroInner { padding: 58px 0 48px; }
          h1 { font-size: 52px; }
          .lede { font-size: 18px; }
          .heroActions { flex-direction: column; }
          .consoleBody { padding: 14px; }
          .accessMeta, .proofGrid, .stepGrid, .useCaseGrid {
            grid-template-columns: 1fr;
          }
          .sectionInner { padding: 64px 0; }
        }
      `}</style>

      <div className="shell">
        <nav className="nav" aria-label="Primary navigation">
          <div className="navInner">
            <a className="brand" href="/">
              <img src="/axw-icon.png" alt="" />
              <span>AXW Access Layer</span>
            </a>
            <div className="navLinks">
              <a href="#how">How it works</a>
              <a href="#use-cases">Use cases</a>
              <a href="#benefits">Benefits</a>
              <a className="button primary" href="mailto:founders@accessxworld.com?subject=AXW%20pilot">
                Request pilot
              </a>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="heroInner">
            <div>
              <div className="eyebrow">Access x World</div>
              <h1>Programmable access infrastructure for real-world spaces.</h1>
              <p className="lede">
                AXW is a neutral coordination layer for physical access: policy-defined credentials,
                edge verification, and auditable proof across venues, parking, property, enterprise,
                and civic infrastructure.
              </p>
              <div className="heroActions">
                <a className="button primary" href="mailto:founders@accessxworld.com?subject=AXW%20pilot">
                  Start a pilot
                </a>
                <a className="button" href="#how">
                  See the access flow
                </a>
              </div>
              <div className="sectorRail" aria-label="Target sectors">
                {sectors.map((sector) => (
                  <span className="pill" key={sector}>{sector}</span>
                ))}
              </div>
            </div>

            <aside className="console" aria-label="AXW access decision preview">
              <div className="consoleTop">
                <span>AXW POLICY DECISION</span>
                <span>VERIFIED</span>
              </div>
              <div className="consoleBody">
                <div className="accessCard">
                  <div className="accessStatus">
                    <span>Access granted</span>
                    <span>Token axw_live_8274</span>
                  </div>
                  <div className="accessTitle">
                    Gate B parking entry approved for a 42-minute arrival window.
                  </div>
                  <div className="accessMeta">
                    <div className="metaBox">
                      <div className="metaLabel">Policy</div>
                      <div className="metaValue">Reservation + operator override</div>
                    </div>
                    <div className="metaBox">
                      <div className="metaLabel">Risk</div>
                      <div className="metaValue">Low liability exposure</div>
                    </div>
                    <div className="metaBox">
                      <div className="metaLabel">Proof</div>
                      <div className="metaValue">Signed event trail</div>
                    </div>
                    <div className="metaBox">
                      <div className="metaLabel">Throughput</div>
                      <div className="metaValue">No shared gate code</div>
                    </div>
                  </div>
                </div>
                <div className="eventList">
                  <div className="event"><span>Credential issued</span><strong>09:14</strong></div>
                  <div className="event"><span>Edge scan accepted</span><strong>09:21</strong></div>
                  <div className="event"><span>Audit record sealed</span><strong>09:21</strong></div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section>
          <div className="sectionInner split">
            <div>
              <div className="kicker">Why it matters</div>
              <h2>Physical access still runs on brittle handoffs.</h2>
              <p className="sectionCopy">
                Codes get copied. Staff improvise. Vendors arrive outside windows. Parking, venues,
                buildings, campuses, and public facilities need coordination without forcing every
                operator into one closed hardware stack.
              </p>
            </div>
            <div className="proofGrid">
              {proofPoints.map((point) => (
                <div className="proof" key={point.value}>
                  <div className="proofValue">{point.value}</div>
                  <div className="proofLabel">{point.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how">
          <div className="sectionInner">
            <div className="kicker">How it works</div>
            <h2>One policy layer from request to proof.</h2>
            <p className="sectionCopy">
              AXW keeps the core workflow simple enough to pilot, while leaving room for hardware,
              operator, and enterprise integrations as deployments scale.
            </p>
            <div className="stepGrid">
              {steps.map((step, index) => (
                <div className="step" key={step.title}>
                  <div className="stepNumber">{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases">
          <div className="sectionInner split">
            <div>
              <div className="kicker">Use cases</div>
              <h2>Built for operators who need trust and throughput.</h2>
              <p className="sectionCopy">
                The first MVP is a demo-ready access flow for pilots, not a bloated dashboard.
                It shows how policies, credentials, verification, and audit connect across places.
              </p>
            </div>
            <div className="useCaseGrid">
              {useCases.map((item) => (
                <div className="useCase" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="benefitBand" id="benefits">
          <div className="sectionInner split">
            <div>
              <div className="kicker">Benefits</div>
              <h2>Less liability. Faster lines. Clearer accountability.</h2>
              <p className="sectionCopy">
                AXW wins by staying neutral: it coordinates access across existing operations
                instead of pretending the world will replace every gate, scanner, badge, and lock.
              </p>
            </div>
            <div className="benefitList">
              <div className="benefit"><span className="check">✓</span><span>Lower exposure from copied codes, manual approvals, and unverifiable entry events.</span></div>
              <div className="benefit"><span className="check">✓</span><span>Higher throughput for arrivals, vendors, tenants, staff, and visitors.</span></div>
              <div className="benefit"><span className="check">✓</span><span>Verifiable proof of access decisions for disputes, audits, compliance, and billing.</span></div>
              <div className="benefit"><span className="check">✓</span><span>Scalable rollout across locations without locking operators into one hardware vendor.</span></div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="sectionInner">
            <div className="kicker">Pilot-ready MVP</div>
            <h2>Coordinate access before the next operational bottleneck becomes a liability event.</h2>
            <p className="sectionCopy">
              Use AXW to model a real access flow, issue signed credentials, verify at the edge,
              and prove exactly what happened.
            </p>
            <div className="heroActions" style={{ justifyContent: "center" }}>
              <a className="button primary" href="mailto:founders@accessxworld.com?subject=AXW%20pilot">
                Request pilot access
              </a>
              <a className="button" href="mailto:founders@accessxworld.com?subject=AXW%20investor%20brief">
                Request investor brief
              </a>
            </div>
          </div>
        </section>

        <footer>
          <div className="footerInner">
            <span>AXW Access Layer</span>
            <span>Policy-driven coordination for physical access infrastructure.</span>
          </div>
        </footer>
      </div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6"><HeroProductPanel /></section>
      <ProcessFlowSection />
    <MarketingGraphicsStack />
    </main>
  );
}
