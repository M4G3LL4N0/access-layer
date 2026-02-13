export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 20px" }}>
        {/* Top bar */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="/favicon.ico"
              alt="AXW"
              style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(0,0,0,0.12)" }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 700 }}>AXW</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Access × World</div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
            <a href="#what" style={{ color: "inherit", textDecoration: "none", opacity: 0.8 }}>What</a>
            <a href="#how" style={{ color: "inherit", textDecoration: "none", opacity: 0.8 }}>How</a>
            <a href="#pilot" style={{ color: "inherit", textDecoration: "none", opacity: 0.8 }}>Pilot</a>
          </nav>
        </header>

        {/* Hero */}
        <section style={{ marginBottom: 64 }}>
          <h1 style={{ fontSize: 54, letterSpacing: -1.2, margin: "0 0 14px" }}>
            Programmable access, everywhere.
          </h1>

          <p style={{ fontSize: 18, maxWidth: 780, opacity: 0.8, margin: "0 0 26px" }}>
            AXW is the coordination layer for access: policy-defined permissions, time-bounded tokens,
            and auditable logs — designed to integrate with real systems without publishing sensitive codes.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://app.accessxworld.com"
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Open the app
            </a>

            <a
              href="#pilot"
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                color: "black",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Run a pilot
            </a>
          </div>

          <div style={{ marginTop: 18, fontSize: 13, opacity: 0.65 }}>
            Built for: venues • property ops • enterprise access • infrastructure partners
          </div>
        </section>

        {/* Value props */}
        <section
          id="what"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginBottom: 64,
          }}
        >
          {[
            { title: "Serious infrastructure", desc: "Access is policy, not a shared secret. Built for reliability and accountability." },
            { title: "Tokenized permissions", desc: "Issue scoped, time-bounded access tokens with explicit rules and constraints." },
            { title: "Auditable logs", desc: "Every grant and use is logged for compliance, dispute resolution, and transparency." },
            { title: "Conversion-ready", desc: "Start with a pilot. Prove value fast. Expand to more sites and systems." },
          ].map((c) => (
            <div key={c.title} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>{c.desc}</div>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section id="how" style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, margin: "0 0 12px" }}>How it works</h2>
          <ol style={{ margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.7, maxWidth: 900 }}>
            <li><b>Define policies</b> (who/what/when/where) once.</li>
            <li><b>Issue tokens</b> that encode scope + expiry + constraints.</li>
            <li><b>Verify access</b> at the edge (apps, controllers, services).</li>
            <li><b>Log events</b> for audit, analytics, and enforcement.</li>
          </ol>
        </section>

        {/* Pilot CTA */}
        <section id="pilot" style={{ borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.12)" }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Pilot in 7 days</h3>
          <p style={{ margin: "0 0 12px", opacity: 0.8, maxWidth: 900 }}>
            Start with one location or one workflow. Define the rules, issue tokens, and log everything.
            Expand after the first proof of value.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://app.accessxworld.com"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Launch app
            </a>

            <a
              href="/contact"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                color: "black",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Contact
            </a>
          </div>
        </section>

        <footer style={{ marginTop: 48, opacity: 0.6, fontSize: 12 }}>
          © {new Date().getFullYear()} AXW — Access × World
        </footer>
      </div>
    </main>
  );
}
