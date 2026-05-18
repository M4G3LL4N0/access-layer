import { SubpageVisual } from "@/components/SubpageVisual";
export const dynamic = "force-dynamic";

export default function CrmTemplatesPage() {
  const Box = ({ title, text }: { title: string; text: string }) => (
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
        {text}
      </pre>
    </section>
  );

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <SubpageVisual variant="default" />
      <style>{`
        :root{
          --bg:#ffffff; --fg:#0b0f19; --muted:rgba(11,15,25,.70);
          --border:rgba(11,15,25,.12); --card:#ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06); --soft: rgba(11,15,25,.06);
          --btn:#0b0f19; --btnFg:#ffffff;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg:#070a12; --fg:#eef1f7; --muted:rgba(238,241,247,.72);
            --border:rgba(238,241,247,.14); --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.40); --soft: rgba(238,241,247,.08);
            --btn:#ffffff; --btnFg:#070a12;
          }
        }
        body{ background:var(--bg); color:var(--fg); }
        a{ color: inherit; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px 20px", background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>AXW • CRM</div>
            <h1 style={{ margin: "6px 0 0", fontSize: 40, letterSpacing: -1 }}>Outreach Templates</h1>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 920 }}>
              Copy/paste scripts for venue ops. Keep it short, book the pilot, ship the pilot pack.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignSelf: "flex-start" }}>
            <a href="/crm/leads" style={{ textDecoration: "none", fontWeight: 1100, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)" }}>
              Open /crm/leads
            </a>
            <a href="/pilot-pack/0fc330aa-5c3d-4f7f-a74f-7de10c2b56b6" style={{ textDecoration: "none", fontWeight: 1100, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--btn)", color: "var(--btnFg)" }}>
              Open a Pilot Pack →
            </a>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12, marginTop: 16 }}>
          <Box
            title="Email (cold) — 3 sentences"
            text={`Subject: 7-day pilot: timed access passes (no codes)

Hi — we’re running an SF pilot that replaces shared door/bathroom codes with time-bounded access passes (policy rules + audit log). 
It takes ~15 minutes to set up for one location and staff verifies passes from a simple page.
If I send the pilot pack, can we do a 10-minute call this week?`}
          />

          <Box
            title="SMS (after no response)"
            text={`Hey — quick follow-up. We’re piloting timed access passes (no codes) + verification for SF venues/workspaces.
If I send a 1-page pilot pack, are you open to trying it at 1 location for 7 days?`}
          />

          <Box
            title="DM (Instagram / LinkedIn)"
            text={`Quick one: we’re piloting a “policy + pass + verify” layer for venue access (no codes published).
It’s a 7-day trial at one location. Want the pilot pack?`}
          />

          <Box
            title="Objection: “We already have a keypad / staff / keys”"
            text={`Totally — we don’t replace your hardware at first. 
We start as a coordination + verification layer: rules, time windows, caps, and an audit trail.
If it proves value, we can integrate deeper later. The pilot is “zero disruption.”`}
          />

          <Box
            title="Close (book it)"
            text={`If you’re open: we’ll set a single rule (hours + limit), give you a staff verify page, and run it for 7 days.
What’s the best email to send the pilot pack to?`}
          />
        </div>
      </div>
    </main>
  );
}
