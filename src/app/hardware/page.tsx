import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

type Venue = {
  id: string;
  name: string;
  city: string | null;
  region: string | null;
  category: string | null;
  status: string | null;
  created_at: string | null;
};

export default async function HardwareConsolePage() {
  // IMPORTANT: in this repo, supabaseServer is a client instance (NOT a function)
  const supabase = await supabaseServer();

  const { data: venues, error } = await supabase
    .from("venues")
    .select("id,name,city,region,category,status,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto" }}>
      <SubpageVisual variant="default" />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Hardware Console</h1>
          <p style={{ margin: "6px 0 0", opacity: 0.8 }}>
            Operator shortcuts for kiosks, signage, verification, and venue pages.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/venues" style={btnSoft}>Directory</Link>
          <Link href="/admin" style={btnSoft}>Admin</Link>
          <Link href="/verify" style={btnSoft}>Verify Pass</Link>
          <Link href="/scan" style={btnSoft}>Scan QR</Link>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #fca5a5", background: "#fff1f2", borderRadius: 12 }}>
          <b>Supabase error:</b> {String((error as any)?.message || error)}
        </div>
      )}

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {(venues as Venue[] | null)?.map((v) => (
          <div key={v.id} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 14, background: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900 }}>{v.name}</div>
                <div style={{ marginTop: 4, opacity: 0.75, fontSize: 13 }}>
                  {[(v.city || "").trim(), (v.region || "").trim()].filter(Boolean).join(" · ") || "—"}
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, opacity: 0.75 }}>
                <div>{v.category || "—"}</div>
                <div style={{ fontWeight: 800 }}>{v.status || "—"}</div>
              </div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={`/v/${v.id}`} style={btnLink}>Venue</a>
              <a href={`/manage/${v.id}`} style={btnLink}>Manage</a>
              <a href={`/signage/${v.id}`} style={btnLink}>Signage</a>
              <a href={`/pilot-pack/${v.id}`} style={btnLink}>Pilot Pack</a>
              <a href={`/kiosk/${v.id}`} style={btnLink}>Kiosk</a>
              <a href={`/kiosk/parking/${v.id}`} style={btnLink}>Parking Kiosk</a>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
              {v.id}
            </div>
          </div>
        ))}

        {(!venues || (venues as any[]).length === 0) && !error && (
          <div style={{ opacity: 0.8 }}>
            No venues found. Seed some venues first from <Link href="/admin/seed" style={{ fontWeight: 800 }}>Admin Seed</Link>.
          </div>
        )}
      </div>
    </main>
  );
}

const btnSoft: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  textDecoration: "none",
  color: "black",
  background: "white",
  fontWeight: 800,
};

const btnLink: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 10px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  textDecoration: "none",
  color: "black",
  background: "#fafafa",
  fontWeight: 800,
  fontSize: 13,
};
