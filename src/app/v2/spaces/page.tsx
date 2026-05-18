import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

export default function V2Spaces() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111", minHeight: "100vh" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "42px 18px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>AXW 2.0 — Spaces</div>
            <div style={{ opacity: 0.7, fontSize: 13 }}>Universal model: every thing you can access.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2" style={btn()}>← V2 Home</Link>
            <Link href="/venues" style={btn()}>Directory</Link>
            <Link href="/contact" style={btn()}>Pilot</Link>
          </div>
        </div>

        <h1 style={{ fontSize: 36, letterSpacing: -0.8, margin: "18px 0 8px" }}>Spaces</h1>
        <p style={{ opacity: 0.82, lineHeight: 1.6, maxWidth: 900 }}>
          A <b>Space</b> can be a venue, office, garage, building, unit, floor, lab, storage cage, loading dock, campus zone — anything that can be granted and verified.
          Next step: we’ll wire this page to a new <code>spaces</code> table that can map 1:N to your existing <code>venues</code>.
        </p>

        <section style={card()}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>V2 data fields (planned)</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.9 }}>
            <li><b>space_id</b> (uuid)</li>
            <li><b>type</b> (venue / office / parking / campus / logistics / gov / storage / other)</li>
            <li><b>name</b>, <b>address</b>, <b>geo</b></li>
            <li><b>parent_space_id</b> (hierarchy: campus → building → floor → room)</li>
            <li><b>status</b> (active / paused / archived)</li>
          </ul>
        </section>

        <section style={{ ...card(), marginTop: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Next build</div>
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            We add a “Create Space” flow (admin-only), then bind entrypoints and policies to spaces. Nothing breaks; it’s additive.
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2/entrypoints" style={btnStrong()}>Entrypoints →</Link>
            <Link href="/v2/policies" style={btn()}>Policies →</Link>
            <Link href="/v2/simulator" style={btn()}>Simulator →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function btn(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 12px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.12)",
    textDecoration: "none",
    color: "inherit",
    fontWeight: 800,
    background: "#fff",
  };
}
function btnStrong(): React.CSSProperties {
  return { ...btn(), background: "#111", color: "#fff", border: "1px solid #111", fontWeight: 900 };
}
function card(): React.CSSProperties {
  return { border: "1px solid rgba(0,0,0,0.10)", borderRadius: 18, padding: 16, background: "#fff" };
}
