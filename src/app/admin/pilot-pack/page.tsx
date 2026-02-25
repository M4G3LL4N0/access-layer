export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

type Lead = {
  id: string;
  email: string;
  company: string | null;
  city: string | null;
  region: string | null;
  venue_type: string | null;
  message: string | null;
};

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <label style={{ display: "block", marginTop: 12 }}>
      <div style={{ fontWeight: 900, marginBottom: 6 }}>{label}</div>
      <input
        name={name}
        defaultValue={defaultValue}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ddd",
          fontSize: 14,
        }}
      />
    </label>
  );
}

export default async function PilotPackPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string; ok?: string; venueId?: string }>;
}) {
  const sp = await searchParams;
  const leadId = sp.leadId || "";
  const ok = sp.ok === "1";
  const venueId = sp.venueId || "";

  const supabase = await supabaseServer();

  let lead: Lead | null = null;
  if (leadId) {
    const { data } = await supabase
      .from("leads")
      .select("id, email, company, city, region, venue_type, message")
      .eq("id", leadId)
      .limit(1);
    lead = (data && data[0]) || null;
  }

  const origin = "https://access-layer-five.vercel.app";
  const links = venueId
    ? {
        venue: `${origin}/v/${venueId}`,
        signage: `${origin}/signage/${venueId}`,
        verify: `${origin}/verify`,
      }
    : null;

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", background: "#0b0f17", minHeight: "100vh", color: "white" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, fontWeight: 900 }}>Pilot Pack (Admin)</h1>
        <p style={{ opacity: 0.85 }}>
          Create a venue from a lead and generate the shareable onboarding links.
        </p>

        <div style={{ marginTop: 12 }}>
          <Link href="/admin/leads" style={{ textDecoration: "underline", color: "white" }}>
            ← Back to Leads
          </Link>
        </div>

        {lead ? (
          <div style={{ marginTop: 14, padding: 16, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontWeight: 900 }}>Lead</div>
            <div style={{ opacity: 0.9, marginTop: 6 }}>
              <div><b>Email:</b> {lead.email}</div>
              <div><b>Company:</b> {lead.company || "(none)"}</div>
              <div><b>Type:</b> {lead.venue_type || "(none)"}</div>
              <div><b>City/Region:</b> {(lead.city || "") + (lead.region ? ` — ${lead.region}` : "")}</div>
              {lead.message ? <div style={{ marginTop: 8 }}><b>Message:</b> {lead.message}</div> : null}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 16, opacity: 0.85 }}>
            No lead loaded. Return to Leads and click “Pilot Pack →”.
          </div>
        )}

        {ok && links ? (
          <div style={{ marginTop: 18, padding: 16, borderRadius: 14, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)" }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Pilot Pack Ready</div>
            <div style={{ marginTop: 10, lineHeight: 1.9 }}>
              <div><b>Venue page:</b> {links.venue}</div>
              <div><b>Signage:</b> {links.signage}</div>
              <div><b>Staff verify:</b> {links.verify}</div>
            </div>
            <div style={{ marginTop: 10, opacity: 0.85 }}>
              Send the <b>Signage</b> link to the venue to print and place. Staff uses <b>Verify</b>.
            </div>
          </div>
        ) : null}

        <form action="/api/admin/pilot-pack-create" method="post" style={{ marginTop: 18, padding: 16, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <input type="hidden" name="leadId" value={leadId} />

          <div style={{ fontWeight: 900, fontSize: 18 }}>Create Venue</div>

          <Field
            label="Venue name"
            name="name"
            defaultValue={lead?.company || "Pilot Venue — (Name)"}
          />
          <Field label="Address (optional)" name="address" defaultValue="" />
          <Field label="City" name="city" defaultValue={lead?.city || "San Francisco"} />
          <Field label="Region (state/province)" name="region" defaultValue={lead?.region || "CA"} />
          <Field label="Country" name="country" defaultValue="USA" />
          <Field label="Category (restroom/workspace/office/etc)" name="category" defaultValue={lead?.venue_type || "restroom"} />
          <Field label="Latitude (optional)" name="lat" defaultValue="" />
          <Field label="Longitude (optional)" name="lng" defaultValue="" />

          <div style={{ marginTop: 14 }}>
            <button
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "none",
                background: "white",
                color: "black",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Create Pilot Pack
            </button>
          </div>

          <div style={{ marginTop: 10, opacity: 0.8, fontSize: 13 }}>
            Creates venue + default access rule (08:00–18:00, cooldown 30m, max/day 3) and returns links.
          </div>
        </form>
      </div>
    </main>
  );
}
