export default function EnterprisePage() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900 }}>
        Enterprise Access Infrastructure
      </h1>

      <p style={{ marginTop: 20 }}>
        For coworking chains, office buildings, campuses, logistics hubs,
        hospitality groups, and global property operators.
      </p>

      <h2 style={{ marginTop: 40 }}>Enterprise Capabilities</h2>

      <ul style={{ marginTop: 20, lineHeight: 1.8 }}>
        <li>Multi-location dashboards</li>
        <li>Centralized rule templates</li>
        <li>Access monetization</li>
        <li>Real-time verification</li>
        <li>Audit logs</li>
        <li>API integration with locks & identity providers</li>
      </ul>

      <h2 style={{ marginTop: 40 }}>Enterprise Pricing Model</h2>

      <ul style={{ marginTop: 20 }}>
        <li>$29–$299 per location (SaaS)</li>
        <li>Transaction fees for paid access</li>
        <li>Enterprise license agreements</li>
      </ul>
    </main>
  );
}
