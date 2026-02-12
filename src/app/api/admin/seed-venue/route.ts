import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const Schema = z.object({
  token: z.string().min(20),
  name: z.string().min(3),
  address: z.string().min(3),
  city: z.string().min(2),
  region: z.string().min(2),
  category: z.string().min(2).default("restroom"),
  status: z.string().default("active"),
  lat: z.string().optional().or(z.literal("")),
  lng: z.string().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const form = await req.formData();
  const parsed = Schema.safeParse({
    token: String(form.get("token") || ""),
    name: String(form.get("name") || ""),
    address: String(form.get("address") || ""),
    city: String(form.get("city") || ""),
    region: String(form.get("region") || ""),
    category: String(form.get("category") || "restroom"),
    status: String(form.get("status") || "active"),
    lat: String(form.get("lat") || ""),
    lng: String(form.get("lng") || ""),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }

  if (parsed.data.token !== process.env.ADMIN_SEED_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lat = parsed.data.lat ? Number(parsed.data.lat) : null;
  const lng = parsed.data.lng ? Number(parsed.data.lng) : null;

  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .insert({
      name: parsed.data.name,
      address: parsed.data.address,
      city: parsed.data.city,
      region: parsed.data.region,
      category: parsed.data.category,
      status: parsed.data.status,
      lat,
      lng,
    })
    .select("id")
    .single();

  if (vErr) return NextResponse.json({ error: vErr.message }, { status: 500 });

  // Default rule
  const { error: rErr } = await supabaseServer.from("access_rules").insert({
    venue_id: venue.id,
    rule_name: "Default Pilot Rule",
    is_enabled: true,
    access_mode: "show_pass",
    start_time: "08:00",
    end_time: "18:00",
    max_grants_per_user_per_day: 3,
    min_minutes_between_grants: 30,
  });

  if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, venueId: venue.id });
}

