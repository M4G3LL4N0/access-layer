export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminLeadsPage() {
  // NOTE: In this codebase supabaseServer is a client instance (NOT a function).
  const supabase = supabaseServer;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, email, name, company, city, region, venue_type, status, message")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 30, fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, fontWeight: 900 }}>Admin — Leads</h1>
        <p style={{ opacity: 0.75 }}>
          Incoming venue onboarding requests (demo admin view).
        </p>

        <div style={{ marginTop: 14 }}>
          <Link href="/admin" style={{ textDecoration: "underline" }}>
            ← Back to Admin
          </Link>
        </div>

        {error ? (
          <pre style={{ marginTop: 16, color: "crimson", whiteSpace: "pre-wrap" }}>
            {error.message}
          </pre>
        ) : null}

        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {(leads || []).map((l) => (
            <div
              key={l.id}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "1px solid #ddd",
                background: "white",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 16 }}>
                {l.company || "(no company)"} — {l.status}
              </div>
              <div style={{ opacity: 0.8 }}>
                {l.name || "(no name)"} · {l.email}
              </div>
              <div style={{ opacity: 0.7, marginTop: 6 }}>
                {(l.city || "") + (l.region ? ` — ${l.region}` : "")} ·{" "}
                {l.venue_type || "unknown"}
              </div>
              {l.message ? (
                <div style={{ marginTop: 10, opacity: 0.9 }}>{l.message}</div>
              ) : null}
              <div style={{ marginTop: 10, opacity: 0.65, fontSize: 12 }}>
                {new Date(l.created_at).toLocaleString()}
              </div>
            </div>
          ))}
          {!error && (!leads || leads.length === 0) ? (
            <div style={{ opacity: 0.75 }}>No leads yet. Submit one via /contact.</div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
