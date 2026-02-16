"use client";

import { useMemo, useState } from "react";

type LeadForm = {
  name: string;
  email: string;
  venueName: string;
  category: string;
  city: string;
  region: string;
  note: string;
  wantsStaffVerify: boolean;
};

export default function NewOnboardingPage() {
  const [form, setForm] = useState<LeadForm>({
    name: "",
    email: "",
    venueName: "",
    category: "restroom",
    city: "San Francisco",
    region: "CA",
    note: "",
    wantsStaffVerify: true,
  });

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.trim().includes("@") &&
      form.venueName.trim().length >= 2 &&
      form.city.trim().length >= 2 &&
      form.region.trim().length >= 2
    );
  }, [form]);

  async function submit() {
    setErr(null);
    setOk(false);
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          venue_name: form.venueName,
          category: form.category,
          city: form.city,
          region: form.region,
          note: form.note,
          wants_staff_verify: form.wantsStaffVerify,
          source: "onboarding_new",
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || json?.msg || `HTTP ${res.status}`);
      }

      setOk(true);
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#0b0b0b",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "44px 20px" }}>
        <a
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            opacity: 0.85,
            fontWeight: 800,
          }}
        >
          ← Home
        </a>

        <h1 style={{ margin: "14px 0 6px", fontSize: 34, fontWeight: 1000 }}>
          Start a Pilot
        </h1>
        <p style={{ margin: 0, opacity: 0.85, maxWidth: 760, lineHeight: 1.6 }}>
          Tell us the venue and what you want to enable. We’ll onboard you into
          the Access ↔ Space pilot and send a pilot pack (signage + verify
          workflow).
        </p>

        <div
          style={{
            marginTop: 18,
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 18,
            padding: 16,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            <Field
              label="Your name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Jane Owner"
            />
            <Field
              label="Email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="owner@venue.com"
              type="email"
            />
            <Field
              label="Venue name"
              value={form.venueName}
              onChange={(v) => setForm({ ...form, venueName: v })}
              placeholder="Hayes Valley Cafe"
            />
            <SelectField
              label="Category"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
              options={[
                { label: "Restroom", value: "restroom" },
                { label: "Workspace", value: "workspace" },
                { label: "Office", value: "office" },
                { label: "Study room", value: "study_room" },
                { label: "Gym", value: "gym" },
                { label: "Museum", value: "museum" },
                { label: "Other", value: "other" },
              ]}
            />
            <Field
              label="City"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
              placeholder="San Francisco"
            />
            <Field
              label="Region / State"
              value={form.region}
              onChange={(v) => setForm({ ...form, region: v })}
              placeholder="CA"
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>
              Note (optional)
            </label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={5}
              placeholder="What access flow do you want? Hours? Staff verify? Special constraints?"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(0,0,0,0.35)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 900,
                opacity: 0.95,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.wantsStaffVerify}
                onChange={(e) =>
                  setForm({ ...form, wantsStaffVerify: e.target.checked })
                }
              />
              Staff verification (recommended)
            </label>
          </div>

          {err && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                border: "1px solid rgba(255,120,120,0.35)",
                background: "rgba(255,0,0,0.12)",
                fontWeight: 900,
              }}
            >
              {err}
            </div>
          )}

          {ok && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                border: "1px solid rgba(120,255,160,0.35)",
                background: "rgba(0,255,120,0.12)",
                fontWeight: 900,
              }}
            >
              Submitted. We’ll reach out shortly.
            </div>
          )}

          <button
            onClick={submit}
            disabled={!canSubmit || loading}
            style={{
              marginTop: 14,
              padding: "12px 14px",
              borderRadius: 14,
              background: canSubmit && !loading ? "white" : "rgba(255,255,255,0.25)",
              color: "black",
              fontWeight: 1000,
              border: "none",
              cursor: canSubmit && !loading ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "Submitting..." : "Submit pilot request"}
          </button>

          <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
            This creates a lead record (demo onboarding). No sensitive codes are stored or displayed.
          </div>
        </div>
      </div>
    </main>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        type={props.type || "text"}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          outline: "none",
        }}
      />
    </div>
  );
}

function SelectField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>
        {props.label}
      </label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          outline: "none",
        }}
      >
        {props.options.map((o) => (
          <option key={o.value} value={o.value} style={{ color: "black" }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
