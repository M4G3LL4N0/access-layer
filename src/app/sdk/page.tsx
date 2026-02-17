export const dynamic = "force-dynamic";

const codeStyle: React.CSSProperties = {
  whiteSpace: "pre-wrap",
  background: "#0b0b0b",
  color: "#f2f2f2",
  padding: 14,
  borderRadius: 12,
  fontSize: 13,
  lineHeight: 1.5,
  overflowX: "auto",
};

export default function SDKPage() {
  return (
    <main style={{ padding: 28, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>AXW Hardware SDK (Demo)</h1>
      <p style={{ opacity: 0.8, maxWidth: 860 }}>
        This is how kiosks, scanners, parking gates, and access controllers integrate with AXW.
        Tokens are time-bounded, auditable, revocable, and can be verified statelessly at the edge.
      </p>

      <h2 style={{ marginTop: 24 }}>1) Issue a Signed Pass</h2>
      <div style={codeStyle}>
{`curl -X POST https://app.accessxworld.com/api/edge/issue \\
  -H "Content-Type: application/json" \\
  -d '{"venueId":"VENUE_ID","minutes":15}'`}
      </div>

      <h2 style={{ marginTop: 24 }}>2) Verify at the Edge (No DB required)</h2>
      <div style={codeStyle}>
{`curl -X POST https://app.accessxworld.com/api/edge/verify \\
  -H "Content-Type: application/json" \\
  -d '{"token":"PASTE_TOKEN_HERE"}'`}
      </div>

      <h2 style={{ marginTop: 24 }}>3) Verify with Device Identity (Recommended)</h2>
      <div style={codeStyle}>
{`curl -X POST https://app.accessxworld.com/api/device/verify \\
  -H "Content-Type: application/json" \\
  -H "X-Device-Key: DEVICE_KEY_FROM_ADMIN" \\
  -d '{"token":"PASTE_TOKEN_HERE"}'`}
      </div>

      <h2 style={{ marginTop: 24 }}>4) Revoke Instantly</h2>
      <div style={codeStyle}>
{`curl -X POST https://app.accessxworld.com/api/admin/revoke-token \\
  -H "Content-Type: application/json" \\
  -H "X-Admin-Seed-Token: YOUR_ADMIN_SEED_TOKEN" \\
  -d '{"token":"PASTE_TOKEN_HERE","reason":"abuse"}'`}
      </div>

      <h2 style={{ marginTop: 24 }}>5) Minimal JS Integration</h2>
      <div style={codeStyle}>
{`async function verify(token) {
  const res = await fetch("/api/edge/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });
  return await res.json(); // { allow: true|false, reason? }
}`}
      </div>

      <p style={{ marginTop: 18, opacity: 0.7 }}>
        Tip: Replace <b>VENUE_ID</b> with a real venue UUID from /venues.
      </p>
    </main>
  );
}
