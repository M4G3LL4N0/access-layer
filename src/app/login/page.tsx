export const dynamic = "force-dynamic";

import { Suspense } from "react";
import LoginClient from "@/components/LoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 560, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 950 }}>Owner login</h1>
          <p style={{ opacity: 0.8 }}>Loading sign-in…</p>
        </main>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
