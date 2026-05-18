import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

export default function V2Entrypoints() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111", minHeight: "100vh" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "42px 18px 80px" }}>
        <Top />
        <h1 style={{ fontSize: 36, letterSpacing: -0.8, margin: "18px 0 8px" }}>Entrypoints</h1>
        <p style={{ opacity: 0.82, lineHeight: 1.6, maxWidth: 900 }}>
          An <b>Entrypoint</b> is where verification occurs: door, gate arm, kiosk, turnstile, elevator reader, camera/LPR, intercom, staff device, or API edge.
          This is how AXW becomes universal across sectors.
        </p>

        <section style={card()}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Supported entrypoint types (V2)</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.9 }}>
            <li>Door / smart lock / controller</li>
            <li>Gate arm / parking kiosk / LPR camera</li>
            <li>Turnstile / front desk kiosk</li>
            <li>Elevator bank reader (floor permissions)</li>
            <li>Staff handheld verifier (QR/token)</li>
            <li>Edge API verifier (partner integration)</li>
          </ul>
        </section>

        <section style={{ ...card(), marginTop: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Next build</div>
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            We’ll add entrypoints as records tied to spaces, then enforce policies at verify time. Your existing kiosk + verify endpoints already prove the flow.
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2/policies" style={btnStrong()}>Policies →</Link>
            <Link href="/v2/credentials" style={btn()}>Credentials →</Link>
            <Link href="/v2/simulator" style={btn()}>Simulator →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Top() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontWeight: 900, fontSize: 18 }}>AXW 2.0 — Entrypoints</div>
        <div style={{ opacity: 0.7, fontSize: 13 }}>Universal verification surfaces.</div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/v2" style={btn()}>← V2 Home</Link>
        <Link href="/kiosk" style={btn()}>Kiosk</Link>
        <Link href="/verify" style={btn()}>Verify</Link>
      </div>
    </div>
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
