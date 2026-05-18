import Link from "next/link";
import MarketingShell from "@/components/MarketingShell";
import { AccessLayerDemoWorkspace } from "@/components/AccessLayerDemoWorkspace";

export default function DemoPage() {
  return (
    <MarketingShell>
      <h1>AXW live demo path</h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6 }}>
        Interactive pilot: issue a demo credential and verify at a lane. Not production security
        certification or live municipal deployment.
      </p>
      <AccessLayerDemoWorkspace />
      <p className="muted" style={{ marginTop: 32, fontSize: 13 }}>
        Static route map:{" "}
        <Link href="/v2/credentials">credentials</Link> · <Link href="/verify">verify</Link> ·{" "}
        <Link href="/ops">ops</Link> · <Link href="/network">network</Link>
      </p>
    </MarketingShell>
  );
}
