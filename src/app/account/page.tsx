"use client";

import React, { useEffect, useMemo, useState } from "react";
import MarketingShell from "@/components/MarketingShell";
import { supabaseBrowser } from "@/lib/supabase/client";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    if (!hasSupabasePublicEnv() || !supabase) {
      setStatus("Supabase env not configured on this deployment.");
      return;
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        setStatus("Not signed in.");
        setUserId(null);
        return;
      }
      setUserId(data.user?.id ?? null);
      setStatus(data.user ? "Signed in" : "Not signed in.");
    });
  }, [supabase]);

  return (
    <MarketingShell>
      <div style={{ maxWidth: 860 }}>
        <div style={{ fontSize: 12, color: "#666", fontWeight: 900, letterSpacing: 1 }}>ACCOUNT</div>
        <h1 style={{ margin: "8px 0 0", fontSize: 44, letterSpacing: -0.9 }}>Account</h1>

        <p style={{ marginTop: 10, color: "#333", lineHeight: 1.6, fontSize: 16 }}>
          Status: <b>{status}</b>
        </p>

        <div style={{ marginTop: 12, border: "1px solid #eee", borderRadius: 18, padding: 18, background: "white" }}>
          <div style={{ fontSize: 13, color: "#666", fontWeight: 900 }}>User</div>
          <div style={{ marginTop: 8, fontSize: 14 }}>
            UUID: <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace" }}>{userId ?? "—"}</span>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 999,
                border: "1px solid #e6e6e6",
                background: "white",
                textDecoration: "none",
                color: "black",
                fontWeight: 900,
              }}
            >
              Login →
            </a>

            <button
              onClick={async () => {
                if (!supabase) {
                  alert("Supabase env not configured.");
                  return;
                }
                await supabase.auth.signOut();
                setUserId(null);
                setStatus("Signed out.");
              }}
              style={{
                padding: "12px 14px",
                borderRadius: 999,
                border: "1px solid #e6e6e6",
                background: "black",
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        <div style={{ marginTop: 16, color: "#666", fontSize: 13, lineHeight: 1.6 }}>
          If this shows “env not configured”, add the environment variables in Vercel:
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </div>
      </div>
    </MarketingShell>
  );
}
