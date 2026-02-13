"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [inviteToken, setInviteToken] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function refreshUser() {
    const { data } = await supabaseBrowser.auth.getUser();
    setEmail(data.user?.email ?? null);
    setLoading(false);
  }

  useEffect(() => {
    refreshUser();
    const { data } = supabaseBrowser.auth.onAuthStateChange(() => refreshUser());
    return () => data.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabaseBrowser.auth.signOut();
    window.location.href = "/login";
  }

  async function redeem(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const fd = new FormData();
    fd.append("token", inviteToken);

    const res = await fetch("/api/owner/redeem-invite", { method: "POST", body: fd });
    const j = await res.json().catch(() => ({}));

    if (!res.ok) {
      setMsg(j?.error || "Failed to redeem invite.");
      return;
    }

    const venueId = j?.venueId || j?.venue_id || j?.venue?.id || null;
    setMsg("Invite redeemed. Redirecting…");

    if (venueId) window.location.href = `/manage/${venueId}`;
    else window.location.href = "/venues";
  }

  if (loading) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 28, fontWeight: 950 }}>Account</h1>
        <p style={{ opacity: 0.85 }}>Loading…</p>
      </main>
    );
  }

  if (!email) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 950 }}>Account</h1>
        <p style={{ opacity: 0.85 }}>You’re not signed in.</p>
        <a href="/login" style={{ fontWeight: 950 }}>
          Go to login →
        </a>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 760, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 950 }}>Account</h1>
      <div style={{ marginTop: 8, opacity: 0.85 }}>
        Signed in as <b>{email}</b>
      </div>

      <button
        onClick={signOut}
        style={{
          marginTop: 12,
          padding: "8px 12px",
          borderRadius: 10,
          border: "1px solid var(--card-border)",
          background: "var(--card-bg)",
          cursor: "pointer",
          fontWeight: 900,
        }}
      >
        Sign out
      </button>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid var(--card-border)", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Redeem invite token</div>
        <p style={{ marginTop: 6, opacity: 0.8 }}>
          Paste your invite token here to unlock venue management.
        </p>

        {msg && (
          <div style={{ marginTop: 10, padding: 12, borderRadius: 12, background: "#f7f7ff", border: "1px solid #e6e6ff", fontWeight: 900 }}>
            {msg}
          </div>
        )}

        <form onSubmit={redeem} style={{ marginTop: 10 }}>
          <label style={{ display: "block", fontWeight: 950, marginBottom: 6 }}>Invite token</label>
          <input
            value={inviteToken}
            onChange={(e) => setInviteToken(e.target.value)}
            required
            placeholder="paste token here"
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid var(--card-border)", fontFamily: "ui-monospace" }}
          />
          <button
            style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "black", color: "white", border: "none", fontWeight: 950, cursor: "pointer" }}
          >
            Redeem
          </button>
        </form>
      </section>
    </main>
  );
}
