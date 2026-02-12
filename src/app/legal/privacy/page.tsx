import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <Link href="/" style={{ opacity: 0.8 }}>← Home</Link>
      <h1 style={{ marginTop: 14, fontSize: 32, fontWeight: 950 }}>Privacy</h1>
      <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7 }}>
        We do not publish door codes. We issue time-limited passes and log operational events.
        We minimize data collection and store only what’s needed to operate the service and prevent abuse.
      </p>
      <ul style={{ marginTop: 10, lineHeight: 1.9, opacity: 0.85 }}>
        <li>Guest identifiers may be used for rate limiting and abuse prevention.</li>
        <li>Owner accounts use email for authentication.</li>
        <li>We may store access request timestamps and outcomes for analytics and auditing.</li>
      </ul>
    </main>
  );
}
