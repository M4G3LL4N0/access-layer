export const dynamic = "force-static";

const BUILD_STAMP = "NETWORK_OK_2026-02-26_1907PST";

export default function NetworkPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 54px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 12, letterSpacing: 0.6, color: "#666", textTransform: "uppercase" }}>AXW Network</div>
            <h1 style={{ fontSize: 44, margin: "8px 0 0", lineHeight: 1.05 }}>Network</h1>
            <p style={{ marginTop: 10, color: "#444", lineHeight: 1.55, maxWidth: 760 }}>
              Real-time coordination layer status. Next step: connect Supabase-backed topology + live metrics across venues,
              devices, and passes.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Pill label="Status" value="ONLINE" tone="ok" />
            <a href="/venues" style={btn}>
              Venues
            </a>
            <a href="/analytics" style={btn}>
              Analytics
            </a>
            <a href="/admin" style={btn}>
              Admin
            </a>
          </div>
        </div>

        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 14 }}>
          <Panel title="Core Systems" subtitle="Health checks for rendering, routing, and data connectivity.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              <Metric title="Routing" value="OK" hint="Edge + app router responding" />
              <Metric title="Render" value="OK" hint="Server components rendering" />
              <Metric title="Data" value="Not connected" hint="Wire Supabase topology + events" />
              <Metric title="Next" value="Wire topology" hint="Topology table + live metrics pipeline" />
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="/api/health" style={chip}>
                /api/health
              </a>
              <a href="/api/debug/env" style={chip}>
                /api/debug/env
              </a>
              <a href="/api/debug/venues" style={chip}>
                /api/debug/venues
              </a>
              <a href="/api/metrics/global" style={chip}>
                /api/metrics/global
              </a>
            </div>
          </Panel>

          <Panel title="Live Network Activity" subtitle="Placeholder stream. We’ll hook this to Supabase realtime.">
            <div style={activityBox}>
              <ActivityRow k="Edge" v="ready" />
              <ActivityRow k="Tokens" v="issuer online" />
              <ActivityRow k="Passes" v="verify online" />
              <ActivityRow k="Realtime" v="not wired" />
              <ActivityRow k="Topology" v="not wired" />
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, color: "#666" }}>Next actions</div>
              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                <a href="/venues" style={cta}>
                  Add topology: venues → access points → spaces
                </a>
                <a href="/admin/seed" style={cta}>
                  Seed demo network
                </a>
                <a href="/ops" style={cta}>
                  Ops console wiring
                </a>
              </div>
            </div>
          </Panel>
        </div>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Panel title="Network Overview" subtitle="What this page becomes in 3.0.">
            <ul style={ul}>
              <li style={li}>Graph view: venues ↔ devices ↔ passes ↔ rules</li>
              <li style={li}>Realtime events: issue / verify / denylist / failures</li>
              <li style={li}>Per-venue health: latency, failure rate, last event</li>
              <li style={li}>Operator drilldown: kiosk + edge verification stats</li>
            </ul>
          </Panel>

          <Panel title="Build Stamp" subtitle="Used to confirm the deployed build.">
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#111",
                background: "white",
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                overflowX: "auto",
              }}
            >
              {BUILD_STAMP}
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: "#666", lineHeight: 1.5 }}>
              If this is visible on <code>www</code>, routing + deployment are correct. If it disappears, we’re viewing an old
              deploy or protected domain.
            </div>
          </Panel>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: "#666" }}>
          Build stamp:{" "}
          <code
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            }}
          >
            {BUILD_STAMP}
          </code>
        </div>
      </div>
    </main>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: "white",
        border: "1px solid #eee",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 650 }}>{title}</div>
          {subtitle ? <div style={{ marginTop: 6, fontSize: 12, color: "#666", lineHeight: 1.45 }}>{subtitle}</div> : null}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  );
}

function Metric({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, background: "#fafafa" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 20, letterSpacing: -0.2 }}>{value}</div>
      {hint ? <div style={{ marginTop: 6, fontSize: 12, color: "#666", lineHeight: 1.35 }}>{hint}</div> : null}
    </div>
  );
}

function Pill({ label, value, tone }: { label: string; value: string; tone: "ok" | "warn" | "bad" }) {
  const border = tone === "ok" ? "#cfe9d8" : tone === "warn" ? "#fde7c2" : "#ffd0d0";
  const bg = tone === "ok" ? "#ecfbf1" : tone === "warn" ? "#fff7ea" : "#fff1f1";
  const text = tone === "ok" ? "#0a6a2a" : tone === "warn" ? "#8a5a00" : "#8a0000";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: bg,
        color: text,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      <span style={{ opacity: 0.85 }}>{label}</span>
      <span style={{ width: 1, height: 14, background: "rgba(0,0,0,0.12)" }} />
      <span>{value}</span>
    </div>
  );
}

function ActivityRow({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{k}</div>
      <div
        style={{
          fontSize: 12,
          padding: "6px 10px",
          borderRadius: 999,
          border: "1px solid #eee",
          background: "white",
        }}
      >
        {v}
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "white",
  color: "black",
  textDecoration: "none",
  fontSize: 13,
};

const chip: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid #eee",
  background: "white",
  color: "black",
  textDecoration: "none",
  fontSize: 12,
};

const cta: React.CSSProperties = {
  display: "block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #eee",
  background: "#fafafa",
  color: "black",
  textDecoration: "none",
  fontSize: 13,
};

const activityBox: React.CSSProperties = {
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 12,
  background: "#fafafa",
  display: "grid",
  gap: 10,
};

const ul: React.CSSProperties = { margin: 0, paddingLeft: 18, color: "#444", lineHeight: 1.7 };
const li: React.CSSProperties = { fontSize: 13 };
