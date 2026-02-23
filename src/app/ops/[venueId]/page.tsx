import Link from "next/link";
import OpsConsoleClient from "@/components/OpsConsoleClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OpsConsolePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  return (
    <main style={{ padding: 18, fontFamily: "system-ui" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Access Ops Console</h1>
              <span
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.18)",
                  opacity: 0.9,
                }}
              >
                VC demo / operator view
              </span>
            </div>
            <div style={{ opacity: 0.75, fontSize: 13 }}>
              Venue ID:{" "}
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                {venueId}
              </span>
            </div>
          </div>

          <nav style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/venues" style={{ textDecoration: "none", opacity: 0.9 }}>
              ← Directory
            </Link>
            <Link href={`/v/${venueId}`} style={{ textDecoration: "none", opacity: 0.9 }}>
              Venue page
            </Link>
            <Link href={`/signage/${venueId}`} style={{ textDecoration: "none", opacity: 0.9 }}>
              Signage
            </Link>
            <Link href={`/pilot-pack/${venueId}`} style={{ textDecoration: "none", opacity: 0.9 }}>
              Pilot pack
            </Link>
          </nav>
        </header>

        <OpsConsoleClient venueId={venueId} />
      </div>
    </main>
  );
}
