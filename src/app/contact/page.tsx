"use client";

import { useMemo, useState } from "react";

type LeadResp =
  | { ok: true; lead: { id: string; created_at: string; status: string } }
  | { ok: false; error: string };

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const styles = useMemo(() => {
    const cardBg = "rgba(15, 23, 42, 0.72)";
    const panelBg = "rgba(2, 6, 23, 0.92)";
    const border = "1px solid rgba(148, 163, 184, 0.22)";
    const inputBg = "rgba(2, 6, 23, 0.65)";
    const inputBorder = "1px solid rgba(148, 163, 184, 0.22)";
    const text = "rgba(255,255,255,0.92)";
    const muted = "rgba(255,255,255,0.62)";

    return {
      page: {
        minHeight: "100vh",
        padding: "40px 16px",
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        color: text,
        background:
          "radial-gradient(1200px 700px at 20% 10%, rgba(59,130,246,0.16), transparent 60%), radial-gradient(900px 600px at 80% 20%, rgba(168,85,247,0.14), transparent 60%), #020617",
      } as const,
      wrap: {
        maxWidth: 920,
        margin: "0 auto",
      } as const,
      headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 18,
      } as const,
      title: {
        fontSize: 28,
        fontWeight: 900,
        letterSpacing: -0.4,
        margin: 0,
      } as const,
      subtitle: {
        marginTop: 6,
        marginBottom: 0,
        color: muted,
        lineHeight: 1.5,
        maxWidth: 720,
      } as const,
      linkRow: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
      } as const,
      link: {
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        border,
        textDecoration: "none",
        color: text,
        background: "rgba(2,6,23,0.35)",
        fontWeight: 800,
        fontSize: 13,
      } as const,
      card: {
        borderRadius: 18,
        background: cardBg,
        border,
        padding: 18,
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
      } as const,
      form: {
        display: "grid",
        gap: 14,
        marginTop: 14,
      } as const,
      grid2: {
        display: "grid",
        gap: 12,
        gridTemplateColumns: "1fr",
      } as const,
      // We’ll apply this classless “two column on wider screens” behavior inline
      // by using a media query in <style> below.
      label: {
        fontSize: 13,
        fontWeight: 900,
        color: "rgba(255,255,255,0.80)",
        marginBottom: 6,
        display: "block",
      } as const,
      input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 12px",
        borderRadius: 12,
        border: inputBorder,
        outline: "none",
        background: inputBg,
        color: text,
        fontSize: 14,
      } as const,
      textarea: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 12px",
        borderRadius: 12,
        border: inputBorder,
        outline: "none",
        background: inputBg,
        color: text,
        fontSize: 14,
        minHeight: 110,
        resize: "vertical" as const,
      } as const,
      button: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 14px",
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        background: "white",
        color: "black",
        fontWeight: 950,
        fontSize: 14,
      } as const,
      helper: {
        marginTop: 10,
        color: muted,
        fontSize: 13,
      } as const,
      alertOk: {
        borderRadius: 14,
        padding: 12,
        border: "1px solid rgba(34,197,94,0.35)",
        background: "rgba(34,197,94,0.10)",
        color: "rgba(255,255,255,0.92)",
        fontWeight: 800,
      } as const,
      alertErr: {
        borderRadius: 14,
        padding: 12,
        border: "1px solid rgba(239,68,68,0.35)",
        background: "rgba(239,68,68,0.10)",
        color: "rgba(255,255,255,0.92)",
        fontWeight: 800,
      } as const,
      panel: {
        marginTop: 14,
        borderRadius: 16,
        border,
        background: panelBg,
        padding: 14,
        color: muted,
        fontSize: 13,
        lineHeight: 1.55,
      } as const,
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      const res = await fetch("/api/lead", {
        method: "POST",
        body: fd,
      });

      const json = (await res.json()) as LeadResp;

      if (!res.ok || !json || (json as any).ok === false) {
        const msg =
          (json as any)?.error ||
          `Request failed (HTTP ${res.status}). Please try again.`;
        setErr(msg);
        return;
      }

      const leadId = (json as any).lead?.id;
      setOk(leadId ? `Submitted. Lead ID: ${leadId}` : "Submitted.");
      form.reset();
      // Optional: redirect to onboarding
      // window.location.href = `/onboarding?leadId=${encodeURIComponent(leadId || "")}`;
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      {/* Responsive helper: 2-column rows at >= 720px */}
      <style>{`
        @media (min-width: 720px) {
          .grid2 {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div style={styles.wrap}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Request onboarding</h1>
            <p style={styles.subtitle}>
              Pilot is free. Tell us the venue + the access workflow you want to
              control (hours, staff verification, paid access, etc.).
            </p>
          </div>

          <div style={styles.linkRow}>
            <a href="/" style={styles.link}>
              ← Home
            </a>
            <a href="/venues" style={styles.link}>
              Venue directory
            </a>
            <a href="/investors" style={styles.link}>
              Investors
            </a>
          </div>
        </div>

        <div style={styles.card}>
          {ok && <div style={styles.alertOk}>{ok}</div>}
          {err && <div style={styles.alertErr}>{err}</div>}

          <form onSubmit={onSubmit} style={styles.form}>
            <div>
              <label style={styles.label}>Email *</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@venue.com"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Name</label>
              <input name="name" placeholder="Your name" style={styles.input} />
            </div>

            <div>
              <label style={styles.label}>Venue / Company</label>
              <input
                name="venue"
                placeholder="Venue name"
                style={styles.input}
              />
            </div>

            {/* ✅ FIXED: City + Region are in a grid with gap + boxSizing */}
            <div className="grid2" style={styles.grid2}>
              <div>
                <label style={styles.label}>City</label>
                <input
                  name="city"
                  placeholder="San Francisco"
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Region/State</label>
                <input name="region" placeholder="CA" style={styles.input} />
              </div>
            </div>

            <div>
              <label style={styles.label}>Venue Type</label>
              <input
                name="category"
                placeholder="restroom / workspace / office / event / gym"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                placeholder="What access problem are you trying to solve? Hours? Staff verification? Paid access?"
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Submitting…" : "Request onboarding"}
            </button>

            <div style={styles.helper}>
              We’ll follow up with a 10-minute setup plan + suggested signage +
              a pilot pack link.
            </div>

            <div style={styles.panel}>
              <b>What happens next:</b> We create a pilot venue entry, configure
              your first rule (hours, limits, mode), and give you staff
              verification (QR → API verify) so you can test immediately.
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
