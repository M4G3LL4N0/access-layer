export default function Home() {
  const year = new Date().getFullYear();

  const links = {
    appVenues: "https://app.accessxworld.com/venues",
    demo: "/demo",
    investors: "/investors",
    model: "/investors/model",
    pricing: "/pricing",
    onboarding: "/onboarding",
    sfPilot: "/sf-pilot",
    pilotPack: "/pilot-pack/0fc330aa-5c3d-4f7f-a74f-7de10c2b56b6",
    verify: "/verify",
    contact: "/contact",
    outreach: "/outreach",
    press: "/press",
    owners: "/owners",
    legalTerms: "/legal/terms",
    legalPrivacy: "/legal/privacy",
  };

  const Pill = ({ children }: { children: any }) => (
    <span
      style={{
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        background: "var(--pill)",
        border: "1px solid var(--border)",
        color: "var(--muted)",
        fontWeight: 800,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );

  const Card = ({
    title,
    desc,
    href,
    foot,
  }: {
    title: string;
    desc: string;
    href?: string;
    foot?: string;
  }) => (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 16,
        background: "var(--card)",
        boxShadow: "var(--shadow)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ fontWeight: 1000, letterSpacing: -0.2 }}>{title}</div>
      <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
        {desc}
      </div>
      {href ? (
        <a
          href={href}
          style={{
            marginTop: 2,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 1000,
            color: "var(--fg)",
            border: "1px solid var(--border)",
            background: "transparent",
            padding: "10px 12px",
            borderRadius: 14,
            width: "fit-content",
          }}
        >
          Open → <span style={{ opacity: 0.7, fontWeight: 800 }}>{href}</span>
        </a>
      ) : null}
      {foot ? (
        <div style={{ fontSize: 12, color: "var(--muted)" }}>{foot}</div>
      ) : null}
    </div>
  );

  const SectionTitle = ({
    id,
    title,
    subtitle,
  }: {
    id?: string;
    title: string;
    subtitle?: string;
  }) => (
    <div id={id} style={{ marginBottom: 14 }}>
      <h2 style={{ fontSize: 28, margin: "0 0 8px", letterSpacing: -0.4 }}>
        {title}
      </h2>
      {subtitle ? (
        <p style={{ margin: 0, color: "var(--muted)", maxWidth: 920, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );

  const Button = ({
    href,
    children,
    variant = "solid",
  }: {
    href: string;
    children: any;
    variant?: "solid" | "outline" | "ghost";
  }) => {
    const base: any = {
      padding: "12px 16px",
      borderRadius: 14,
      textDecoration: "none",
      fontWeight: 1000,
      border: "1px solid var(--border)",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      whiteSpace: "nowrap",
    };

    if (variant === "solid") {
      base.background = "var(--btn)";
      base.color = "var(--btnFg)";
    } else if (variant === "outline") {
      base.background = "var(--card)";
      base.color = "var(--fg)";
    } else {
      base.background = "transparent";
      base.color = "var(--fg)";
      base.opacity = 0.95;
    }

    return (
      <a href={href} style={base}>
        {children} <span style={{ opacity: variant === "solid" ? 0.85 : 0.7 }}>→</span>
      </a>
    );
  };

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
      {/* GLOBAL THEME: fixes dark/light readability everywhere on this page */}
      <style>{`
        :root{
          --bg: #ffffff;
          --fg: #0b0f19;
          --muted: rgba(11,15,25,.68);
          --border: rgba(11,15,25,.12);
          --soft: rgba(11,15,25,.06);
          --card: #ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06);
          --pill: rgba(11,15,25,.08);
          --btn: #0b0f19;
          --btnFg: #ffffff;
          --accent: #2563eb;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg: #070a12;
            --fg: #eef1f7;
            --muted: rgba(238,241,247,.72);
            --border: rgba(238,241,247,.14);
            --soft: rgba(238,241,247,.08);
            --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.40);
            --pill: rgba(238,241,247,.10);
            --btn: #ffffff;
            --btnFg: #070a12;
            --accent: #60a5fa;
          }
        }
        a { color: inherit; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "60px 20px" }}>
        {/* NAV (sticky) */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "color-mix(in srgb, var(--bg) 86%, transparent)",
            backdropFilter: "blur(10px)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 38,
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
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
              <div style={{ fontWeight: 1000, letterSpacing: -0.2 }}>AXW</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Access × World
              </div>
            </div>
          </a>

          <nav
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <a href="#what" style={{ textDecoration: "none", opacity: 0.9 }}>
              What
            </a>
            <a href="#proof" style={{ textDecoration: "none", opacity: 0.9 }}>
              Proof
            </a>
            <a href="#pilot" style={{ textDecoration: "none", opacity: 0.9 }}>
              Pilot
            </a>
            <a href="#investors" style={{ textDecoration: "none", opacity: 0.9 }}>
              Investors
            </a>
            <a href="#start" style={{ textDecoration: "none", opacity: 0.9 }}>
              Start
            </a>
            <a
              href={links.demo}
              style={{
                textDecoration: "none",
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontWeight: 1000,
              }}
            >
              Demo →
            </a>
          </nav>
        </header>

        {/* HERO */}
        <section style={{ marginBottom: 34 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            <Pill>No codes published</Pill>
            <Pill>Policy-driven access</Pill>
            <Pill>Time-bounded tokens</Pill>
            <Pill>Rate limits + cooldown</Pill>
            <Pill>Audit logs</Pill>
            <Pill>SF pilot-ready</Pill>
          </div>

          <h1
            style={{
              fontSize: 56,
              letterSpacing: -1.2,
              margin: "0 0 12px",
              lineHeight: 1.03,
            }}
          >
            Programmable access, everywhere.
          </h1>

          <p
            style={{
              fontSize: 18,
              maxWidth: 920,
              color: "var(--muted)",
              margin: "0 0 22px",
              lineHeight: 1.65,
            }}
          >
            AXW is the coordination layer between <b>access</b> and <b>space</b>:
            policy-defined permissions, time-bounded passes, and auditable logs —
            designed to integrate with real operations without publishing sensitive codes.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href={links.appVenues} variant="solid">
              Open the app
            </Button>
            <Button href="#pilot" variant="outline">
              Run a pilot
            </Button>
            <Button href={links.contact} variant="ghost">
              Contact
            </Button>
          </div>

          <div style={{ marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
            Built for: venues • property ops • workspaces • offices • libraries • shared rooms • access workflows
          </div>
        </section>

        {/* WHAT */}
        <section id="what" style={{ marginBottom: 48 }}>
          <SectionTitle
            title="What we’re building"
            subtitle="Not a list of codes. A neutral access-and-space coordination layer: rules → passes → verification → logs."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            <Card
              title="Tokenized permissions"
              desc="Issue scoped, time-bounded access passes with explicit constraints (mode, expiry, cooldown, daily caps)."
            />
            <Card
              title="Policy engine"
              desc="Define access rules once. Enforce consistently across locations and workflows."
            />
            <Card
              title="Verification surfaces"
              desc="Staff verify pages + QR flows to confirm pass validity without revealing secrets."
              href={links.verify}
            />
            <Card
              title="Owner controls"
              desc="Claim/manage a venue, tune rules, and review usage signals (pilot-ready)."
              href={links.owners}
            />
            <Card
              title="Monetization path"
              desc="Paid owner tier for controls + analytics + verification + integrations. Optional paid access for non-patrons."
              href={links.pricing}
            />
            <Card
              title="Space activation"
              desc="Enable paid access to unused rooms/time with constraints + logging (study rooms, meeting rooms, etc.)."
            />
          </div>
        </section>

        {/* PROOF */}
        <section id="proof" style={{ marginBottom: 52 }}>
          <SectionTitle
            title="Proof of work (live)"
            subtitle="Everything here is wired into the running app. These are the pages an investor can click."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            <Card
              title="Venue directory + map"
              desc="Public pilot directory showing active venues and categories."
              href={links.appVenues}
            />
            <Card
              title="Pilot pack (venue-specific)"
              desc="A venue-ready packet (links + checklist + signage + ops steps) for fast onboarding."
              href={links.pilotPack}
              foot="Note: pilot-pack uses a sample venue id. You can swap it anytime."
            />
            <Card
              title="SF pilot page"
              desc="SF rollout story + operator plan + proof narrative."
              href={links.sfPilot}
            />
            <Card
              title="Demo page"
              desc="Fast VC demo surface (what it does + why it’s real)."
              href={links.demo}
            />
          </div>
        </section>

        {/* PILOT */}
        <section
          id="pilot"
          style={{
            borderRadius: 20,
            padding: 18,
            border: "1px solid var(--border)",
            background: "linear-gradient(180deg, var(--card), transparent)",
            marginBottom: 54,
          }}
        >
          <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 1000 }}>
            Pilot in 7 days
          </h3>
          <p style={{ margin: "0 0 12px", color: "var(--muted)", maxWidth: 940, lineHeight: 1.6 }}>
            Start with one location or workflow. We set the rule set, issue passes, verify via staff page/QR,
            and log everything. Then expand across more sites and use cases.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href={links.onboarding} variant="solid">
              Start onboarding
            </Button>
            <Button href={links.outreach} variant="outline">
              Outreach playbook
            </Button>
            <Button href={links.contact} variant="ghost">
              Talk to us
            </Button>
          </div>

          <div style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
            Operator next steps: pick a venue → create rule → signage → staff verify → monitor usage → expand.
          </div>
        </section>

        {/* INVESTORS */}
        <section id="investors" style={{ marginBottom: 56 }}>
          <SectionTitle
            title="Investors"
            subtitle="This project already includes investor-facing pages (including an interactive model). The homepage routes investors straight into them."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <Card
              title="Investor narrative"
              desc="Platform story: wedge → expansion → integrations → network effects."
              href={links.investors}
            />
            <Card
              title="Interactive growth model"
              desc="The slider-based page (market sizing + scenarios). Use this live in VC meetings."
              href={links.model}
            />
            <Card
              title="Press / one-pager"
              desc="Media + VC one-page summary (what it is, why now, traction, ask)."
              href={links.press}
            />
          </div>

          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: 16,
              background: "var(--card)",
            }}
          >
            <div style={{ fontWeight: 1000, marginBottom: 8 }}>
              Suggested VC click-path (60 seconds)
            </div>
            <ol style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", lineHeight: 1.75 }}>
              <li>Open Venue Directory (shows real product)</li>
              <li>Open a Venue → Request Access → Pass Token</li>
              <li>Open Verify page → validate token</li>
              <li>Open Investor Model → run scenarios</li>
            </ol>
          </div>
        </section>

        {/* START */}
        <section id="start" style={{ marginBottom: 52 }}>
          <SectionTitle
            title="Start here"
            subtitle="If you have 5 minutes: click these. If you have 5 days: run the pilot."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 10,
              fontSize: 14,
            }}
          >
            {[
              { label: "App: Venues", href: links.appVenues },
              { label: "Verify token", href: links.verify },
              { label: "Pilot onboarding", href: links.onboarding },
              { label: "Pilot pack", href: links.pilotPack },
              { label: "SF pilot", href: links.sfPilot },
              { label: "Demo", href: links.demo },
              { label: "Investors", href: links.investors },
              { label: "Model", href: links.model },
              { label: "Pricing", href: links.pricing },
              { label: "Outreach", href: links.outreach },
              { label: "Contact", href: links.contact },
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
                  fontWeight: 1000,
                  color: "var(--fg)",
                }}
              >
                {l.label} →{" "}
                <span style={{ color: "var(--muted)", fontWeight: 800 }}>
                  {l.href}
                </span>
              </a>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: 18, color: "var(--muted)", fontSize: 12 }}>
          © {year} AXW — Access × World •{" "}
          <a href={links.legalTerms} style={{ textDecoration: "underline" }}>
            Terms
          </a>{" "}
          •{" "}
          <a href={links.legalPrivacy} style={{ textDecoration: "underline" }}>
            Privacy
          </a>
        </footer>
      </div>
    </main>
  );
}
