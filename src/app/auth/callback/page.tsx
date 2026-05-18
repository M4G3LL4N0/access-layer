import { Suspense } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import AuthCallbackClient from "@/components/AuthCallbackClient";

export default function AuthCallbackPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <Suspense fallback={<div style={{ padding: 24, fontFamily: "system-ui" }}>Loading…</div>}>
      <AuthCallbackClient />
    </Suspense>
  </>
  )
}
