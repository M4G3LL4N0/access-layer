import ParkingTokenBox from "@/components/ParkingTokenBox";

export const dynamic = "force-dynamic";

export default function ParkingKioskPage({ params }: { params: { venueId: string } }) {
  const venueId = params?.venueId || "";

  return (
    <main className="axw-container">
      <div className="axw-title" style={{ fontSize: 22 }}>
        Parking Kiosk — {venueId}
      </div>
      <div className="axw-muted" style={{ marginTop: 6 }}>
        Issue a parking validation token and verify tokens at exit.
      </div>

      <div className="axw-row" style={{ marginTop: 12 }}>
        <a className="axw-btn" href={`/kiosk/${venueId}`}>← Back to Kiosk</a>
        <a className="axw-btn" href={`/v/${venueId}`}>Venue Page</a>
        <a className="axw-btn axw-btn-primary" href={`/solutions/parking`}>Parking Solution</a>
      </div>

      <div className="axw-card" style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 950 }}>Issue Parking Validation Token</div>
        <div className="axw-muted" style={{ marginTop: 6, fontSize: 13 }}>
          This issues a short-lived validation token for exit verification.
        </div>

        <form action="/api/parking/issue" method="post" style={{ marginTop: 10 }}>
          <input type="hidden" name="venueId" value={venueId} />
          <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
            <input className="axw-input" name="minutes" defaultValue="120" />
            <button className="axw-btn axw-btn-primary" type="submit">
              Issue 2-hour Token
            </button>
          </div>
        </form>
      </div>

      <ParkingTokenBox
        onVerify={async (token) => {
          if (!token) return;
          window.location.href = `/api/parking/verify?token=${encodeURIComponent(token)}`;
        }}
      />
    </main>
  );
}
