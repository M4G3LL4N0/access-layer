import { SubpageVisual } from "@/components/SubpageVisual";
export default function VcChecklistPage() {
  const venueId = "0fc330aa-5c3d-4f7f-a74f-7de10c2b56b6"; // safe sample from your existing venues list

  const links = {
    vc: "/vc",
    packet: "/vc/packet",
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
    demo: "/demo",
    contact: "/contact",
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
      <SubpageVisual variant="default" />
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

  const Button = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => (
    <a
      href={href}
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
      {label}
    </a>
  );

  const Ghost = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 14px",
        borderRadius: 14,
        border: "1px solid var(--border)",
        textDecoration: "none",
        fontWeight: 1000,
        background: "transparent",
        color: "var(--fg)",
      }}
    >
      {label}
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
            AXW • VC Runbook
          </div>
          <h1 style={{ margin: "6px 0 0", fontSize: 42, letterSpacing: -1 }}>
            Meeting Checklist (Live Demo Flow)
          </h1>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 920 }}>
            Use this page to run a full investor meeting without opening a deck.
            It’s the exact click-path + what to say + what to prove.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignSelf: "flex-start" }}>
          <Ghost href={links.vc} label="Back to /vc" />
          <Button href={links.packet} label="Open /vc/packet →" />
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        <Card title="Pre-flight (2 minutes)">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Open <b>/vc</b> in one tab and <b>/vc/checklist</b> in another.</li>
            <li>Open <b>/venues</b> and confirm the map loads.</li>
            <li>Pick a venue (this page uses a known one).</li>
            <li>Confirm <b>/verify</b> loads.</li>
            <li>If anything feels slow, refresh once and keep moving.</li>
          </ul>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button href={links.venues} label="Open /venues" />
            <Ghost href={links.verify} label="Open /verify" />
          </div>
        </Card>

        <Card title="60-second script (tight)">
          <Mono>{`AXW is the coordination layer between access and space.

We DO NOT publish codes.
Venues define rules, we issue time-bounded passes, staff verifies them, and everything is logged.

The wedge is SF: a small pilot with a few venues/workspaces.
Then we expand to multi-site operators, property ops, and integrations.

Watch the live flow:
directory → venue → request → verify.`}</Mono>
        </Card>

        <Card title="5-minute script (deeper)">
          <Mono>{`Problem:
Access is usually shared secrets (codes/keys) with no policy, no audit, and disputes.

Solution:
Turn access into policy objects + verifiable passes.
Rules define limits (hours, caps, cooldown).
Passes expire. Staff can verify fast. Logs create accountability.

Wedge:
SF pilot: restrooms, workspaces, offices.
Track: requests, approvals, declines, abuse prevention, operator controls.

Expansion:
Property managers + multi-site ops → hardware/controller integrations → booking/payments → enterprise access workflows.`}</Mono>
        </Card>
      </div>

      <h2 style={{ margin: "24px 0 12px", fontSize: 26 }}>Live demo click-path (do this in order)</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Step 1 — Directory">
          <div style={{ marginBottom: 10 }}>
            Proves real marketplace surface (map + list + search).
          </div>
          <Button href={links.venues} label="1) /venues" />
        </Card>

        <Card title="Step 2 — Venue page">
          <div style={{ marginBottom: 10 }}>
            Proves rules + entry point for requesting access.
          </div>
          <Button href={links.venue} label={`2) /v/${venueId}`} />
        </Card>

        <Card title="Step 3 — Request pass">
          <div style={{ marginBottom: 10 }}>
            Proves token issuance with rate limits and expiry. (No codes.)
          </div>
          <Button href={links.request} label={`3) /request/${venueId}`} />
        </Card>

        <Card title="Step 4 — Verify pass">
          <div style={{ marginBottom: 10 }}>
            Proves staff-side verification (valid/invalid/expired).
          </div>
          <Button href={links.verify} label="4) /verify" />
        </Card>
      </div>

      <div style={{ marginTop: 14 }}>
        <Card title="Optional proof surfaces (when they ask 'how big can this get?')">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
            <Ghost href={links.investors} label="Open /investors" />
            <Ghost href={links.model} label="Open /investors/model" />
            <Ghost href={links.pricing} label="Open /pricing" />
            <Ghost href={links.sfPilot} label="Open /sf-pilot" />
            <Ghost href={links.onboarding} label="Open /onboarding" />
            <Ghost href={links.outreach} label="Open /outreach" />
            <Ghost href={links.demo} label="Open /demo" />
            <Ghost href={links.pilotPack} label="Open /pilot-pack/[venueId]" />
            <Ghost href={links.contact} label="Open /contact" />
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 18, fontSize: 12, color: "var(--muted)" }}>
        Tip: If someone asks “what’s the moat?” you answer: <b>policy + verification + audit + integrations</b>.
      </div>
    </Shell>
  );
}
