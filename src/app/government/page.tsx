export default function GovernmentPage() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900 }}>
        Government & Emergency Infrastructure
      </h1>

      <p style={{ marginTop: 20 }}>
        AccessXWorld enables coordinated access to shelters, emergency hubs,
        disaster zones, and public resources.
      </p>

      <h2 style={{ marginTop: 40 }}>Disaster Mode</h2>

      <ul style={{ marginTop: 20, lineHeight: 1.8 }}>
        <li>Controlled shelter access</li>
        <li>Evacuation routing</li>
        <li>Temporary emergency credentials</li>
        <li>Verified aid distribution access</li>
        <li>Audit-traceable access logs</li>
      </ul>

      <p style={{ marginTop: 40 }}>
        Designed for FEMA, city governments, and global disaster response
        coordination.
      </p>
    </main>
  );
}
