import { SubpageVisual } from "@/components/SubpageVisual";
export const dynamic = "force-dynamic";

export default function HealthPage() {
  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <SubpageVisual variant="default" />
      <h1 style={{ margin: 0 }}>OK</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>AXW 3.0 routing is alive.</p>
    </main>
  );
}
