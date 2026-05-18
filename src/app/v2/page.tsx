import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#fff",
    color: "#111",
    minHeight: "100vh",
  },
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "56px 18px 80px" },
  top: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 16,
    padding: "10px 12px",
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#111",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
    letterSpacing: 0.5,
  },
  title: { fontSize: 42, letterSpacing: -1.1, margin: "22px 0 8px" },
  sub: { maxWidth: 920, opacity: 0.82, lineHeight: 1.6, margin: "0 0 18px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
    marginTop: 18,
  },
  card: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 18,
    padding: 16,
    background: "#fff",
  },
  cardTitle: { fontWeight: 900, marginBottom: 6 },
  cardSub: { opacity: 0.78, fontSize: 14, lineHeight: 1.5 },
  nav: { display: "flex", gap: 10, flexWrap: "wrap" },
  link: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 12px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.12)",
    textDecoration: "none",
    color: "inherit",
    fontWeight: 800,
  },
  linkPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 12px",
    borderRadius: 14,
    background: "#111",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
  },
  hr: { height: 1, background: "rgba(0,0,0,0.08)", margin: "18px 0" },
  small: { fontSize: 12, opacity: 0.65 },
};

function Pill({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={styles.link}>
      {label}
    </Link>
  );
}

export default function V2Home() {
  return (
    <main style={styles.page}>
      <SubpageVisual variant="default" />
      <div style={styles.wrap}>
        <div style={styles.top}>
          <div style={styles.badge}>
            <div style={styles.logo}>AXW</div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 900 }}>AXW 2.0</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Universal Access × Space Control Center</div>
            </div>
          </div>

          <div style={styles.nav}>
            <Link href="/" style={styles.link}>Home</Link>
            <Link href="/investors" style={styles.link}>Investors</Link>
            <Link href="/venues" style={styles.link}>Directory</Link>
            <Link href="/admin" style={styles.link}>Admin</Link>
            <Link href="/kiosk" style={styles.link}>Kiosk</Link>
          </div>
        </div>

        <h1 style={styles.title}>Universal primitives for every space.</h1>
        <p style={styles.sub}>
          AXW 2.0 models <b>Spaces</b>, <b>Entrypoints</b>, <b>Credentials</b>, and <b>Policies</b> the same way across every sector:
          venues, offices, parking, campuses, logistics, government, storage, and beyond.
          This becomes the “coordination layer” between access and physical space.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/v2/simulator" style={styles.linkPrimary}>Open Simulator</Link>
          <Link href="/v2/sectors" style={styles.link}>Explore Sectors</Link>
          <Link href="/contact" style={styles.link}>Request a Pilot</Link>
        </div>

        <div style={styles.hr} />

        <div style={styles.grid}>
          <section style={styles.card}>
            <div style={styles.cardTitle}>Spaces</div>
            <div style={styles.cardSub}>A universal “thing you access”: building, floor, garage, unit, lab, venue, dock.</div>
            <div style={{ marginTop: 12 }}>
              <Pill href="/v2/spaces" label="Manage spaces →" />
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.cardTitle}>Entrypoints</div>
            <div style={styles.cardSub}>Door, gate, turnstile, elevator reader, kiosk, camera, intercom, API edge.</div>
            <div style={{ marginTop: 12 }}>
              <Pill href="/v2/entrypoints" label="Manage entrypoints →" />
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.cardTitle}>Policies</div>
            <div style={styles.cardSub}>Rules: time windows, rate limits, role rules, payments, staff override, audit.</div>
            <div style={{ marginTop: 12 }}>
              <Pill href="/v2/policies" label="Build policies →" />
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.cardTitle}>Credentials</div>
            <div style={styles.cardSub}>Tokens/QR, license plates, NFC badges, PINs, device keys, staff approvals.</div>
            <div style={{ marginTop: 12 }}>
              <Pill href="/v2/credentials" label="Manage credentials →" />
            </div>
          </section>
        </div>

        <div style={styles.hr} />

        <section style={styles.card}>
          <div style={styles.cardTitle}>Blitz path</div>
          <div style={styles.cardSub}>
            1) Simulator demo → 2) One pilot workflow (parking or staff access) → 3) Expand entrypoints + policies → 4) Multi-site rollout → 5) Enterprise integrations.
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Pill href="/case-studies/sf-pilot" label="SF pilot case study" />
            <Pill href="/investors/model" label="Investor model" />
            <Pill href="/vc/packet" label="VC packet" />
            <Pill href="/outreach" label="Outreach" />
          </div>
        </section>

        <div style={{ marginTop: 18, ...styles.small }}>
          Tip: This is a new additive surface. We will wire these screens to Supabase tables next, without breaking your existing app.
        </div>
      </div>
    </main>
  );
}
