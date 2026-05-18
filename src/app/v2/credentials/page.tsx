import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

export default function V2Credentials() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111", minHeight: "100vh" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "42px 18px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>AXW 2.0 — Credentials</div>
            <div style={{ opacity: 0.7, fontSize: 13 }}>Anything a person/device presents for access.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2" style={btn()}>← V2 Home</Link>
            <Link href="/verify" style={btn()}>Verify</Link>
            <Link href="/kiosk" style={btn()}>Kiosk</Link>
            <Link href="/solutions/parking" style={btn()}>Parking</Link>
          </div>
        </div>

        <h1 style={{ fontSize: 36, letterSpacing: -0.8, margin: "18px 0 8px" }}>Credentials</h1>
        <p style={{ opacity: 0.82, lineHeight: 1.6, maxWidth: 900 }}>
          V1 already supports tokenized passes (QR/links). V2 expands credentials to include license plates, badges, PINs, device keys, and staff approvals.
        </p>

        <section style={card()}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Credential types</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.9 }}>
            <li><b>Access token</b> (QR/link) — already working</li>
            <li><b>Parking token</b> — already working</li>
            <li><b>License plate</b> (LPR/kiosk validation)</li>
            <li><b>NFC badge</b> / mobile wallet pass</li>
            <li><b>PIN</b> / keypad code (never publicly published)</li>
            <li><b>Device key</b> (hardware verifier)</li>
          </ul>
        </section>

        <section style={{ ...card(), marginTop: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Next build</div>
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            We add a “Plate Validation” credential that maps a plate → short-lived grant (2 hours) and logs every verification.
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2/simulator" style={btnStrong()}>Simulator →</Link>
            <Link href="/v2/sectors" style={btn()}>Sectors →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function btn(): React.CSSProperties {
  return { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", color: "inherit", fontWeight: 800, background: "#fff" };
}
function btnStrong(): React.CSSProperties {
  return { ...btn(), background: "#111", color: "#fff", border: "1px solid #111", fontWeight: 900 };
}
function card(): React.CSSProperties {
  return { border: "1px solid rgba(0,0,0,0.10)", borderRadius: 18, padding: 16, background: "#fff" };
}
