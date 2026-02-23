import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function asClient(maybeFn: any) {
  return typeof maybeFn === "function" ? maybeFn() : maybeFn;
}

export default async function SignagePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supabase = await asClient(supabaseServer);

  const { data: venue, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status")
    .eq("id", venueId)
    .limit(1)
    .maybeSingle();

  if (error) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1000 }}>Signage</h1>
        <p style={{ marginTop: 10, fontWeight: 800 }}>Venue not found.</p>
        <div style={{ marginTop: 10, opacity: 0.8 }}>
          Debug: {error.message}
        </div>
        <div style={{ marginTop: 16 }}>
          <Link href="/venues" style={{ fontWeight: 900 }}>
            Back to directory →
          </Link>
        </div>
      </main>
    );
  }

  if (!venue) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1000 }}>Signage</h1>
        <p style={{ marginTop: 10, fontWeight: 800 }}>Venue not found.</p>
        <div style={{ marginTop: 16 }}>
          <Link href="/venues" style={{ fontWeight: 900 }}>
            Back to directory →
          </Link>
        </div>
      </main>
    );
  }

  const base =
    process.env.NEXT_PUBLIC_APP_BASE_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://app.accessxworld.com";

  const requestUrl = `${base}/request/${venue.id}`;
  const verifyUrl = `${base}/verify`;

  const card: React.CSSProperties = {
    border: "2px solid #111",
    borderRadius: 18,
    padding: 18,
    maxWidth: 720,
    margin: "0 auto",
    background: "#fff",
    color: "#0b0b0b",
  };

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/v/${venue.id}`} style={{ fontWeight: 900 }}>
            ← Back to venue
          </Link>
          <Link href="/venues" style={{ fontWeight: 900 }}>
            Directory
          </Link>
        </div>

        <h1 style={{ margin: "14px 0 6px", fontSize: 28, fontWeight: 1000 }}>
          Signage Poster (Print)
        </h1>
        <div style={{ opacity: 0.8, marginBottom: 16 }}>
          Built for staff verification + guest self-serve requests (no codes shown).
        </div>

        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 1000, fontSize: 18 }}>AXW — Access × World</div>
              <div style={{ opacity: 0.8, marginTop: 3 }}>
                {venue.name}
              </div>
              <div style={{ opacity: 0.75, fontSize: 13, marginTop: 6 }}>
                {[
                  venue.address,
                  `${venue.city || ""}${venue.region ? `, ${venue.region}` : ""}`,
                  venue.country || "",
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </div>

            <div style={{ textAlign: "right", opacity: 0.9 }}>
              <div style={{ fontWeight: 900, fontSize: 13 }}>
                Category: {venue.category || "venue"}
              </div>
              <div style={{ fontWeight: 900, fontSize: 13 }}>
                Status: {venue.status || "active"}
              </div>
            </div>
          </div>

          <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid rgba(0,0,0,0.18)" }} />

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 1000, fontSize: 18 }}>
              Request access pass
            </div>
            <div style={{ opacity: 0.85, lineHeight: 1.5 }}>
              1) Open the request link below<br />
              2) Tap “Request Now”<br />
              3) Show your pass to staff during the active window
            </div>

            <div
              style={{
                padding: 12,
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.18)",
                background: "#fafafa",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                fontSize: 13,
                wordBreak: "break-all",
              }}
            >
              {requestUrl}
            </div>

            <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
              Staff: verify tokens at{" "}
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas" }}>
                {verifyUrl}
              </span>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={requestUrl}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 1000,
              }}
            >
              Open request page →
            </a>
            <a
              href={verifyUrl}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.18)",
                background: "white",
                color: "black",
                textDecoration: "none",
                fontWeight: 1000,
              }}
            >
              Staff verify →
            </a>
          </div>

          <div style={{ marginTop: 14, opacity: 0.7, fontSize: 12 }}>
            No codes are displayed. Passes are time-limited and rate-limited.
          </div>
        </div>
      </div>
    </main>
  );
}
