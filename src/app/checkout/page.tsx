import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string; canceled?: string; plan?: string; session_id?: string }>;
}) {
  const sp = (await searchParams) || {};
  const success = sp.success === "1";
  const canceled = sp.canceled === "1";
  const plan = sp.plan || "starter";
  const sessionId = sp.session_id || "";

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 999 }}>Checkout</h1>

      {success ? (
        <div
          style={{
            marginTop: 14,
            padding: 16,
            borderRadius: 16,
            border: "1px solid #1f3b2b",
            background: "#052e1a",
            fontWeight: 900,
            lineHeight: 1.6,
          }}
        >
          ✅ Payment successful. Plan: <b>{plan}</b>
          <div style={{ marginTop: 8, opacity: 0.9, fontWeight: 700 }}>
            Session: <span style={{ fontFamily: "ui-monospace, Menlo, Monaco, Consolas, monospace" }}>{sessionId}</span>
          </div>
          <div style={{ marginTop: 10, opacity: 0.85, fontWeight: 700 }}>
            Next step: invite an owner to claim a venue, then enable paid access rules.
          </div>
        </div>
      ) : null}

      {canceled ? (
        <div
          style={{
            marginTop: 14,
            padding: 16,
            borderRadius: 16,
            border: "1px solid #3a2a2a",
            background: "#2a0b0b",
            fontWeight: 900,
            lineHeight: 1.6,
          }}
        >
          ❌ Checkout canceled. You can try again.
        </div>
      ) : null}

      {!success && !canceled ? (
        <div
          style={{
            marginTop: 14,
            padding: 16,
            borderRadius: 16,
            border: "1px solid #23232a",
            background: "#111118",
            fontWeight: 800,
            lineHeight: 1.6,
          }}
        >
          Choose a plan first.
          <div style={{ marginTop: 10 }}>
            <Link
              href="/pricing"
              style={{
                display: "inline-block",
                padding: "10px 12px",
                borderRadius: 12,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 950,
                border: "1px solid #23232a",
              }}
            >
              Go to pricing →
            </Link>
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Nav href="/demo">Demo</Nav>
        <Nav href="/investors">Investors</Nav>
        <Nav href="/admin/metrics">Metrics</Nav>
        <Nav href="/venues">Directory</Nav>
      </div>
    </main>
  );
}

function Nav({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        background: "black",
        color: "white",
        textDecoration: "none",
        fontWeight: 950,
        border: "1px solid #23232a",
      }}
    >
      {children}
    </Link>
  );
}
