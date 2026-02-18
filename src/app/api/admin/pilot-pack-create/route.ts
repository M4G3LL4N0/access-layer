import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const Schema = z.object({
  leadId: z.string().uuid().optional().or(z.literal("")),
  name: z.string().min(2).max(200),
  address: z.string().max(220).optional().or(z.literal("")),
  city: z.string().min(1).max(120),
  region: z.string().min(1).max(80),
  country: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  lat: z.string().optional().or(z.literal("")),
  lng: z.string().optional().or(z.literal("")),
});

function toNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const raw = Object.fromEntries(form.entries());

    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    const payload = parsed.data;

    const { data: venueRows, error: venueErr } = await supabase
      .from("venues")
      .insert([
        {
          name: payload.name,
          address: payload.address || null,
          city: payload.city,
          region: payload.region,
          country: payload.country,
          category: payload.category,
          lat: payload.lat ? toNum(payload.lat) : null,
          lng: payload.lng ? toNum(payload.lng) : null,
          status: "active",
        },
      ])
      .select("id")
      .limit(1);

    if (venueErr) {
      return NextResponse.json({ ok: false, error: venueErr.message }, { status: 500 });
    }

    const venueId = venueRows?.[0]?.id;
    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Venue create failed" }, { status: 500 });
    }

    // Default rule
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

    if (ruleErr) {
      return NextResponse.json({ ok: false, error: ruleErr.message }, { status: 500 });
    }

    // Optional: mark lead qualified/converted later; keep simple now.

    const url = new URL("/admin/pilot-pack", req.url);
    if (payload.leadId) url.searchParams.set("leadId", payload.leadId);
    url.searchParams.set("ok", "1");
    url.searchParams.set("venueId", venueId);

    return NextResponse.redirect(url.toString(), 303);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
