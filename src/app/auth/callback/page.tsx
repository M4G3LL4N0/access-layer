import { Suspense } from "react";
import AuthCallbackClient from "@/components/AuthCallbackClient";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: "system-ui" }}>Loading…</div>}>
      <AuthCallbackClient />
    </Suspense>
  );
}
