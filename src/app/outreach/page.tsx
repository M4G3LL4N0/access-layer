import { SubpageVisual } from "@/components/SubpageVisual";
export default function OutreachPage() {
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: any;
  }) => (
    <section
      style={{
        border: "1px solid rgba(0,0,0,.12)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        background: "rgba(255,255,255,.02)",
      }}
    >
      <div style={{ fontWeight: 1000, marginBottom: 8 }}>{title}</div>
      <div style={{ opacity: 0.9, lineHeight: 1.7 }}>{children}</div>
    </section>
  );

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <SubpageVisual variant="default" />
      <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 1000 }}>
        Outreach Playbook (SF Pilot)
      </h1>
      <p style={{ margin: "0 0 18px", opacity: 0.8, lineHeight: 1.6 }}>
        This is the “operator engine” to onboard venues fast: who to target, what to say,
        what to leave behind, and how to close pilots in under 7 days.
      </p>

      <Section title="Target list (SF wedge)">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li><b>Workspaces</b>: coworking, shared offices, small private suites.</li>
          <li><b>Cafes + venues</b>: restroom access, after-hours access controls.</li>
          <li><b>Property ops</b>: multi-tenant buildings, shared amenities.</li>
          <li><b>Clinics + service providers</b>: controlled rooms and staff workflows.</li>
        </ul>
      </Section>

      <Section title="Offer (pilot terms)">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li><b>7-day pilot</b> with one site + one workflow.</li>
          <li>We configure <b>rules + passes + staff verification</b>.</li>
          <li><b>No codes published</b>. Time-bounded pass tokens only.</li>
          <li>Deliver: pilot pack + signage + metrics snapshot.</li>
        </ul>
      </Section>

      <Section title="30-second opener (in person)">
        <div style={{ whiteSpace: "pre-wrap" }}>
{`“We’re building a neutral access layer between access and space.
Instead of sharing secrets, you define rules and we issue time-bounded passes.
Your staff can verify via QR/token, and everything is logged.
We can pilot this here in 7 days with almost no disruption.”`}
        </div>
      </Section>

      <Section title="Cold email (copy/paste)">
        <div style={{ whiteSpace: "pre-wrap" }}>
{`Subject: 7-day access pilot (no codes shared)

Hi {Name} —

I’m running a small SF pilot for AXW (Access × World): a policy-driven access layer that issues time-bounded passes (no secrets published), with verification + audit logs.

Pilot is 7 days:
• One location or workflow
• Rules + passes + staff verification
• Basic usage metrics snapshot

If you have 10 minutes, I can show the live demo and we can pick a workflow to pilot.

— {Your Name}
{Link to /demo}`}
        </div>
      </Section>

      <Section title="Text / DM script">
        <div style={{ whiteSpace: "pre-wrap" }}>
{`Quick question: do you ever need time-bounded access for a room/restroom/workspace
without sharing a permanent code? We’re piloting a rules→pass→verify system in SF.
Can I show you a 60-second demo?`}
        </div>
      </Section>

      <Section title="Close (pilot confirmation)">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Pick workflow + hours + caps (cooldown / max per day).</li>
          <li>Put up signage (QR to request page).</li>
          <li>Train 1 staff member on verify page.</li>
          <li>Run 7 days → review logs + outcomes → expand.</li>
        </ul>
      </Section>

      <div style={{ marginTop: 18, opacity: 0.8 }}>
        Links:{" "}
        <a href="/demo">/demo</a>{" "}
        · <a href="/onboarding">/onboarding</a>{" "}
        · <a href="/sf-pilot">/sf-pilot</a>{" "}
        · <a href="/investors/model">/investors/model</a>
      </div>
    </main>
  );
}
