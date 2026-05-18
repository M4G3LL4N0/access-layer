import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { venueId: string };

export default async function AdminAccessPointsVenuePage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const { venueId } = (await params) as Params;

  const supabase = await supabaseServer();

  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .select("id,name,city,region,status")
    .eq("id", venueId)
    .maybeSingle();

  if (vErr) {
    return (
      <>
      <SubpageVisual variant="default" />
      <div style={{ padding: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Access Points</h1>
        <p style={{ marginTop: 10 }}>Error loading venue.</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(vErr.message ?? vErr)}</pre>
        <p style={{ marginTop: 14 }}>
          <Link href="/admin/access-points">← Back</Link>
        </p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div style={{ padding: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Access Points</h1>
        <p style={{ marginTop: 10 }}>Venue not found.</p>
        <p style={{ marginTop: 14 }}>
          <Link href="/admin/access-points">← Back</Link>
        </p>
      </div>
    );
  }

  const { data: aps, error: apErr } = await supabase
    .from("access_points")
    .select("id,name,type,status,created_at")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false });

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Access Points</h1>
          <p style={{ margin: "6px 0 0 0", opacity: 0.8 }}>
            {venue.name} • {venue.city ?? "—"}, {venue.region ?? "—"} • {venue.status ?? "—"}
          </p>
        </div>
        <Link href="/admin/access-points">← Back</Link>
      </div>

      {apErr ? (
        <div style={{ marginTop: 14 }}>
          <p>Error loading access points.</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(apErr.message ?? apErr)}</pre>
        </div>
      ) : (
        <div style={{ marginTop: 14 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Name</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Type</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Status</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {(aps ?? []).map((ap: any) => (
                <tr key={ap.id}>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>{ap.name ?? ap.id}</td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>{ap.type ?? "—"}</td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>{ap.status ?? "—"}</td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>
                    {ap.created_at ? new Date(ap.created_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
              {(aps ?? []).length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "10px 6px", opacity: 0.7 }}>
                    No access points yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </>
  )
}
