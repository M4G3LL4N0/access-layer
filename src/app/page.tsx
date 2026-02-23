export default function Home() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 20px" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/favicon.ico" alt="AXW" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(0,0,0,0.12)" }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800 }}>AXW</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Access × World</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
          <a href="/investors" style={{ textDecoration: "none", opacity: 0.85 }}>Investors</a>
          <a href="/pricing" style={{ textDecoration: "none", opacity: 0.85 }}>Pricing</a>
          <a href="/contact" style={{ textDecoration: "none", opacity: 0.85 }}>Contact</a>
        </nav>
      </header>

      <section style={{ marginBottom: 64 }}>
        <h1 style={{ fontSize: 54, letterSpacing: -1.2, margin: "0 0 14px" }}>Programmable access, everywhere.</h1>
        <p style={{ fontSize: 18, maxWidth: 780, opacity: 0.8, margin: "0 0 26px" }}>
          AXW is the coordination layer for access: policy-defined permissions, time-bounded tokens, and auditable logs —
          designed to integrate with real systems without publishing sensitive codes.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://app.accessxworld.com" style={{ padding: "12px 16px", borderRadius: 12, background: "black", color: "white", textDecoration: "none", fontWeight: 800 }}>
            Open the app
          </a>
          <a href="/investors" style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.14)", textDecoration: "none", fontWeight: 800 }}>
            Investor hub
          </a>
        </div>
      </section>

      <footer style={{ marginTop: 48, opacity: 0.6, fontSize: 12 }}>
        © {new Date().getFullYear()} AXW — Access × World
      </footer>
    </main>
  );
}
