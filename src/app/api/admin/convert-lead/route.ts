import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const Schema = z.object({
  leadId: z.string().uuid(),
  redirect: z.string().optional(), // "1" to redirect to pilot pack
});

function guessCategory(venue_type?: string | null) {
  const v = (venue_type || "").toLowerCase();
  if (v.includes("work")) return "workspace";
  if (v.includes("office")) return "office";
  if (v.includes("gym")) return "gym";
  if (v.includes("rest")) return "restroom";
  return v || "restroom";
}

async function readBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return await req.json().catch(() => ({}));
  }
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const form = await req.formData();
    return Object.fromEntries(form.entries());
  }
  return await req.json().catch(() => ({}));
}

export async function POST(req: Request) {
  try {
    const body = await readBody(req);
    const parsed = Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { data: leadRows, error: leadErr } = await supabase
      .from("leads")
      .select("id, email, company, city, region, venue_type")
      .eq("id", parsed.data.leadId)
      .limit(1);

    if (leadErr) return NextResponse.json({ ok: false, error: leadErr.message }, { status: 500 });

    const lead = leadRows?.[0];
    if (!lead) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });

    const venueName = lead.company || `Pilot Venue — ${lead.email}`;
    const city = lead.city || "San Francisco";
    const region = lead.region || "CA";
    const category = guessCategory(lead.venue_type);

    const { data: venueRows, error: venueErr } = await supabase
      .from("venues")
      .insert([
        {
          name: venueName,
          address: null,
          city,
          region,
          country: "USA",
          category,
          lat: null,
          lng: null,
          status: "active",
        },
      ])
      .select("id")
      .limit(1);

    if (venueErr) return NextResponse.json({ ok: false, error: venueErr.message }, { status: 500 });

    const venueId = venueRows?.[0]?.id;
    if (!venueId) return NextResponse.json({ ok: false, error: "Venue create failed" }, { status: 500 });

    const { error: ruleErr } = await supabase.from("access_rules").insert([
      {
        venue_id: venueId,
        rule_name: "Default Pilot Rule",
        is_enabled: true,
        start_time: "08:00",
        end_time: "18:00",
        days_of_week: [1, 2, 3, 4, 5, 6, 0],
        max_grants_per_user_per_day: 3,
        min_minutes_between_grants: 30,
        access_mode: "show_pass",
        requires_payment: false,
        price_cents: 0,
        require_login: false,
      },
    ]);

    if (ruleErr) return NextResponse.json({ ok: false, error: ruleErr.message }, { status: 500 });

    await supabase.from("leads").update({ status: "converted" }).eq("id", lead.id);

    const origin = "https://access-layer-five.vercel.app";

    // If asked, redirect straight to Pilot Pack for the new venue
    const wantsRedirect = String(parsed.data.redirect || "") === "1";
    if (wantsRedirect) {
      return NextResponse.redirect(`${origin}/pilot-pack/${venueId}`, { status: 303 });
    }

    return NextResponse.json({
      ok: true,
      venueId,
      links: {
        pilotPack: `${origin}/pilot-pack/${venueId}`,
        venue: `${origin}/v/${venueId}`,
        signage: `${origin}/signage/${venueId}`,
        verify: `${origin}/verify`,
        request: `${origin}/request/${venueId}`,
        manage: `${origin}/manage/${venueId}`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
