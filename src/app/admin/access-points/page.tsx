import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminAccessPointsIndexPage() {
  const supabase = await supabaseServer();

  const { data: venues, error } = await supabase
    .from("venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <>
    <SubpageVisual variant="default" />
      <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Admin • Access Points</h1>
          <p style={{ margin: "6px 0 0 0", opacity: 0.8 }}>Pick a venue to manage its access points.</p>
        </div>
        <Link href="/admin">← Admin</Link>
      </div>

      {error ? (
        <div style={{ marginTop: 14 }}>
          <p>Error loading venues.</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(error.message ?? error)}</pre>
        </div>
      ) : (
        <div style={{ marginTop: 14 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Venue</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>City</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Region</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Status</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 6px" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {(venues ?? []).map((v: any) => (
                <tr key={v.id}>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>
                    <Link href={`/admin/access-points/${v.id}`}>{v.name ?? v.id}</Link>
                  </td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>{v.city ?? "—"}</td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>{v.region ?? "—"}</td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>{v.status ?? "—"}</td>
                  <td style={{ borderBottom: "1px solid #f3f3f3", padding: "8px 6px" }}>
                    {v.created_at ? new Date(v.created_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
              {(venues ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "10px 6px", opacity: 0.7 }}>
                    No venues found.
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
