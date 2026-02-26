import Link from "next/link";
import { getLatestVenue, listAudit } from "@/lib/axw3/queries";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const venue = await getLatestVenue();
  const events = await listAudit(venue?.id ?? undefined, 120);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Audit</h1>
      <p style={{ opacity: 0.85, marginBottom: 14 }}>
        Venue: <b>{venue?.name ?? "none"}</b> {venue?.id ? <code style={code()}>{venue.id}</code> : null}
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <Link href="/v3/seed" style={btn()}>Seed</Link>
        <Link href="/v3/test" style={btn()}>Test</Link>
        <Link href="/v3" style={btn()}>Back</Link>
      </div>

      <div style={card()}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={th()}>at</th>
                <th style={th()}>action</th>
                <th style={th()}>actor</th>
                <th style={th()}>resource</th>
                <th style={th()}>ok</th>
                <th style={th()}>meta</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e: any) => (
                <tr key={e.id}>
                  <td style={td()}><code style={code()}>{String(e.at)}</code></td>
                  <td style={td()}><b>{e.action}</b></td>
                  <td style={td()}><code style={code()}>{(e.actor_type ?? "") + ":" + (e.actor_id ?? "")}</code></td>
                  <td style={td()}><code style={code()}>{(e.resource_type ?? "") + ":" + (e.resource_id ?? "")}</code></td>
                  <td style={td()}>{e.ok ? "true" : "false"}</td>
                  <td style={td()}><code style={code()}>{JSON.stringify(e.meta ?? {})}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function btn(): React.CSSProperties {
  return { display: "inline-block", padding: "10px 12px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 10, textDecoration: "none", color: "black", background: "white" };
}
function card(): React.CSSProperties {
  return { padding: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, background: "white" };
}
function th(): React.CSSProperties {
  return { textAlign: "left", padding: "8px 10px", borderBottom: "1px solid rgba(0,0,0,0.12)" };
}
function td(): React.CSSProperties {
  return { padding: "8px 10px", borderBottom: "1px solid rgba(0,0,0,0.08)", verticalAlign: "top" };
}
function code(): React.CSSProperties {
  return { padding: "2px 6px", borderRadius: 8, background: "rgba(0,0,0,0.05)" };
}
