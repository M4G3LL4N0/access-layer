export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

export default async function AccountPage() {
  const supabase = await supabaseServerAuth();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 950 }}>Account</h1>
        <p style={{ opacity: 0.85 }}>You’re not signed in.</p>
        <Link href="/login" style={{ fontWeight: 950 }}>
          Go to login →
        </Link>
      </main>
    );
  }

  const { data: invites } = await supabase
    .from("venue_owner_invites")
    .select("id,venue_id,expires_at,created_at")
    .eq("email", user.email!)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: memberships } = await supabase
    .from("venue_members")
    .select("venue_id,role,created_at,venues(id,name,city,region,status)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/owners" style={{ opacity: 0.8 }}>
          ← Owners
        </Link>
        <Link href="/venues" style={{ opacity: 0.8 }}>
          Directory
        </Link>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 32, fontWeight: 950 }}>Account</h1>
      <div style={{ marginTop: 6, opacity: 0.85 }}>
        Signed in as <b>{user.email}</b>
      </div>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Redeem invite</div>
        <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
          If an admin sent you an invite token, paste it here to claim management access.
        </p>

        <form action="/api/owner/redeem-invite" method="post" style={{ marginTop: 10, maxWidth: 560 }}>
          <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Invite token</label>
          <input
            name="token"
            required
            placeholder="paste token"
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
          />
          <button
            style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 10,
              background: "black",
              color: "white",
              border: "none",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            Redeem
          </button>
        </form>

        {invites && invites.length > 0 && (
          <div style={{ marginTop: 14, opacity: 0.85, fontSize: 12 }}>
            Recent invites found for your email (tokens hidden).
          </div>
        )}
      </section>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Your venues</div>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {(memberships || []).length === 0 && (
            <div style={{ opacity: 0.85 }}>
              No venues linked yet. Redeem an invite token or request onboarding from the Owners page.
            </div>
          )}

          {(memberships || []).map((m: any) => (
            <div key={m.venue_id} style={{ padding: 12, borderRadius: 14, border: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 950 }}>{m.venues?.name || m.venue_id}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  role: {m.role} · status: {m.venues?.status}
                </div>
              </div>

              <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`/v/${m.venue_id}`} style={{ opacity: 0.85 }}>
                  View
                </Link>
                <Link href={`/manage/${m.venue_id}`} style={{ fontWeight: 950 }}>
                  Manage →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
