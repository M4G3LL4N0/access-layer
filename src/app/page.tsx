export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: "100vh",
      }}
    >
      {/* Simple global theming so dark/light never breaks readability */}
      <style>{`
        :root{
          --bg: #ffffff;
          --fg: #0b0f19;
          --muted: rgba(11,15,25,.66);
          --border: rgba(11,15,25,.12);
          --soft: rgba(11,15,25,.06);
          --card: #ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06);
          --pill: rgba(11,15,25,.08);
          --btn: #0b0f19;
          --btnFg: #ffffff;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg: #070a12;
            --fg: #eef1f7;
            --muted: rgba(238,241,247,.70);
            --border: rgba(238,241,247,.14);
            --soft: rgba(238,241,247,.07);
            --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.35);
            --pill: rgba(238,241,247,.10);
            --btn: #ffffff;
            --btnFg: #070a12;
          }
        }
        a { color: inherit; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 20px" }}>
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
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
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 900, letterSpacing: -0.2 }}>AXW</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Access × World
              </div>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              gap: 16,
              fontSize: 14,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <a href="#what" style={{ textDecoration: "none", opacity: 0.85 }}>
              What
            </a>
            <a href="#how" style={{ textDecoration: "none", opacity: 0.85 }}>
              How
            </a>
            <a href="#pilot" style={{ textDecoration: "none", opacity: 0.85 }}>
              Pilot
            </a>
            <a
              href="/demo"
              style={{
                textDecoration: "none",
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontWeight: 800,
              }}
            >
              Demo
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section style={{ marginBottom: 34 }}>
          <div
            style={{
              display: "inline-flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            {[
              "No codes published",
              "Policy-driven access",
              "Time-bounded passes",
              "Audit logs",
              "Hayes Valley pilot",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "var(--pill)",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  fontWeight: 700,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: 56,
              letterSpacing: -1.2,
              margin: "0 0 14px",
              lineHeight: 1.03,
            }}
          >
            Programmable access, everywhere.
          </h1>

          <p
            style={{
              fontSize: 18,
              maxWidth: 860,
              color: "var(--muted)",
              margin: "0 0 26px",
              lineHeight: 1.6,
            }}
          >
            AXW is the coordination layer between <b>access</b> and <b>space</b>:
            policy-defined permissions, time-bounded tokens, and auditable logs —
            designed to integrate with real operations without publishing sensitive
            codes.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://app.accessxworld.com/venues"
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                background: "var(--btn)",
                color: "var(--btnFg)",
                textDecoration: "none",
                fontWeight: 900,
                border: "1px solid var(--border)",
              }}
            >
              Open the app
            </a>

            <a
              href="#pilot"
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--card)",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Run a pilot
            </a>

            <a
              href="/contact"
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "transparent",
                textDecoration: "none",
                fontWeight: 900,
                opacity: 0.95,
              }}
            >
              Contact
            </a>
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
            Built for: venues • property ops • shared workspaces • multi-site
            operations • enterprise access workflows
          </div>
        </section>

        {/* Quick proof blocks */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginBottom: 46,
          }}
        >
          {[
            {
              title: "Rules → Passes",
              desc: "Access rules issue time-limited passes (no secrets revealed).",
            },
            {
              title: "Rate limits",
              desc: "Cooldowns + per-day caps prevent abuse and spam.",
            },
            {
              title: "Logs",
              desc: "Every grant is logged for ops, analytics, and disputes.",
            },
            {
              title: "Owner controls",
              desc: "Claim/manage flows for venues to control policies & insights.",
            },
          ].map((c) => (
            <div
              key={c.title}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: 16,
                background: "var(--card)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div style={{ fontWeight: 1000, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </section>

        {/* Value props */}
        <section id="what" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, margin: "0 0 12px" }}>
            What we’re building
          </h2>
          <p style={{ margin: "0 0 18px", color: "var(--muted)", maxWidth: 920, lineHeight: 1.6 }}>
            Not “a list of codes.” This is an <b>access infrastructure layer</b>:
            permissions + verification + logging that can plug into real-world
            spaces and digital systems.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                title: "Serious infrastructure",
                desc: "Access is policy, not a shared secret. Built for reliability and accountability.",
              },
              {
                title: "Tokenized permissions",
                desc: "Issue scoped, time-bounded access tokens with explicit constraints.",
              },
              {
                title: "Auditable by default",
                desc: "Events are logged: who requested, when granted, when expired.",
              },
              {
                title: "Conversion-ready",
                desc: "Start with pilots. Prove ROI fast. Expand across sites and workflows.",
              },
              {
                title: "Owner monetization",
                desc: "Paid controls: policies, analytics, staff verification, integrations.",
              },
              {
                title: "Space activation",
                desc: "Unlock unused rooms/time via paid access flows and booking constraints.",
              },
            ].map((c) => (
              <div
                key={c.title}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  padding: 16,
                  background: "var(--card)",
                }}
              >
                <div style={{ fontWeight: 1000, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, margin: "0 0 12px" }}>How it works</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 14,
            }}
          >
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: 16,
                background: "var(--card)",
              }}
            >
              <div style={{ fontWeight: 1000, marginBottom: 10 }}>Flow</div>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                }}
              >
                <li>
                  <b>Define policies</b> (who/what/when/where) once.
                </li>
                <li>
                  <b>Issue passes</b> that encode scope + expiry + constraints.
                </li>
                <li>
                  <b>Verify</b> at the edge (staff page, scanners, controllers).
                </li>
                <li>
                  <b>Log events</b> for audit + analytics + enforcement.
                </li>
              </ol>
            </div>

            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: 16,
                background: "var(--card)",
              }}
            >
              <div style={{ fontWeight: 1000, marginBottom: 10 }}>
                What makes it defensible
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                }}
              >
                <li>Identity optional early (guest) → required later (account).</li>
                <li>Rate-limits + cooldowns + daily caps.</li>
                <li>Owner controls to tune friction, pricing, and enforcement.</li>
                <li>Data layer: usage signals → better policies → better conversion.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pilot CTA */}
        <section
          id="pilot"
          style={{
            borderRadius: 20,
            padding: 18,
            border: "1px solid var(--border)",
            background: "linear-gradient(180deg, var(--card), transparent)",
            marginBottom: 56,
          }}
        >
          <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 1000 }}>
            Pilot in 7 days
          </h3>
          <p style={{ margin: "0 0 12px", color: "var(--muted)", maxWidth: 900, lineHeight: 1.6 }}>
            Start with one location or one workflow. We’ll define the rule set, issue passes, and log everything.
            Expand after the first proof of value.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://app.accessxworld.com/venues"
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                background: "var(--btn)",
                color: "var(--btnFg)",
                textDecoration: "none",
                fontWeight: 1000,
                border: "1px solid var(--border)",
              }}
            >
              Launch app
            </a>

            <a
              href="/onboarding"
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--card)",
                textDecoration: "none",
                fontWeight: 1000,
              }}
            >
              Venue onboarding
            </a>

            <a
              href="/sf-pilot"
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "transparent",
                textDecoration: "none",
                fontWeight: 1000,
              }}
            >
              SF pilot pack
            </a>
          </div>

          <div style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
            Want the full story? See{" "}
            <a href="/investors" style={{ fontWeight: 900, textDecoration: "underline" }}>
              Investors
            </a>{" "}
            and{" "}
            <a href="/pricing" style={{ fontWeight: 900, textDecoration: "underline" }}>
              Pricing
            </a>
            .
          </div>
        </section>

        {/* Roadmap + Market wedge */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, margin: "0 0 12px" }}>
            Roadmap: wedge → platform
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                title: "Phase 1 — pilots (now)",
                bullets: [
                  "Rules + passes + logs",
                  "Venue directory + maps",
                  "Staff verify + QR",
                  "Lead capture + onboarding flow",
                ],
              },
              {
                title: "Phase 2 — owner controls",
                bullets: [
                  "Manage venue settings + rules UI",
                  "Analytics dashboards",
                  "Membership + invite-based access",
                  "Paid tiers (controls, verification, reporting)",
                ],
              },
              {
                title: "Phase 3 — integrations",
                bullets: [
                  "Door controllers / access systems",
                  "Booking systems (rooms, equipment)",
                  "SaaS / API-first access layer",
                  "Enterprise audit + compliance workflows",
                ],
              },
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  padding: 16,
                  background: "var(--card)",
                }}
              >
                <div style={{ fontWeight: 1000, marginBottom: 10 }}>{p.title}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", lineHeight: 1.75 }}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Link hub */}
        <section
          style={{
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: 16,
            background: "var(--card)",
            marginBottom: 40,
          }}
        >
          <div style={{ fontWeight: 1000, marginBottom: 10 }}>
            Explore (live pages)
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 10,
              fontSize: 14,
              color: "var(--muted)",
            }}
          >
            {[
              { label: "App: Venue directory", href: "https://app.accessxworld.com/venues" },
              { label: "Demo", href: "/demo" },
              { label: "Investors", href: "/investors" },
              { label: "Pricing", href: "/pricing" },
              { label: "Onboarding", href: "/onboarding" },
              { label: "SF pilot pack", href: "/sf-pilot" },
              { label: "Contact", href: "/contact" },
              { label: "Owners", href: "/owners" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "10px 12px",
                  background: "transparent",
                  fontWeight: 900,
                  color: "var(--fg)",
                }}
              >
                {l.label} →
              </a>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: 18, color: "var(--muted)", fontSize: 12 }}>
          © {year} AXW — Access × World •{" "}
          <a href="/legal/terms" style={{ textDecoration: "underline" }}>
            Terms
          </a>{" "}
          •{" "}
          <a href="/legal/privacy" style={{ textDecoration: "underline" }}>
            Privacy
          </a>
        </footer>
      </div>
    </main>
  );
}
