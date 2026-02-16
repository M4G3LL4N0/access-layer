export default function VcPacketPage() {
  const venueId = "0fc330aa-5c3d-4f7f-a74f-7de10c2b56b6";

  const links = {
    vc: "/vc",
    checklist: "/vc/checklist",
    home: "/",
    demo: "/demo",
    venues: "/venues",
    venue: `/v/${venueId}`,
    request: `/request/${venueId}`,
    verify: "/verify",
    pilotPack: `/pilot-pack/${venueId}`,
    investors: "/investors",
    model: "/investors/model",
    pricing: "/pricing",
    onboarding: "/onboarding",
    outreach: "/outreach",
    sfPilot: "/sf-pilot",
    press: "/press",
    contact: "/contact",
    legalTerms: "/legal/terms",
    legalPrivacy: "/legal/privacy",
  };

  const Shell = ({ children }: { children: any }) => (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: "100vh",
      }}
    >
      <style>{`
        :root{
          --bg:#ffffff;
          --fg:#0b0f19;
          --muted:rgba(11,15,25,.70);
          --border:rgba(11,15,25,.12);
          --card:#ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06);
          --soft: rgba(11,15,25,.06);
          --btn:#0b0f19;
          --btnFg:#ffffff;
          --accent:#2563eb;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg:#070a12;
            --fg:#eef1f7;
            --muted:rgba(238,241,247,.72);
            --border:rgba(238,241,247,.14);
            --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.40);
            --soft: rgba(238,241,247,.08);
            --btn:#ffffff;
            --btnFg:#070a12;
            --accent:#60a5fa;
          }
        }
        *{ box-sizing:border-box; }
        a{ color:inherit; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 20px" }}>
        {children}
      </div>
    </main>
  );

  const Card = ({ title, children }: { title: string; children: any }) => (
    <section
      style={{
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 16,
        background: "var(--card)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div style={{ fontWeight: 1100, marginBottom: 10 }}>{title}</div>
      <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>{children}</div>
    </section>
  );

  const LinkRow = ({
    label,
    href,
    desc,
  }: {
    label: string;
    href: string;
    desc: string;
  }) => (
    <a
      href={href}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 14,
        textDecoration: "none",
        borderRadius: 14,
        padding: "12px 14px",
        border: "1px solid var(--border)",
        background: "transparent",
      }}
    >
      <div>
        <div style={{ fontWeight: 1100 }}>{label}</div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
      </div>
      <div style={{ fontWeight: 1100, opacity: 0.85 }}>Open →</div>
    </a>
  );

  const Mono = ({ children }: { children: any }) => (
    <pre
      style={{
        margin: 0,
        padding: 14,
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "var(--soft)",
        overflowX: "auto",
        color: "var(--fg)",
        fontSize: 13,
        lineHeight: 1.55,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </pre>
  );

  return (
    <Shell>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>
            AXW • VC Packet
          </div>
          <h1 style={{ margin: "6px 0 0", fontSize: 42, letterSpacing: -1 }}>
            Investor Packet (Live Links)
          </h1>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 980 }}>
            One page with everything: product surfaces, pilot assets, pricing, model, and proof.
            Built to be forwarded.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignSelf: "flex-start" }}>
          <a
            href={links.vc}
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              textDecoration: "none",
              fontWeight: 1000,
            }}
          >
            Back to /vc
          </a>
          <a
            href={links.checklist}
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              textDecoration: "none",
              fontWeight: 1000,
              background: "var(--btn)",
              color: "var(--btnFg)",
            }}
          >
            Open runbook → /vc/checklist
          </a>
        </div>
      </header>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
        <Card title="What AXW is (tight)">
          <Mono>{`AXW is the coordination layer between access and space.

We do NOT publish codes.
Venues define policy → we issue time-bounded passes → staff verifies → everything is logged.

Wedge: SF pilot (few venues/workspaces).
Expansion: multi-site ops, property ops, integrations, enterprise workflows.`}</Mono>
        </Card>

        <Card title="The live proof path (4 clicks)">
          <div style={{ display: "grid", gap: 10 }}>
            <LinkRow label="1) /venues" href={links.venues} desc="Directory + map + filtering" />
            <LinkRow label={`2) /v/${venueId}`} href={links.venue} desc="Venue page shows rules + request entry" />
            <LinkRow label={`3) /request/${venueId}`} href={links.request} desc="Issue a pass (token), rate-limited" />
            <LinkRow label="4) /verify" href={links.verify} desc="Staff-side verification (valid/expired)" />
          </div>
        </Card>
      </div>

      <h2 style={{ margin: "24px 0 12px", fontSize: 26 }}>Product + business surfaces</h2>
      <div style={{ display: "grid", gap: 10 }}>
        <LinkRow label="/demo" href={links.demo} desc="VC-friendly demo overview" />
        <LinkRow label="/pricing" href={links.pricing} desc="Pilot → owner controls → scale" />
        <LinkRow label="/investors" href={links.investors} desc="Narrative: wedge → expansion → integrations" />
        <LinkRow label="/investors/model" href={links.model} desc="Interactive model (sliders/scenarios)" />
        <LinkRow label={`/pilot-pack/${venueId}`} href={links.pilotPack} desc="Operator packet you send venues" />
      </div>

      <h2 style={{ margin: "24px 0 12px", fontSize: 26 }}>SF launch + GTM assets</h2>
      <div style={{ display: "grid", gap: 10 }}>
        <LinkRow label="/sf-pilot" href={links.sfPilot} desc="SF pilot narrative + proof plan" />
        <LinkRow label="/onboarding" href={links.onboarding} desc="Venue onboarding steps" />
        <LinkRow label="/outreach" href={links.outreach} desc="Scripts + targeting + close steps" />
        <LinkRow label="/press" href={links.press} desc="One-pager / press-ready overview" />
        <LinkRow label="/contact" href={links.contact} desc="Lead capture + venue contact" />
      </div>

      <h2 style={{ margin: "24px 0 12px", fontSize: 26 }}>Legal (safe to forward)</h2>
      <div style={{ display: "grid", gap: 10 }}>
        <LinkRow label="/legal/terms" href={links.legalTerms} desc="Terms" />
        <LinkRow label="/legal/privacy" href={links.legalPrivacy} desc="Privacy" />
      </div>

      <div style={{ marginTop: 18, fontSize: 12, color: "var(--muted)" }}>
        Forward line: “Here’s the product in 4 clicks: /venues → /v → /request → /verify. No codes published.”
      </div>
    </Shell>
  );
}
