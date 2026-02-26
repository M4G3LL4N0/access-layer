import Link from "next/link";
import { getLatestVenue, listPolicies } from "@/lib/axw3/queries";

export const dynamic = "force-dynamic";

export default async function PoliciesPage() {
  const venue = await getLatestVenue();

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Policies</h1>
      <p style={{ opacity: 0.85, marginBottom: 14 }}>
        Venue: <b>{venue?.name ?? "none"}</b> {venue?.id ? <code style={code()}>{venue.id}</code> : null}
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <Link href="/v3/seed" style={btn()}>Seed demo</Link>
        <Link href="/v3/test" style={btn()}>Test</Link>
        <Link href="/v3" style={btn()}>Back</Link>
      </div>

      {!venue?.id ? (
        <div style={card()}>No venue found. Go to <Link href="/v3/seed">/v3/seed</Link>.</div>
      ) : (
        <PolicyTable venueId={venue.id} />
      )}
    </main>
  );
}

async function PolicyTable({ venueId }: { venueId: string }) {
  const rows = await listPolicies(venueId);

  return (
    <div style={card()}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div><b>{rows.length}</b> policies</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              <th style={th()}>effect</th>
              <th style={th()}>priority</th>
              <th style={th()}>subject</th>
              <th style={th()}>action</th>
              <th style={th()}>resource</th>
              <th style={th()}>conditions</th>
              <th style={th()}>note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.id}>
                <td style={td()}><b>{r.effect}</b></td>
                <td style={td()}>{r.priority}</td>
                <td style={td()}><code style={code()}>{r.subject_type}:{r.subject_id}</code></td>
                <td style={td()}><code style={code()}>{r.action}</code></td>
                <td style={td()}><code style={code()}>{r.resource_type}:{r.resource_id}</code></td>
                <td style={td()}><code style={code()}>{JSON.stringify(r.conditions ?? {})}</code></td>
                <td style={td()}>{r.note ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function btn(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 10,
    textDecoration: "none",
    color: "black",
    background: "white"
  };
}
function card(): React.CSSProperties {
  return {
    padding: 16,
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 14,
    background: "white"
  };
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
