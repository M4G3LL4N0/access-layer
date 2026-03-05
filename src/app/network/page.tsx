import MarketingShell from "@/components/MarketingShell";

export const dynamic = "force-static";

const BUILD_STAMP = "NETWORK_OK_2026-02-26_1907PST";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 18, padding: 16, background: "white" }}>
      <div style={{ fontSize: 12, color: "#666", fontWeight: 800 }}>{label}</div>
      <div style={{ marginTop: 8, fontSize: 22, fontWeight: 900, letterSpacing: -0.3 }}>{value}</div>
    </div>
  );
}

function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        borderRadius: 999,
        border: "1px solid #e6e6e6",
        background: "white",
        textDecoration: "none",
        color: "black",
        fontWeight: 900,
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

export default function NetworkPage() {
  return (
    <MarketingShell>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 12, color: "#666", fontWeight: 900, letterSpacing: 1 }}>AXW NETWORK</div>
          <h1 style={{ margin: "8px 0 0", fontSize: 44, letterSpacing: -0.9 }}>Network</h1>
          <p style={{ marginTop: 10, color: "#333", lineHeight: 1.6, fontSize: 16, maxWidth: 780 }}>
            This is where the compounding happens: more spaces onboarded → more credentials useful → more demand → stronger enforcement.
            Next step is wiring topology + live metrics from Supabase.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button href="/venues">Venues</Button>
          <Button href="/analytics">Analytics</Button>
          <Button href="/admin">Admin</Button>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <Stat label="Routing" value="OK" />
        <Stat label="Render" value="OK" />
        <Stat label="Data" value="Not connected" />
        <Stat label="Next" value="Wire topology" />
      </div>

      <div style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 18, padding: 16, background: "linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)" }}>
        <div style={{ fontWeight: 900, fontSize: 14 }}>Build stamp</div>
        <div style={{ marginTop: 8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace", fontSize: 12, color: "#333" }}>
          {BUILD_STAMP}
        </div>
      </div>
    </MarketingShell>
  );
}
