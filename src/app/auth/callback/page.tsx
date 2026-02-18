"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const next = searchParams.get("next") || "/account";

    if (!code) {
      router.replace("/login?error=missing_code");
      return;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) router.replace("/login?error=exchange_failed");
      else router.replace(next);
    });
  }, [router, searchParams]);

  return (
    <main style={{ padding: 40, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ margin: 0, fontSize: 18 }}>Signing you in…</h1>
      <p style={{ opacity: 0.75, marginTop: 10 }}>
        Finishing authentication and redirecting to your account.
      </p>
    </main>
  );
}

export default function AuthCallbackPage() {
  // Next.js requires Suspense when using useSearchParams in App Router pages.
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Signing you in…</div>}>
      <CallbackInner />
    </Suspense>
  );
}
