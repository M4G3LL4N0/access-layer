import CrmLeadsClient from "@/components/CrmLeadsClient";
import { supabaseService } from "@/lib/supabaseService";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  status: string | null;
  stage: string | null;
  next_action_at: string | null;
  name: string | null;
  email: string | null;
  neighborhood: string | null;
  region: string | null;
  category: string | null;
  source: string | null;
};

type Note = { id: string; lead_id: string; created_at: string; note: string };

export default async function CrmLeadsPage() {
  const supabase = supabaseService();

  const { data: leadsRaw } = await supabase
    .from("leads")
    .select("id, created_at, status, stage, next_action_at, name, email, neighborhood, region, category, source")
    .order("created_at", { ascending: false })
    .limit(200);

  const leads: Lead[] = (leadsRaw || []) as any;

  const leadIds = leads.map((l) => l.id);
  let notesByLeadId: Record<string, Note[]> = {};
  if (leadIds.length) {
    const { data: notesRaw } = await supabase
      .from("lead_notes")
      .select("id, lead_id, created_at, note")
      .in("lead_id", leadIds)
      .order("created_at", { ascending: false })
      .limit(800);

    const notes: Note[] = (notesRaw || []) as any;
    notesByLeadId = notes.reduce((acc: any, n) => {
      acc[n.lead_id] = acc[n.lead_id] || [];
      acc[n.lead_id].push(n);
      return acc;
    }, {});
  }

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <style>{`
        :root{
          --bg:#ffffff; --fg:#0b0f19; --muted:rgba(11,15,25,.70);
          --border:rgba(11,15,25,.12); --card:#ffffff;
          --shadow: 0 10px 30px rgba(0,0,0,.06); --soft: rgba(11,15,25,.06);
          --btn:#0b0f19; --btnFg:#ffffff;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg:#070a12; --fg:#eef1f7; --muted:rgba(238,241,247,.72);
            --border:rgba(238,241,247,.14); --card: rgba(255,255,255,.03);
            --shadow: 0 10px 30px rgba(0,0,0,.40); --soft: rgba(238,241,247,.08);
            --btn:#ffffff; --btnFg:#070a12;
          }
        }
        body{ background:var(--bg); color:var(--fg); }
        a{ color: inherit; }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px 20px", background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>AXW • CRM</div>
            <h1 style={{ margin: "6px 0 0", fontSize: 40, letterSpacing: -1 }}>Leads Pipeline</h1>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 920 }}>
              Fast venue onboarding ops: stage + notes + next action. This is your blitzscale control panel.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignSelf: "flex-start" }}>
            <a href="/contact" style={{ textDecoration: "none", fontWeight: 1000, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)" }}>
              Open /contact
            </a>
            <a href="/outreach" style={{ textDecoration: "none", fontWeight: 1000, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)" }}>
              Open /outreach
            </a>
            <a href="/venues" style={{ textDecoration: "none", fontWeight: 1100, padding: "10px 14px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--btn)", color: "var(--btnFg)" }}>
              Back to /venues →
            </a>
          </div>
        </header>

        <div style={{ marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
          Showing <b>{leads.length}</b> leads (latest first). Notes loaded: <b>{Object.keys(notesByLeadId).length}</b>.
        </div>

        <CrmLeadsClient initialLeads={leads} notesByLeadId={notesByLeadId as any} />
      </div>
    </main>
  );
}
