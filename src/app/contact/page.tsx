export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "system-ui",
        background: "#0b0f17",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900 }}>Venue Pilot — Get Onboarded</h1>
        <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.6 }}>
          If you manage a venue, request onboarding. We don’t publish codes — we issue time-limited
          passes with rules you control.
        </p>

        <form
          action="/api/lead"
          method="post"
          style={{
            marginTop: 20,
            display: "grid",
            gap: 12,
            padding: 16,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <input type="hidden" name="source" value="contact_page" />

          <label style={{ fontWeight: 800 }}>Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@venue.com"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              color: "white",
            }}
          />

          <label style={{ fontWeight: 800 }}>Name</label>
          <input
            name="name"
            placeholder="Your name"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              color: "white",
            }}
          />

          <label style={{ fontWeight: 800 }}>Venue / Company</label>
          <input
            name="company"
            placeholder="Venue name"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              color: "white",
            }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontWeight: 800 }}>City</label>
              <input
                name="city"
                placeholder="San Francisco"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.35)",
                  color: "white",
                }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 800 }}>Region/State</label>
              <input
                name="region"
                placeholder="CA"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.35)",
                  color: "white",
                }}
              />
            </div>
          </div>

          <label style={{ fontWeight: 800 }}>Venue Type</label>
          <input
            name="venue_type"
            placeholder="restroom / workspace / office / event / gym"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              color: "white",
            }}
          />

          <label style={{ fontWeight: 800 }}>Message</label>
          <textarea
            name="message"
            rows={5}
            placeholder="What access problem are you trying to solve? Hours? Staff verification? Paid access?"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              color: "white",
            }}
          />

          <button
            style={{
              marginTop: 8,
              padding: "12px 14px",
              borderRadius: 12,
              background: "white",
              color: "black",
              fontWeight: 900,
              border: "none",
              cursor: "pointer",
            }}
          >
            Request onboarding
          </button>

          <div style={{ opacity: 0.75, fontSize: 13, marginTop: 6 }}>
            Pilot is free. We’ll follow up with a 10-minute setup plan and signage.
          </div>
        </form>
      </div>
    </main>
  );
}
