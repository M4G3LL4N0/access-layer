import { SubpageVisual } from "@/components/SubpageVisual";
export default function VcTourPage() {
  const venueId = "0fc330aa-5c3d-4f7f-a74f-7de10c2b56b6"; // Mission Workspace sample venue (exists in your Supabase list)

  const links = {
    home: "/",
    venues: "/venues",
    venue: `/v/${venueId}`,
    request: `/request/${venueId}`,
    pilotPack: `/pilot-pack/${venueId}`,
    verify: "/verify",
    demo: "/demo",
    investors: "/investors",
    model: "/investors/model",
    pricing: "/pricing",
    onboarding: "/onboarding",
    sfPilot: "/sf-pilot",
    outreach: "/outreach",
    press: "/press",
    contact: "/contact",
    admin: "/admin",
    adminLeads: "/admin/leads",
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
          --muted:rgba(11,15,25,.68);
          --border:rgba(11,15,25,.12);
          --card:#ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06);
          --pill: rgba(11,15,25,.08);
          --btn:#0b0f19;
          --btnFg:#ffffff;
          --accent:#2563eb;
          --soft: rgba(11,15,25,.06);
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg:#070a12;
            --fg:#eef1f7;
            --muted:rgba(238,241,247,.72);
            --border:rgba(238,241,247,.14);
            --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.40);
            --pill: rgba(238,241,247,.10);
            --btn:#ffffff;
            --btnFg:#070a12;
            --accent:#60a5fa;
            --soft: rgba(238,241,247,.08);
          }
        }
        *{ box-sizing:border-box; }
        a{ color:inherit; }
        html{ scroll-behavior:smooth; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 20px" }}>
        {children}
      </div>
    </main>
  );

  const Pill = ({ children }: { children: any }) => (
    <span
      style={{
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        background: "var(--pill)",
        border: "1px solid var(--border)",
        color: "var(--muted)",
        fontWeight: 900,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );

  const Button = ({
    href,
    label,
    variant = "solid",
    note,
  }: {
    href: string;
    label: string;
    variant?: "solid" | "outline";
    note?: string;
  }) => {
    const style: any = {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      alignItems: "center",
      textDecoration: "none",
      borderRadius: 14,
      padding: "12px 14px",
      border: "1px solid var(--border)",
      fontWeight: 1000,
      background: variant === "solid" ? "var(--btn)" : "var(--card)",
      color: variant === "solid" ? "var(--btnFg)" : "var(--fg)",
    };

    return (
      <a href={href} style={style}>
        <span>{label}</span>
        <span style={{ opacity: 0.75, fontWeight: 900 }}>
          {note ? note : "Open →"}
        </span>
      </a>
    );
  };

  const Card = ({
    title,
    children,
  }: {
    title: string;
    children: any;
  }) => (
    <section
      style={{
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 16,
        background: "var(--card)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div style={{ fontWeight: 1100, letterSpacing: -0.2, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>{children}</div>
    </section>
  );

  const H2 = ({ id, children }: { id?: string; children: any }) => (
    <h2
      id={id}
      style={{
        margin: "28px 0 12px",
        fontSize: 26,
        letterSpacing: -0.4,
      }}
    >
      {children}
    </h2>
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
      {/* Top */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/favicon.ico"
            alt="AXW"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 1100 }}>AXW</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              VC Tour • live proof surfaces
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#tour" style={{ textDecoration: "none", opacity: 0.9 }}>
            Tour
          </a>
          <a href="#pitch" style={{ textDecoration: "none", opacity: 0.9 }}>
            Pitch
          </a>
          <a href="#numbers" style={{ textDecoration: "none", opacity: 0.9 }}>
            Numbers
          </a>
          <a href="#assets" style={{ textDecoration: "none", opacity: 0.9 }}>
            Assets
          </a>
        </nav>
      </header>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <Pill>No codes published</Pill>
        <Pill>Rules → passes → verify</Pill>
        <Pill>Cooldown + caps</Pill>
        <Pill>Audit logs</Pill>
        <Pill>SF pilot-ready</Pill>
      </div>

      <h1
        style={{
          fontSize: 48,
          letterSpacing: -1.1,
          margin: "0 0 10px",
          lineHeight: 1.05,
        }}
      >
        AXW VC Tour
      </h1>

      <p style={{ margin: 0, color: "var(--muted)", maxWidth: 960, lineHeight: 1.65 }}>
        This page is designed so you can run the entire investor meeting from one place:
        live click-path, 60-second narrative, 5-minute narrative, and “what’s built” surfaces.
      </p>

      {/* TOUR */}
      <H2 id="tour">1-minute live tour (click in order)</H2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="A) Show the marketplace (venues + map)">
          <div style={{ marginBottom: 10 }}>
            This proves it’s not slides — it’s a real directory + geo map + filtering.
          </div>
          <Button href={links.venues} label="Open /venues" variant="solid" />
        </Card>

        <Card title="B) Open a venue (the unit of value)">
          <div style={{ marginBottom: 10 }}>
            Venue page shows rules + “request access” entry.
          </div>
          <Button href={links.venue} label={`Open venue /v/${venueId}`} variant="solid" />
        </Card>

        <Card title="C) Request access (issues a time-bounded pass)">
          <div style={{ marginBottom: 10 }}>
            This creates a pass token (no codes shown). Rate limits enforced.
          </div>
          <Button href={links.request} label={`Open request /request/${venueId}`} variant="solid" />
        </Card>

        <Card title="D) Verify pass (staff-facing)">
          <div style={{ marginBottom: 10 }}>
            Staff pastes token or scans QR to confirm validity (active + not expired).
          </div>
          <Button href={links.verify} label="Open /verify" variant="solid" />
        </Card>
      </div>

      <div style={{ marginTop: 12 }}>
        <Card title="Bonus: Pilot Pack (venue-ready onboarding packet)">
          <div style={{ marginBottom: 10 }}>
            This is what you send a venue operator. It includes links, steps, signage references, and operational checklist.
          </div>
          <Button href={links.pilotPack} label="Open /pilot-pack/[venueId]" variant="outline" note="Pilot pack →" />
        </Card>
      </div>

      {/* PITCH */}
      <H2 id="pitch">Narrative you speak while clicking</H2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="60-second pitch (tight)">
          <Mono>{`AXW is the coordination layer between access and space.

Instead of sharing codes (shared secrets), venues define rules.
We issue time-bounded passes (tokens), staff verifies them, and everything is logged.

The wedge is simple:
start with one SF venue/workflow, prove value fast,
then expand into multi-site ops, property management, and integrations.

This is built live:
directory → venue rules → request pass → verify token.`}</Mono>
        </Card>

        <Card title="5-minute pitch (deeper)">
          <Mono>{`Problem:
Access is often implemented as shared secrets (codes) with no policy, no audit, and messy disputes.

Solution:
Make access a policy object.
Rules define who/when/how often. Passes are time-scoped and verifiable without revealing secrets.
Logs create accountability.

Wedge:
SF pilot with a few venues + workspaces.
Show reduced friction, fewer disputes, measurable usage, and controllable access.

Expansion:
Multi-site operators → property ops → controllers + booking + enterprise workflows.
The network grows as venues adopt a common access primitive.

Business:
Owner subscription for controls + analytics + verification + integrations.
Optional paid access for non-patrons where appropriate (venue-configurable).`}</Mono>
        </Card>
      </div>

      {/* NUMBERS */}
      <H2 id="numbers">Numbers + model surfaces (click)</H2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Investor narrative page">
          <div style={{ marginBottom: 10 }}>
            Platform story: wedge → expansion → integrations → network effects.
          </div>
          <Button href={links.investors} label="Open /investors" variant="outline" />
        </Card>

        <Card title="Interactive model (sliders)">
          <div style={{ marginBottom: 10 }}>
            Use this live: toggle scenarios + show “if adoption → revenue scale.”
          </div>
          <Button href={links.model} label="Open /investors/model" variant="outline" />
        </Card>

        <Card title="Pricing surface">
          <div style={{ marginBottom: 10 }}>
            Simple conversion path (pilot → paid owner controls).
          </div>
          <Button href={links.pricing} label="Open /pricing" variant="outline" />
        </Card>
      </div>

      {/* ASSETS */}
      <H2 id="assets">Operator assets (what you send partners)</H2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Onboarding page">
          <div style={{ marginBottom: 10 }}>
            The venue-facing onboarding flow you can share right now.
          </div>
          <Button href={links.onboarding} label="Open /onboarding" variant="outline" />
        </Card>

        <Card title="SF pilot plan">
          <div style={{ marginBottom: 10 }}>
            Your SF narrative + operator plan + proof story.
          </div>
          <Button href={links.sfPilot} label="Open /sf-pilot" variant="outline" />
        </Card>

        <Card title="Outreach playbook">
          <div style={{ marginBottom: 10 }}>
            Scripts + offer + targeting list format + close steps.
          </div>
          <Button href={links.outreach} label="Open /outreach" variant="outline" />
        </Card>

        <Card title="Press / one-pager">
          <div style={{ marginBottom: 10 }}>
            Media + investor one-page summary.
          </div>
          <Button href={links.press} label="Open /press" variant="outline" />
        </Card>
      </div>

      {/* Screenshots placeholders */}
      <H2>Screenshots (placeholders you can fill later)</H2>
      <Card title="Drop-in targets">
        <div style={{ marginBottom: 12 }}>
          If you want the VC page to look even more “shippable”, add screenshots later as:
          <b> /public/vc/venues.png</b>, <b>/public/vc/venue.png</b>, <b>/public/vc/request.png</b>, <b>/public/vc/verify.png</b>.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 10,
          }}
        >
          {[
            { label: "Directory", src: "/vc/venues.png" },
            { label: "Venue", src: "/vc/venue.png" },
            { label: "Request", src: "/vc/request.png" },
            { label: "Verify", src: "/vc/verify.png" },
          ].map((img) => (
            <div
              key={img.label}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: 10,
                background: "var(--card)",
              }}
            >
              <div style={{ fontWeight: 1000, marginBottom: 8 }}>{img.label}</div>
              <div
                style={{
                  height: 140,
                  borderRadius: 12,
                  border: "1px dashed var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  fontSize: 12,
                  padding: 10,
                  textAlign: "center",
                }}
              >
                Placeholder: {img.src}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <div style={{ marginTop: 20, fontSize: 12, color: "var(--muted)" }}>
        Quick nav:{" "}
        <a href={links.home} style={{ textDecoration: "underline" }}>home</a>{" "}
        · <a href={links.venues} style={{ textDecoration: "underline" }}>venues</a>{" "}
        · <a href={links.demo} style={{ textDecoration: "underline" }}>demo</a>{" "}
        · <a href={links.investors} style={{ textDecoration: "underline" }}>investors</a>{" "}
        · <a href={links.contact} style={{ textDecoration: "underline" }}>contact</a>
      </div>
    </Shell>
  );
}
