export const dynamic = "force-dynamic";

import Link from "next/link";

export default function DemoPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: 0, fontSize: 36, fontWeight: 950 }}>Access ↔ Space Demo</h1>
      <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7, fontWeight: 650 }}>
        This MVP demonstrates a neutral “access layer” that issues time-limited passes
        under venue-defined rules. No codes published.
      </p>

      <section style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card title="1) Browse venues" desc="Public directory with map + search.">
          <Link href="/venues" style={btn}>Open directory →</Link>
        </Card>
        <Card title="2) Open a venue" desc="Venue page shows rules + request entry point.">
          <Link href="/venues" style={btn}>Pick a venue →</Link>
        </Card>
        <Card title="3) Request access" desc="Issues a pass if rules allow.">
          <Link href="/venues" style={btn}>Request from venue →</Link>
        </Card>
        <Card title="4) Show proof" desc="Pass token page proves a visitor was granted access in-window.">
          <Link href="/reports/sf" style={btn}>See pilot report →</Link>
        </Card>
      </section>

      <section style={{ marginTop: 18, padding: 16, borderRadius: 18, border: "1px solid var(--card-border)" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Investor links</h2>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/investors" style={pill}>Investor narrative →</Link>
          <Link href="/investors/model" style={pill}>Model & scenarios →</Link>
          <Link href="/reports/sf" style={pill}>SF pilot report →</Link>
          <Link href="/network" style={pill}>Network map →</Link>
        </div>
      </section>
    </main>
  );
}

function Card({ title, desc, children }: any) {
  return (
    <div style={{ padding: 16, borderRadius: 18, border: "1px solid var(--card-border)", background: "var(--card-bg)" }}>
      <div style={{ fontWeight: 950, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 6, opacity: 0.8, lineHeight: 1.6 }}>{desc}</div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  background: "black",
  color: "white",
  textDecoration: "none",
  fontWeight: 950,
};

const pill: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--card-border)",
  fontWeight: 900,
  textDecoration: "none",
};
