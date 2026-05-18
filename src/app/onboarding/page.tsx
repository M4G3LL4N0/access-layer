import { SubpageVisual } from "@/components/SubpageVisual";
export default function OnboardingPage() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 900 }}>
      <SubpageVisual variant="default" />
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>
        Venue Onboarding — Free Pilot
      </h1>

      <ol style={{ marginTop: 30, lineHeight: 1.8 }}>
        <li>Create venue profile</li>
        <li>Set access hours & rules</li>
        <li>Print QR signage</li>
        <li>Start issuing secure access passes</li>
      </ol>

      <p style={{ marginTop: 30 }}>
        No hardware required. No code publishing. Full control retained.
      </p>
    </main>
  );
}
