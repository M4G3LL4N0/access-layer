"use client";

import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!mounted) return;

      if (error) {
        setUserId(null);
        setEmail(null);
        return;
      }

      setUserId(data.user?.id ?? null);
      setEmail(data.user?.email ?? null);
    })();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Account</h1>

      <div style={{ marginTop: 12, padding: 12, border: "1px solid #eee" }}>
        <p style={{ margin: 0 }}>
          <strong>Email:</strong> {email ?? "—"}
        </p>
        <p style={{ margin: "6px 0 0 0" }}>
          <strong>UUID:</strong> {userId ?? "—"}
        </p>
      </div>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          setUserId(null);
          setEmail(null);
          window.location.href = "/";
        }}
        style={{
          marginTop: 14,
          padding: "8px 12px",
          background: "black",
          color: "white",
          borderRadius: 8,
          border: 0,
          cursor: "pointer",
        }}
      >
        Sign out
      </button>
    </div>
  );
}
