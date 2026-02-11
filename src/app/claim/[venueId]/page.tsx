import Link from "next/link";

export default async function ClaimPage({
  params,
  searchParams,
}: {
  params: Promise<{ venueId: string }>;
  searchParams?: Promise<{ ok?: string }>;
}) {
  const { venueId } = await params;
  const sp = (await searchParams) || {};
  const ok = sp.ok === "1";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <Link href={`/v/${venueId}`} style={{ opacity: 0.8 }}>
        ← Back to venue
      </Link>

      <h1 style={{ marginTop: 12, fontSize: 24, fontWeight: 900 }}>
        Claim & Manage This Venue
      </h1>

      <p style={{ opacity: 0.8 }}>
        Leave an email and we’ll send setup steps for owner controls (rules, hours, analytics).
      </p>

      {ok && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            background: "#f0fff4",
            border: "1px solid #c9f2d3",
            fontWeight: 800,
          }}
        >
          Submitted — we’ll reach out shortly.
        </div>
      )}

      <form action="/api/claim" method="post" style={{ marginTop: 16, maxWidth: 520 }}>
        <input type="hidden" name="venueId" value={venueId} />

        <label style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="owner@venue.com"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <label
          style={{
            display: "block",
            fontWeight: 800,
            marginTop: 12,
            marginBottom: 6,
          }}
        >
          Note (optional)
        </label>
        <textarea
          name="note"
          rows={4}
          placeholder="I manage this location and want to set up access rules…"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <button
          style={{
            marginTop: 14,
            padding: "10px 14px",
            borderRadius: 10,
            background: "black",
            color: "white",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </main>
  );
}
