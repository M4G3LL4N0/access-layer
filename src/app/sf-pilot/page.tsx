import { SubpageVisual } from "@/components/SubpageVisual";
export default function SfPilotPage() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 900 }}>
      <SubpageVisual variant="default" />
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>
        San Francisco Pilot Program
      </h1>

      <p style={{ marginTop: 20 }}>
        AccessXWorld is launching its first real-world pilot in San Francisco.
      </p>

      <h2 style={{ marginTop: 40 }}>Pilot Goals</h2>

      <ul style={{ lineHeight: 1.8 }}>
        <li>5 active venues within 30 days</li>
        <li>500+ access requests</li>
        <li>Data collection for enterprise rollout</li>
        <li>City expansion readiness</li>
      </ul>

      <h2 style={{ marginTop: 40 }}>Why SF</h2>

      <p>
        Dense urban infrastructure, high-tech adoption, real estate
        concentration, and public access friction.
      </p>
    </main>
  );
}
