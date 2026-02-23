import Link from "next/link";

export default function TermsPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <Link href="/" style={{ opacity: 0.8 }}>← Home</Link>
      <h1 style={{ marginTop: 14, fontSize: 32, fontWeight: 950 }}>Terms</h1>
      <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7 }}>
        Access ↔ Space provides a rule-based access pass system. Access decisions may depend on venue rules,
        availability, and abuse prevention. The service is provided “as is” with no guarantee of access.
      </p>
      <ul style={{ marginTop: 10, lineHeight: 1.9, opacity: 0.85 }}>
        <li>No publication of door codes via this product.</li>
        <li>Venues remain responsible for compliance, safety, and onsite operations.</li>
        <li>Abuse, fraud, or circumvention attempts may be blocked.</li>
      </ul>
    </main>
  );
}
