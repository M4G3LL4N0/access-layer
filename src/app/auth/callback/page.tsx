export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AuthCallbackClient from "@/components/AuthCallbackClient";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main style={{ padding: 24, fontFamily: "system-ui" }}>
          <h1 style={{ fontSize: 28, fontWeight: 950 }}>Auth</h1>
          <p style={{ opacity: 0.85 }}>Signing you in…</p>
        </main>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}
