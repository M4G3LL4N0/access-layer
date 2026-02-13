export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

type Params = Promise<{ venueId: string }>;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  help,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  help?: string;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <label style={{ display: "block", fontWeight: 950, marginBottom: 6 }}>{label}</label>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        type={type}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--card-border)",
          fontFamily: "system-ui",
        }}
      />
      {help && <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>{help}</div>}
    </div>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
  help,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: { value: string; label: string }[];
  help?: string;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <label style={{ display: "block", fontWeight: 950, marginBottom: 6 }}>{label}</label>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--card-border)",
          fontFamily: "system-ui",
          background: "var(--card-bg)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {help && <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>{help}</div>}
    </div>
  );
}

export default async function ManageVenuePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: Promise<{ ok?: string; err?: string }>;
}) {
  const { venueId } = await params;
  const sp = (await searchParams) || {};
  const ok = sp.ok === "1";
  const err = sp.err || "";

  if (!UUID_RE.test(venueId)) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 26, fontWeight: 950 }}>Manage venue</h1>
        <p style={{ opacity: 0.85 }}>Invalid venueId.</p>
      </main>
    );
  }

  const supabase = await supabaseServerAuth();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 950 }}>Manage venue</h1>
        <p style={{ opacity: 0.85 }}>Please sign in to manage venues.</p>
        <Link href="/login" style={{ fontWeight: 950 }}>
          Go to login →
        </Link>
      </main>
    );
  }

  // Membership check
  const { data: member } = await supabase
    .from("venue_members")
    .select("role")
    .eq("venue_id", venueId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!member) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
        <Link href="/account" style={{ opacity: 0.8 }}>
          ← Account
        </Link>
        <h1 style={{ marginTop: 14, fontSize: 28, fontWeight: 950 }}>No access</h1>
        <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
          Your account ({user.email}) is not authorized to manage this venue yet.
          Ask an admin to send you an invite, then redeem it on your account page.
        </p>
        <Link href="/account" style={{ fontWeight: 950 }}>
          Go to account →
        </Link>
      </main>
    );
  }

  // Load venue + its default rule (first rule)
  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .select("id,name,city,region,category,status")
    .eq("id", venueId)
    .maybeSingle();

  if (vErr || !venue) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
        <Link href="/account" style={{ opacity: 0.8 }}>
          ← Account
        </Link>
        <h1 style={{ marginTop: 14, fontSize: 28, fontWeight: 950 }}>Venue not found</h1>
        <p style={{ opacity: 0.85 }}>{vErr?.message || "Could not load venue."}</p>
      </main>
    );
  }

  const { data: rule } = await supabase
    .from("access_rules")
    .select("id,label,start_time,end_time,max_per_day,cooldown_minutes,mode,is_active")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href={`/v/${venueId}`} style={{ opacity: 0.8 }}>
          ← Back to venue
        </Link>
        <Link href="/account" style={{ opacity: 0.8 }}>
          Account
        </Link>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 32, fontWeight: 950 }}>
        Manage — {venue.name}
      </h1>
      <div style={{ marginTop: 6, opacity: 0.85 }}>
        role: <b>{member.role}</b> · venueId: <span style={{ fontFamily: "ui-monospace" }}>{venueId}</span>
      </div>

      {ok && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            background: "#f0fff4",
            border: "1px solid #c9f2d3",
            fontWeight: 900,
          }}
        >
          Saved.
        </div>
      )}

      {err && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            background: "#fff3f3",
            border: "1px solid #ffd2d2",
            fontWeight: 900,
          }}
        >
          Error: {err}
        </div>
      )}

      <section style={{ marginTop: 18, padding: 16, border: "1px solid var(--card-border)", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Venue</div>

        <form action="/api/owner/update-venue" method="post" style={{ marginTop: 10, maxWidth: 720 }}>
          <input type="hidden" name="venueId" value={venueId} />

          <Field label="Name" name="name" defaultValue={venue.name} />
          <Select
            label="Status"
            name="status"
            defaultValue={venue.status}
            options={[
              { value: "active", label: "active" },
              { value: "inactive", label: "inactive" },
            ]}
          />

          <button
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 10,
              background: "black",
              color: "white",
              border: "none",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            Save venue
          </button>
        </form>
      </section>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid var(--card-border)", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Access rule (default)</div>

        {!rule ? (
          <div style={{ marginTop: 10, opacity: 0.85 }}>
            No rule exists yet for this venue. Ask admin to add a default rule in the admin console.
          </div>
        ) : (
          <form action="/api/owner/update-rule" method="post" style={{ marginTop: 10, maxWidth: 720 }}>
            <input type="hidden" name="venueId" value={venueId} />
            <input type="hidden" name="ruleId" value={rule.id} />

            <Field label="Label" name="label" defaultValue={rule.label} />
            <Field
              label="Start time"
              name="start_time"
              defaultValue={rule.start_time}
              help="Use 24h time like 08:00"
            />
            <Field
              label="End time"
              name="end_time"
              defaultValue={rule.end_time}
              help="Use 24h time like 18:00"
            />
            <Field
              label="Max per day"
              name="max_per_day"
              type="number"
              defaultValue={rule.max_per_day}
            />
            <Field
              label="Cooldown minutes"
              name="cooldown_minutes"
              type="number"
              defaultValue={rule.cooldown_minutes}
            />

            <Select
              label="Mode"
              name="mode"
              defaultValue={rule.mode}
              options={[
                { value: "show_pass", label: "show_pass (recommended MVP)" },
                { value: "deny", label: "deny" },
              ]}
              help="show_pass issues a time-limited pass; deny blocks requests."
            />

            <Select
              label="Rule active"
              name="is_active"
              defaultValue={rule.is_active ? "true" : "false"}
              options={[
                { value: "true", label: "true" },
                { value: "false", label: "false" },
              ]}
            />

            <button
              style={{
                marginTop: 14,
                padding: "10px 14px",
                borderRadius: 10,
                background: "black",
                color: "white",
                border: "none",
                fontWeight: 950,
                cursor: "pointer",
              }}
            >
              Save rule
            </button>
          </form>
        )}
      </section>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid var(--card-border)", borderRadius: 16, opacity: 0.9 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Next upgrades</div>
        <ul style={{ marginTop: 10, lineHeight: 1.9 }}>
          <li>Invite staff roles (staff, manager) + audit log exports</li>
          <li>Owner analytics dashboard (requests, approvals, abuse events)</li>
          <li>Stripe subscription gating for Pro features</li>
        </ul>
      </section>
    </main>
  );
}
