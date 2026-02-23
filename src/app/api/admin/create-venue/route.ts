import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { TEMPLATES, type VenueTemplateKey } from "@/lib/venueTemplates";

export const dynamic = "force-dynamic";

function asClient(maybeFn: any) {
  return typeof maybeFn === "function" ? maybeFn() : maybeFn;
}

function baseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_BASE_URL?.replace(/\/$/, "") ||
    "https://app.accessxworld.com"
  );
}

function requireAdmin(req: Request) {
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected) return { ok: false, error: "ADMIN_SEED_TOKEN not set in env" };

  const header = req.headers.get("x-admin-token") || "";
  const url = new URL(req.url);
  const query = url.searchParams.get("admin_token") || "";

  const provided = header || query;
  if (!provided) return { ok: false, error: "Missing admin token" };
  if (provided !== expected) return { ok: false, error: "Invalid admin token" };

  return { ok: true };
}

export async function POST(req: Request) {
  const admin = requireAdmin(req);
  if (!admin.ok) {
    return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const templateKey = String(body.template || "") as VenueTemplateKey;
  const tpl = (TEMPLATES as any)[templateKey];
  if (!tpl) {
    return NextResponse.json(
      { ok: false, error: "Invalid template. Use restroom|workspace|office" },
      { status: 400 }
    );
  }

  const name = String(body.name || "").trim();
  const address = String(body.address || "").trim();
  const city = String(body.city || "").trim();
  const region = String(body.region || "").trim();
  const country = String(body.country || "USA").trim();
  const lat = body.lat === "" || body.lat == null ? null : Number(body.lat);
  const lng = body.lng === "" || body.lng == null ? null : Number(body.lng);

  if (!name || !city || !region) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: name, city, region" },
      { status: 400 }
    );
  }

  const supabase = await asClient(supabaseServer);

  // 1) Insert venue
  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .insert([
      {
        name,
        address: address || null,
        city,
        region,
        country,
        lat: Number.isFinite(lat) ? lat : null,
        lng: Number.isFinite(lng) ? lng : null,
        category: tpl.category,
        status: tpl.status,
      },
    ])
    .select("id,name,city,region,country,category,status,created_at")
    .limit(1)
    .maybeSingle();

  if (vErr || !venue) {
    return NextResponse.json(
      { ok: false, error: "Failed to insert venue", detail: vErr?.message || vErr },
      { status: 500 }
    );
  }

  // 2) Insert default rule
  const { error: rErr } = await supabase.from("access_rules").insert([
    {
      venue_id: venue.id,
      rule_name: tpl.rule_name,
      is_enabled: tpl.is_enabled,
      start_time: tpl.start_time,
      end_time: tpl.end_time,
      days_of_week: tpl.days_of_week,
      max_grants_per_user_per_day: tpl.max_grants_per_user_per_day,
      min_minutes_between_grants: tpl.min_minutes_between_grants,
      access_mode: tpl.access_mode,
      requires_payment: tpl.requires_payment,
      price_cents: tpl.price_cents,
      require_login: tpl.require_login,
    },
  ]);

  if (rErr) {
    return NextResponse.json(
      {
        ok: false,
        error: "Venue created but failed to insert default rule",
        venue,
        detail: rErr.message,
      },
      { status: 500 }
    );
  }

  const base = baseUrl();
  const links = {
    venue: `${base}/v/${venue.id}`,
    request: `${base}/request/${venue.id}`,
    signage: `${base}/signage/${venue.id}`,
    pilotPack: `${base}/pilot-pack/${venue.id}`,
    verify: `${base}/verify`,
    manage: `${base}/manage/${venue.id}`,
  };

  return NextResponse.json({
    ok: true,
    venue,
    template: tpl.key,
    links,
  });
}
