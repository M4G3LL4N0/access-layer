export const dynamic = "force-dynamic";

import Link from "next/link";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ plan?: string }>;
}) {
  const sp = (await searchParams) || {};
  const plan = sp.plan || "pro";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <Link href="/pricing" style={{ opacity: 0.8 }}>
        ← Pricing
      </Link>

      <h1 style={{ marginTop: 14, fontSize: 30, fontWeight: 950 }}>Checkout (Stub)</h1>
      <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
        This is a placeholder flow for <b>{plan}</b>. Next step is wiring Stripe Checkout + webhook to unlock Pro
        features (owner dashboard, advanced analytics, exports).
      </p>

      <div style={{ marginTop: 16, padding: 14, borderRadius: 14, border: "1px solid #eee" }}>
        <div style={{ fontWeight: 950 }}>What happens next</div>
        <ol style={{ marginTop: 10, lineHeight: 1.9 }}>
          <li>User selects plan</li>
          <li>Stripe Checkout creates a subscription</li>
          <li>Webhook marks owner/org as Pro</li>
          <li>Pro dashboard unlocks rule editor + exports</li>
        </ol>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link
          href="/owners"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            background: "black",
            color: "white",
            textDecoration: "none",
            fontWeight: 950,
          }}
        >
          Start owner onboarding
        </Link>

        <Link
          href="/investors"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            textDecoration: "none",
            fontWeight: 950,
          }}
        >
          View investor page
        </Link>
      </div>
    </main>
  );
}
