export default function Home() {
  return (
    <main style={{ padding: "80px 20px", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        AXW — Access × World
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "700px", lineHeight: "1.6" }}>
        AXW is a neutral coordination layer for programmable access.
        Tokenized permissions. Auditable logs. Policy-driven infrastructure.
      </p>

      <div style={{ marginTop: "40px" }}>
        <a
          href="/venues"
          style={{
            padding: "12px 20px",
            background: "black",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            marginRight: "15px"
          }}
        >
          Enter Platform
        </a>

        <a
          href="/investors"
          style={{
            padding: "12px 20px",
            border: "1px solid black",
            textDecoration: "none",
            borderRadius: "8px"
          }}
        >
          Learn More
        </a>
      </div>
    </main>
  );
}
