import LiveMetrics from "@/components/LiveMetrics";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#ffffff",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <SubpageVisual variant="default" />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 60,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="/favicon.ico"
              alt="AXW"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
            <div>
              <div style={{ fontWeight: 700 }}>AXW</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                Access × World
              </div>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 14,
            }}
          >
            <a href="#what" style={navLink}>What</a>
            <a href="#how" style={navLink}>How</a>
            <a href="/network" style={navLink}>Network</a>
            <a href="#investors" style={navLink}>Investors</a>
          </nav>
        </header>

        {/* HERO */}
        <section style={{ marginBottom: 80 }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: -1,
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            The Universal Access Layer for the Physical World.
          </h1>

          <p
            style={{
              fontSize: 18,
              maxWidth: 800,
              opacity: 0.85,
              marginBottom: 30,
              lineHeight: 1.6,
            }}
          >
            AXW transforms how access is granted, verified, and logged.
            From venues and offices to parking garages and government
            facilities — access becomes programmable infrastructure.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <a
              href="https://app.accessxworld.com"
              style={btnPrimary}
            >
              Open App
            </a>

            <a
              href="/contact"
              style={btnSecondary}
            >
              Run a Pilot
            </a>
          </div>

          {/* LIVE METRICS */}
          <div style={{ marginTop: 60 }}>
            <h3 style={{ fontSize: 22, marginBottom: 12 }}>
              Live Network Activity
            </h3>
            <LiveMetrics />
          </div>
        </section>

        {/* VALUE PROPS */}
        <section
          id="what"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 80,
          }}
        >
          {[
            {
              title: "Tokenized Access",
              desc: "Time-bounded, policy-enforced access tokens instead of static codes.",
            },
            {
              title: "Auditable Infrastructure",
              desc: "Every access event is logged and verifiable.",
            },
            {
              title: "Multi-Sector Deployment",
              desc: "Venues, enterprise, parking, government, events.",
            },
            {
              title: "Blitz-Expandable",
              desc: "Pilot one location. Expand to cities. Then industries.",
            },
          ].map((c) => (
            <div key={c.title} style={card}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </section>

        {/* HOW IT WORKS */}
        <section id="how" style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>
            How It Works
          </h2>
          <ol
            style={{
              paddingLeft: 18,
              lineHeight: 1.7,
              maxWidth: 800,
              opacity: 0.9,
            }}
          >
            <li>Define access rules (who, where, when).</li>
            <li>Issue secure, scoped tokens.</li>
            <li>Verify instantly via QR, kiosk, or API.</li>
            <li>Log events across the network.</li>
          </ol>
        </section>

        {/* NETWORK EXPANSION */}
        <section id="network" style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>
            Expanding the Access Layer
          </h2>
          <p style={{ maxWidth: 800, opacity: 0.85 }}>
            Parking validation. Event credentials. Office entry.
            Government clearance. Smart building systems.
            AXW unifies every point-of-access into one programmable layer.
          </p>
        </section>

        {/* INVESTOR SECTION */}
        <section
          id="investors"
          style={{
            padding: 30,
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,0.1)",
            background: "#f9fafb",
            marginBottom: 60,
          }}
        >
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>
            Building Toward Network Dominance
          </h2>

          <p style={{ maxWidth: 800, opacity: 0.85 }}>
            Phase 1: Venue pilots.  
            Phase 2: Parking & enterprise expansion.  
            Phase 3: Multi-city rollout.  
            Phase 4: National infrastructure layer.
          </p>

          <div style={{ marginTop: 20 }}>
            <a href="/investors" style={btnPrimary}>
              Investor Overview
            </a>
          </div>
        </section>

        <footer
          style={{
            marginTop: 80,
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} AXW — Access × World
        </footer>
      </div>
    </main>
  );
}

/* ------------------ STYLES ------------------ */

const navLink = {
  textDecoration: "none",
  color: "#111",
  opacity: 0.8,
};

const btnPrimary = {
  padding: "12px 18px",
  borderRadius: 12,
  background: "#000",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 700,
};

const btnSecondary = {
  padding: "12px 18px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.2)",
  color: "#111",
  textDecoration: "none",
  fontWeight: 700,
};

const card = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 16,
  padding: 20,
  background: "#fff",
};
