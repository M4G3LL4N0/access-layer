import Link from "next/link";
import { supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

async function seedNow() {
  const supa = supabaseServerService();

  // Create 5 demo venues
  const venues = Array.from({ length: 5 }).map((_, i) => ({
    name: `Demo Venue ${i + 1}`,
    city: "San Francisco",
    region: "CA",
    status: "active",
  }));

  const { data: inserted, error } = await supa.from("venues").insert(venues).select("id,name").limit(5);
  if (error) return { ok: false as const, error: error.message, inserted: [] as any[] };

  return { ok: true as const, inserted: inserted ?? [] };
}

export default async function SeedPage() {
  const res = await seedNow();

  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Seed</h1>
          <p style={{ marginTop: 6, opacity: 0.7 }}>Writes demo venues into Supabase.</p>
        </div>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/admin">Admin</Link>
          <Link href="/admin/venues">Venues</Link>
        </nav>
      </header>

      <div style={{ marginTop: 18, padding: 14, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14 }}>
        {res.ok ? (
          <>
            <div style={{ fontWeight: 700 }}>✅ Seeded venues</div>
            <ul style={{ marginTop: 10 }}>
              {res.inserted.map((v: any) => (
                <li key={v.id}>
                  <code>{v.id}</code> — {v.name}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 10, opacity: 0.8 }}>
              Go to <Link href="/admin/venues">/admin/venues</Link> to confirm.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 700 }}>❌ Seed failed</div>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>{res.error}</pre>
            <p style={{ marginTop: 10, opacity: 0.8 }}>
              Confirm tables exist: <code>venues</code> with columns <code>name, city, region, status</code>.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
