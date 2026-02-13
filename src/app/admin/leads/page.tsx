export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

type Lead = {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
  company: string | null;
  city: string | null;
  region: string | null;
  venue_type: string | null;
  status: string;
  message: string | null;
};

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        border: "1px solid #ddd",
        fontSize: 12,
        fontWeight: 800,
        opacity: 0.9,
      }}
    >
      {text}
    </span>
  );
}

function Button({
  label,
  onClick,
}: {
  label: string;
  onClick: string;
}) {
  return (
    <button
      type="button"
      data-onclick={onClick}
      style={{
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid #ddd",
        background: "white",
        cursor: "pointer",
        fontWeight: 800,
      }}
    >
      {label}
    </button>
  );
}

export default async function AdminLeadsPage() {
  const supabase = supabaseServer;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, email, name, company, city, region, venue_type, status, message")
    .order("created_at", { ascending: false })
    .limit(200);

  // Inline client script (simple + fast) to avoid adding a client component right now
  const script = `
  (function(){
    async function post(url, body){
      const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      return res.json();
    }
    document.addEventListener('click', async (e) => {
      const btn = e.target && e.target.closest && e.target.closest('button[data-onclick]');
      if(!btn) return;
      const payload = JSON.parse(btn.getAttribute('data-onclick'));
      btn.disabled = true;
      const out = await post('/api/admin/lead-status', payload);
      if(out && out.ok){
        location.reload();
      } else {
        alert((out && out.error) || 'Error');
        btn.disabled = false;
      }
    });
  })();
  `;

  return (
    <main style={{ padding: 30, fontFamily: "system-ui", background: "#f6f7fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, fontWeight: 900 }}>Admin — Leads</h1>
        <p style={{ opacity: 0.75 }}>
          Incoming venue onboarding requests. Update status and send a Pilot Pack link.
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
          {(leads as Lead[] | null || []).map((l) => (
            <div
              key={l.id}
              style={{
                padding: 14,
                borderRadius: 14,
                border: "1px solid #e5e7eb",
                background: "white",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 900, fontSize: 16 }}>
                  {l.company || "(no company)"}{" "}
                  <span style={{ marginLeft: 8 }}>
                    <Badge text={l.status} />
                  </span>
                </div>
                <div style={{ opacity: 0.7, fontSize: 12 }}>
                  {new Date(l.created_at).toLocaleString()}
                </div>
              </div>

              <div style={{ marginTop: 6, opacity: 0.85 }}>
                {(l.name || "(no name)")} · <b>{l.email}</b>
              </div>

              <div style={{ opacity: 0.7, marginTop: 6 }}>
                {(l.city || "") + (l.region ? ` — ${l.region}` : "")} ·{" "}
                {l.venue_type || "unknown"}
              </div>

              {l.message ? (
                <div style={{ marginTop: 10, opacity: 0.9 }}>{l.message}</div>
              ) : null}

              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button
                  label="Mark Contacted"
                  onClick={JSON.stringify({ id: l.id, status: "contacted" })}
                />
                <Button
                  label="Mark Qualified"
                  onClick={JSON.stringify({ id: l.id, status: "qualified" })}
                />
                <Button
                  label="Mark Converted"
                  onClick={JSON.stringify({ id: l.id, status: "converted" })}
                />
                <Button
                  label="Close Lost"
                  onClick={JSON.stringify({ id: l.id, status: "closed_lost" })}
                />

                <a
                  href={`/admin/pilot-pack?leadId=${l.id}`}
                  style={{
                    marginLeft: "auto",
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid #111",
                    background: "#111",
                    color: "white",
                    fontWeight: 900,
                    textDecoration: "none",
                  }}
                >
                  Pilot Pack →
                </a>
              </div>
            </div>
          ))}

          {!error && (!leads || (leads as any[]).length === 0) ? (
            <div style={{ opacity: 0.75 }}>No leads yet. Submit one via /contact.</div>
          ) : null}
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: script }} />
    </main>
  );
}
