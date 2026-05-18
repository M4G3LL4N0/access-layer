import { SubpageVisual } from "@/components/SubpageVisual";
export default function ApiDocsPage() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 1000 }}>
      <SubpageVisual variant="default" />
      <h1 style={{ fontSize: 40, fontWeight: 900 }}>
        AccessXWorld API
      </h1>

      <h2 style={{ marginTop: 30 }}>Core Endpoints</h2>

      <pre style={{ background: "#111", color: "#0f0", padding: 20 }}>
{`POST /api/request-access
GET /api/pass/:token
POST /api/verify
GET /api/venues
GET /api/availability`}
      </pre>

      <p style={{ marginTop: 20 }}>
        AccessXWorld is designed to be embedded into lock systems, identity
        providers, enterprise software, and city infrastructure.
      </p>
    </main>
  );
}
