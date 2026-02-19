export const dynamic = "force-dynamic";

async function getMetrics() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL || ""}/api/metrics/global`, {
      cache: "no-store",
    });
    const json = await res.json().catch(() => null);
    return json;
  } catch {
    return null;
  }
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="axw-card" style={{ minWidth: 220 }}>
      <div className="axw-muted" style={{ fontSize: 12, fontWeight: 900 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 950, marginTop: 6 }}>{value}</div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const m = await getMetrics();

  return (
    <main className="axw-container">
      <div className="axw-row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="axw-title" style={{ fontSize: 24 }}>AXW Analytics</div>
          <div className="axw-muted" style={{ marginTop: 6 }}>
            Live network health: venues, tokens, parking events, inbound leads.
          </div>
        </div>

        <div className="axw-row">
          <a className="axw-btn" href="/">Home</a>
          <a className="axw-btn" href="/investors">Investors</a>
          <a className="axw-btn axw-btn-primary" href="/admin">Admin</a>
        </div>
      </div>

      {!m || !m.ok ? (
        <div className="axw-card" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 900, color: "crimson" }}>Metrics unavailable</div>
          <div className="axw-muted" style={{ marginTop: 6 }}>
            Check <b>/api/metrics/global</b> is returning ok.
          </div>
          <pre style={{ marginTop: 10, fontSize: 12, opacity: 0.85, overflowX: "auto" }}>
            {JSON.stringify(m, null, 2)}
          </pre>
        </div>
      ) : (
        <>
          <div className="axw-row" style={{ marginTop: 16 }}>
            <Stat label="Venues" value={m.venues ?? 0} />
            <Stat label="Passes (7d)" value={m.passes_7d ?? 0} />
            <Stat label="Parking events (7d)" value={m.parking_events_7d ?? 0} />
            <Stat label="Leads (7d)" value={m.leads_7d ?? 0} />
          </div>

          <div className="axw-card" style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 950 }}>Why this matters</div>
            <div className="axw-muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
              Investors don’t fund code — they fund traction and proof. These metrics become the “heartbeat” of AXW:
              adoption (venues), usage (passes), monetizable validation events (parking), and inbound demand (leads).
            </div>
          </div>
        </>
      )}
    </main>
  );
}
