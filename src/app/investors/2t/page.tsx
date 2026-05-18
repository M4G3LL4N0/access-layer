import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function TwoTPage() {
  return (
    <main style={{ padding: 40, maxWidth: 1100 }}>
      <SubpageVisual variant="default" />
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>
        The $2 Trillion Path
      </h1>

      <p style={{ marginTop: 10 }}>
        Density → Policy → Verification → Enterprise → Global.
      </p>

      <div style={{ marginTop: 40, display: "grid", gap: 20 }}>
        <Year title="Year 1: Pilot" text="Signage + kiosk + logs." />
        <Year title="Year 2: Density" text="Neighborhood clusters." />
        <Year title="Year 3: Multi-vertical" text="Restrooms + cowork + events." />
        <Year title="Year 4: Trust Graph" text="Cross-venue identity compounding." />
        <Year title="Year 5: Integrations" text="Property ops + check-in + payments." />
        <Year title="Year 6: Enterprise" text="Portfolio operators + SLAs." />
        <Year title="Year 7+: Global" text="Standardized onboarding." />
      </div>

      <div style={{ marginTop: 40 }}>
        <Link href="/investors/interactive">
          → Back to Scenario Engine
        </Link>
      </div>
    </main>
  );
}

function Year({ title, text }: any) {
  return (
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12 }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 6 }}>{text}</div>
    </div>
  );
}
