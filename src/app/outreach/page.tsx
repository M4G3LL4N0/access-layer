export const dynamic = "force-dynamic";

function Box({ title, children }: { title: string; children: any }) {
  return (
    <div
      style={{
        marginTop: 14,
        padding: 16,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 8 }}>{title}</div>
      <div style={{ opacity: 0.9, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export default function OutreachPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "system-ui",
        background: "#0b0f17",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900 }}>SF Outreach Kit</h1>
        <p style={{ marginTop: 10, opacity: 0.85 }}>
          Copy/paste scripts and templates to onboard venues this week.
        </p>

        <Box title="30-second owner pitch (in person)">
          “We don’t publish codes. We issue <b>time-limited access passes</b> with rules you control —
          hours, cooldown, max/day. It reduces staff interruptions and gives you analytics. We can pilot
          it here in 10 minutes with a QR sign and a staff verify page.”
        </Box>

        <Box title="What to ask for (minimum)">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Permission to place a QR sign at the access point</li>
            <li>Preferred hours and rules (cooldown, max/day)</li>
            <li>A staff contact for quick verification testing</li>
          </ul>
        </Box>

        <Box title="Objection handling">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>
              <b>“Will this bring the wrong people?”</b> → “Rules + throttles + verification + logs.
              You can disable instantly.”
            </li>
            <li>
              <b>“We already have a system.”</b> → “Great — we layer on top. No hardware changes required.”
            </li>
            <li>
              <b>“We don’t want public codes.”</b> → “Same. No codes. Passes only.”
            </li>
            <li>
              <b>“What’s the cost?”</b> → “Pilot is free. Paid tier is analytics + advanced controls.”
            </li>
          </ul>
        </Box>

        <Box title="Cold email (owner)">
          <div style={{ opacity: 0.9 }}>
            <div style={{ fontWeight: 900 }}>Subject:</div>
            Free SF pilot — controlled access passes (no code publishing)
            <br />
            <br />
            Hi [Name],
            <br />
            We’re piloting AccessXWorld in SF — a rule-based access layer that issues time-limited
            passes instead of publishing codes. You control hours/cooldown/max/day, and staff can
            verify passes on a simple page. No hardware.
            <br />
            <br />
            If you’re open, we can set this up in ~10 minutes and leave a QR sign for patrons.
            <br />
            <br />— AccessXWorld
          </div>
        </Box>

        <Box title="Cold DM (short)">
          “Quick question—do you manage this location? We’re running a free SF pilot for time-limited
          access passes (no codes), with rules you control. Setup takes 10 minutes. Want details?”
        </Box>

        <Box title="7-day SF target plan">
          Day 1–2: Hayes Valley cafés → Day 3: Mission coworking → Day 4: SOMA offices → Day 5: gyms →
          Day 6–7: event spaces + galleries.
        </Box>

        <Box title="Your next ask (close)">
          “If you’re open to a pilot, I’ll generate a QR sign + staff verify page and we’ll set rules
          together. If you hate it, you can disable it instantly.”
        </Box>
      </div>
    </main>
  );
}
