export const dynamic = "force-dynamic";

import Link from "next/link";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 1000, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 10, lineHeight: 1.6, color: "#111" }}>{children}</div>
    </section>
  );
}

function CodeBox({ text }: { text: string }) {
  return (
    <pre
      style={{
        marginTop: 10,
        whiteSpace: "pre-wrap",
        background: "#0b0b0e",
        color: "#f8fafc",
        padding: 14,
        borderRadius: 14,
        border: "1px solid #111",
        overflow: "auto",
        fontSize: 13,
      }}
    >
      {text}
    </pre>
  );
}

export default function OutreachPage() {
  const dm = `Hey — quick note. We’re piloting Access ↔ Space in SF.

If a customer needs access (restroom / workspace / office area) and staff is busy, we issue a time-limited “access pass” (no codes published). Staff can verify in 5 seconds.

Want a free pilot? I can set up your location in <5 minutes and you’ll get:
• QR signage
• rate limits / hours / rules
• staff verifier page
• basic usage metrics

Reply with the venue name + neighborhood and I’ll send your pilot links.`;

  const email = `Subject: Free SF Pilot — time-limited access passes (no codes)

Hi [Name],

We’re running an SF pilot called Access ↔ Space. When staff is busy, patrons can request a time-limited access pass (no codes published). Staff verifies quickly on a phone.

Pilot includes:
• QR signage (front desk + door)
• configurable hours/rules + rate limits
• staff verify page
• basic usage metrics

If you’re open, reply with:
1) venue name
2) neighborhood
3) what space (restroom / workspace / office)

I’ll set it up in <5 minutes and send links.

Thanks,
[Your Name]`;

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", background: "#f6f7fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 1000 }}>Outreach Engine</h1>
            <p style={{ marginTop: 6, opacity: 0.75 }}>
              7-day plan to onboard SF venues fast (Hayes, Mission, SOMA first).
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/venues" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Public Directory →
            </Link>
            <Link href="/contact" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Lead Form →
            </Link>
            <Link href="/admin/leads" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Admin Leads →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 18, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <Block title="Targets (start here)">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Cafes with restrooms (Hayes Valley)</li>
              <li>Coworking / study spaces (Mission)</li>
              <li>Small offices / studios (SOMA)</li>
              <li>Gyms / boutique fitness</li>
              <li>Community orgs / galleries</li>
            </ul>
            <div style={{ marginTop: 10, opacity: 0.75 }}>
              Goal: onboard <b>5 venues</b> in week 1 with public pilot pages + signage.
            </div>
          </Block>

          <Block title="Daily cadence (do this every day)">
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              <li>Build a list of 25 venues (Google Maps/Yelp)</li>
              <li>Send 15 DMs + 10 emails</li>
              <li>Convert 1 lead → venue in admin</li>
              <li>Generate signage + send pilot pack</li>
              <li>Ask for 1 intro to another venue</li>
            </ol>
          </Block>

          <Block title="DM script (copy/paste)">
            <CodeBox text={dm} />
          </Block>

          <Block title="Email template (copy/paste)">
            <CodeBox text={email} />
          </Block>
        </div>

        <div style={{ marginTop: 14, opacity: 0.75 }}>
          Next: run outreach → convert leads → send pilot pack → track metrics.
        </div>
      </div>
    </main>
  );
}
