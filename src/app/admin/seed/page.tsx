export default function AdminSeedPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 900 }}>Admin: Seed Venue</h1>
      <p style={{ opacity: 0.8 }}>
        Uses ADMIN_SEED_TOKEN. Don’t share this link/token publicly.
      </p>

      <form action="/api/admin/seed-venue" method="post" style={{ maxWidth: 520, marginTop: 16 }}>
        <label style={{ fontWeight: 800 }}>Token</label>
        <input name="token" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />

        <label style={{ fontWeight: 800, display: "block", marginTop: 12 }}>Name</label>
        <input name="name" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />

        <label style={{ fontWeight: 800, display: "block", marginTop: 12 }}>Address</label>
        <input name="address" required style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />

        <label style={{ fontWeight: 800, display: "block", marginTop: 12 }}>City</label>
        <input name="city" required defaultValue="San Francisco" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />

        <label style={{ fontWeight: 800, display: "block", marginTop: 12 }}>Region</label>
        <input name="region" required defaultValue="CA" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 800 }}>Lat (optional)</label>
            <input name="lat" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 800 }}>Lng (optional)</label>
            <input name="lng" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </div>
        </div>

        <button style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "black", color: "white", fontWeight: 800, border: "none" }}>
          Create Venue + Default Rule
        </button>
      </form>
    </main>
  );
}

