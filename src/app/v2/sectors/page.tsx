import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

const SECTORS = [
  { k: "Parking & garages", desc: "Plate validation, kiosk tokens, LPR verification, operator dashboards." },
  { k: "Venues & events", desc: "Guest passes, staff verify, vendor access windows, audit logs." },
  { k: "Offices & co-working", desc: "Member access, visitor flows, meeting-room entrypoints, elevator integration." },
  { k: "Campuses", desc: "Zone-based permissions, building hierarchies, time-based student/vendor policies." },
  { k: "Logistics", desc: "Dock appointments, driver verification, yard gates, timed access." },
  { k: "Government", desc: "Compliance logging, strict policy enforcement, role-based approvals." },
  { k: "Storage & facilities", desc: "Unit access windows, maintenance workflows, exception handling." },
];

export default function V2Sectors() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#111", minHeight: "100vh" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "42px 18px 90px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>AXW 2.0 — Sectors</div>
            <div style={{ opacity: 0.7, fontSize: 13 }}>How AXW becomes universal across the economy.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2" style={btn()}>← V2 Home</Link>
            <Link href="/investors" style={btn()}>Investors</Link>
            <Link href="/contact" style={btn()}>Pilot</Link>
          </div>
        </div>

        <h1 style={{ fontSize: 40, letterSpacing: -1.0, margin: "18px 0 8px" }}>Every sector. Same primitives.</h1>
        <p style={{ opacity: 0.82, lineHeight: 1.6, maxWidth: 980 }}>
          The wedge is simple: pick one workflow (parking validation, staff access, vendor access), prove value fast,
          then expand to more entrypoints and more spaces. Same engine. Same logs. Same economics.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginTop: 16 }}>
          {SECTORS.map((s) => (
            <section key={s.k} style={card()}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{s.k}</div>
              <div style={{ opacity: 0.8, lineHeight: 1.5, fontSize: 14 }}>{s.desc}</div>
            </section>
          ))}
        </div>

        <section style={{ ...card(), marginTop: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Next build</div>
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            We’ll add “Sector templates” that generate starter policies + entrypoints + default verification workflows per sector.
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/v2/simulator" style={btnStrong()}>Open Simulator →</Link>
            <Link href="/solutions/parking" style={btn()}>Parking solution page →</Link>
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
