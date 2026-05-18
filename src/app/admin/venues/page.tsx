import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function VenuesPage() {
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("venues")
      .select("id,name,city,region,status,created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    return (
      <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <SubpageVisual variant="default" />
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>Venues</h1>
            <p style={{ opacity: 0.7 }}>AXW 3.0</p>
          </div>
          <nav style={{ display: "flex", gap: 12 }}>
            <Link href="/admin">Admin</Link>
            <Link href="/admin/seed">Seed</Link>
          </nav>
        </header>

        <div style={{ marginTop: 18, padding: 14, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14 }}>
          {error ? (
            <>
              <div style={{ fontWeight: 700 }}>❌ Supabase error</div>
              <pre style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
                {error.message}
              </pre>
            </>
          ) : !data || data.length === 0 ? (
            <div>No venues found.</div>
          ) : (
            <ul>
              {data.map((v: any) => (
                <li key={v.id}>
                  <code>{v.id}</code> — {v.name} ({v.city}, {v.region}) — {v.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    );
  } catch (e: any) {
    return (
      <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
        <h1>Server Crash</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{e?.message}</pre>
        <p style={{ marginTop: 12 }}>
          Check env vars and Supabase table existence.
        </p>
      </main>
    );
  }
}
