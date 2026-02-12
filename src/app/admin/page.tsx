export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminHome({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) || {};
  const token = sp.token || "";

  const venuesActive = await supabaseServer
    .from("venues")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  const venuesTotal = await supabaseServer
    .from("venues")
    .select("id", { count: "exact", head: true });

  const requests7d = await supabaseServer
    .from("access_requests")
    .select("id", { count: "exact", head: true })
    .gte("requested_at", new Date(Date.now() - 7 * 864e5).toISOString());

  const tokens7d = await supabaseServer
    .from("access_tokens")
    .select("id", { count: "exact", head: true })
    .gte("issued_at", new Date(Date.now() - 7 * 864e5).toISOString());

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 950 }}>Admin</h1>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/venues" style={{ opacity: 0.8 }}>Directory</Link>
          <Link href={`/admin/seed?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Seed venues</Link>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="Active venues" value={venuesActive.count ?? 0} />
        <Stat label="Total venues" value={venuesTotal.count ?? 0} />
        <Stat label="Requests (7d)" value={requests7d.count ?? 0} />
        <Stat label="Tokens (7d)" value={tokens7d.count ?? 0} />
      </div>

      <div style={{ marginTop: 18, padding: 14, border: "1px solid #eee", borderRadius: 14, opacity: 0.85 }}>
        This is your “infrastructure” proof-of-work screen for investors.
      </div>

      <div style={{ marginTop: 18 }}>
        <Link
          href={`/admin/venues?token=${encodeURIComponent(token)}`}
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            textDecoration: "none",
            fontWeight: 900,
          }}
        >
          Manage venues →
        </Link>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 12, minWidth: 170 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 950 }}>{value}</div>
    </div>
  );
}
