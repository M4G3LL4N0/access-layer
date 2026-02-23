export const metadata = {
  title: "AXW SDK",
  description: "Integrate programmable access into devices, kiosks, and operators.",
};

const Code = ({ children }: { children: string }) => (
  <pre
    style={{
      background: "#0b1020",
      color: "#d7e0ff",
      padding: 14,
      borderRadius: 14,
      overflowX: "auto",
      fontSize: 13,
      lineHeight: 1.5,
      border: "1px solid rgba(255,255,255,0.08)",
      margin: "12px 0 18px",
    }}
  >
    <code>{children}</code>
  </pre>
);

export default function SDKPage() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22 }}>AXW SDK</div>
            <div style={{ opacity: 0.72 }}>Device + kiosk + operator integrations (edge verification, tokens, audit logs).</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/api-docs" style={{ textDecoration: "none", fontWeight: 800, color: "#111", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 12, padding: "10px 12px" }}>
              API Docs
            </a>
            <a href="/investors" style={{ textDecoration: "none", fontWeight: 800, color: "#fff", background: "#111", borderRadius: 12, padding: "10px 12px" }}>
              Investor Deck
            </a>
          </div>
        </div>

        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {[
            { t: "Issue a pass", d: "Kiosk or staff issuance with expiry + scope." },
            { t: "Verify at the edge", d: "Operators and devices verify tokens in real time." },
            { t: "Log every event", d: "Audit logs for compliance + dispute resolution." },
            { t: "Universal access points", d: "Doors, garages, gates, turnstiles, elevators, wifi, APIs." },
          ].map((x) => (
            <div key={x.t} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 900 }}>{x.t}</div>
              <div style={{ opacity: 0.78, marginTop: 6, fontSize: 14 }}>{x.d}</div>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 34, fontSize: 18 }}>Core endpoints</h2>

        <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Edge verify</div>
          <div style={{ opacity: 0.75, fontSize: 14, marginTop: 6 }}>Use this from devices / operators to validate tokens.</div>
          <Code>{`GET /api/verify?token=TOKEN_HERE`}</Code>

          <div style={{ fontWeight: 900 }}>Kiosk issue</div>
          <div style={{ opacity: 0.75, fontSize: 14, marginTop: 6 }}>Issue a short-lived access pass from a kiosk UI.</div>
          <Code>{`POST /api/kiosk/issue-pass
{ "venueId": "VENUE_UUID", "minutes": 15 }`}</Code>

          <div style={{ fontWeight: 900 }}>Parking issue + verify</div>
          <div style={{ opacity: 0.75, fontSize: 14, marginTop: 6 }}>Retail validation style (token / plate / expiry).</div>
          <Code>{`POST /api/parking/issue
{ "venueId": "VENUE_UUID", "minutes": 120 }

GET /api/parking/verify?token=PARKING_TOKEN`}</Code>
        </div>

        <div style={{ marginTop: 22, opacity: 0.7, fontSize: 13 }}>
          Next: device keys + signed tokens + per-access-point policy enforcement.
        </div>
      </div>
    </main>
  );
}
