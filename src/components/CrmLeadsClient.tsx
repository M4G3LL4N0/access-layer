"use client";

import { useMemo, useState } from "react";

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

type Note = { id: string; created_at: string; note: string };

export default function CrmLeadsClient({
  initialLeads,
  notesByLeadId,
}: {
  initialLeads: Lead[];
  notesByLeadId: Record<string, Note[]>;
}) {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<string>("all");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return leads.filter((l) => {
      const matchesStage = stage === "all" ? true : (l.stage || "new") === stage;
      if (!matchesStage) return false;

      if (!qq) return true;
      const hay = [
        l.name,
        l.email,
        l.neighborhood,
        l.region,
        l.category,
        l.source,
        l.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(qq);
    });
  }, [leads, q, stage]);

  async function setLeadStage(leadId: string, nextStage: any) {
    setBusyId(leadId);
    try {
      const res = await fetch("/api/crm/lead-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, stage: nextStage }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Failed");
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: nextStage } : l))
      );
    } catch (e: any) {
      alert(e?.message || "Stage update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function setNextAction(leadId: string, dt: string | null) {
    setBusyId(leadId);
    try {
      const res = await fetch("/api/crm/lead-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, next_action_at: dt }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Failed");
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, next_action_at: dt } : l))
      );
    } catch (e: any) {
      alert(e?.message || "Next action update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function addNote(leadId: string) {
    const note = (noteText[leadId] || "").trim();
    if (!note) return;
    setBusyId(leadId);
    try {
      const res = await fetch("/api/crm/lead-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, note }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Failed");
      setNoteText((prev) => ({ ...prev, [leadId]: "" }));
      // Soft refresh: simplest is reload; keeps it reliable for demo speed
      window.location.reload();
    } catch (e: any) {
      alert(e?.message || "Add note failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search leads (name, email, neighborhood, category)…"
          style={{
            flex: "1 1 320px",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--fg)",
          }}
        />
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--fg)",
          }}
        >
          <option value="all">All stages</option>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="pilot_offered">pilot_offered</option>
          <option value="piloting">piloting</option>
          <option value="closed_won">closed_won</option>
          <option value="closed_lost">closed_lost</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((l) => {
          const currentStage = l.stage || "new";
          const notes = notesByLeadId[l.id] || [];
          return (
            <div
              key={l.id}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: 14,
                background: "var(--card)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 1100 }}>
                    {l.name || "(no name)"}{" "}
                    <span style={{ opacity: 0.6, fontWeight: 900 }}>
                      · {l.email || "(no email)"}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
                    {l.neighborhood || "—"} · {l.region || "—"} · {l.category || "—"}{" "}
                    <span style={{ opacity: 0.7 }}>· status: {l.status || "—"}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <select
                    value={currentStage}
                    disabled={busyId === l.id}
                    onChange={(e) => setLeadStage(l.id, e.target.value)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "transparent",
                      color: "var(--fg)",
                      fontWeight: 900,
                    }}
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="pilot_offered">pilot_offered</option>
                    <option value="piloting">piloting</option>
                    <option value="closed_won">closed_won</option>
                    <option value="closed_lost">closed_lost</option>
                  </select>

                  <button
                    disabled={busyId === l.id}
                    onClick={() => {
                      const dt = new Date(Date.now() + 24 * 60 * 60 * 1000);
                      setNextAction(l.id, dt.toISOString());
                    }}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--btn)",
                      color: "var(--btnFg)",
                      fontWeight: 1000,
                      cursor: "pointer",
                    }}
                  >
                    Next: +24h
                  </button>

                  <button
                    disabled={busyId === l.id}
                    onClick={() => setNextAction(l.id, null)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "transparent",
                      color: "var(--fg)",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    Clear next
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                <div style={{ fontWeight: 1000, opacity: 0.9 }}>Notes</div>

                {notes.length === 0 ? (
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>
                    No notes yet.
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: 6 }}>
                    {notes.slice(0, 6).map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: 10,
                          borderRadius: 14,
                          border: "1px solid var(--border)",
                          background: "var(--soft)",
                        }}
                      >
                        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>
                          {new Date(n.created_at).toLocaleString()}
                        </div>
                        <div style={{ marginTop: 4, fontSize: 13 }}>{n.note}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    value={noteText[l.id] || ""}
                    onChange={(e) =>
                      setNoteText((prev) => ({ ...prev, [l.id]: e.target.value }))
                    }
                    placeholder="Add note (call outcome, objections, next step)…"
                    style={{
                      flex: "1 1 320px",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "transparent",
                      color: "var(--fg)",
                    }}
                  />
                  <button
                    disabled={busyId === l.id}
                    onClick={() => addNote(l.id)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--btn)",
                      color: "var(--btnFg)",
                      fontWeight: 1100,
                      cursor: "pointer",
                    }}
                  >
                    Add note
                  </button>
                </div>

                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  Next action:{" "}
                  <b>
                    {l.next_action_at ? new Date(l.next_action_at).toLocaleString() : "—"}
                  </b>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
