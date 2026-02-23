import { NextResponse } from "next/server";
import { supabaseServer, supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function jsonError(msg: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: msg, ...(extra || {}) }, { status });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") || "";

    if (!token) return jsonError("Missing token", 400);

    // auth
    if (process.env.ADMIN_SEED_TOKEN && token !== process.env.ADMIN_SEED_TOKEN) {
      return jsonError("Unauthorized", 401);
    }

    // Use service role for seeding to avoid RLS blocking inserts
    const supabase =
      typeof supabaseServerService === "function" ? supabaseServerService() : supabaseServer();

    const rows = [
      {
        name: "Pilot Venue — Hayes Valley Cafe",
        address: "Hayes Valley",
        city: "San Francisco",
        region: "CA",
        country: "US",
        category: "restroom",
        status: "active",
        lat: 37.7764,
        lng: -122.4241,
        created_by: null,
      },
      {
        name: "Pilot Venue — Mission Workspace",
        address: "Mission District",
        city: "San Francisco",
        region: "CA",
        country: "US",
        category: "workspace",
        status: "active",
        lat: 37.7599,
        lng: -122.4148,
        created_by: null,
      },
      {
        name: "Pilot Venue — SOMA Office",
        address: "SOMA",
        city: "San Francisco",
        region: "CA",
        country: "US",
        category: "office",
        status: "active",
        lat: 37.7817,
        lng: -122.4042,
        created_by: null,
      },
    ];

    // ✅ IMPORTANT: await the insert BEFORE destructuring
    const { error } = await supabase.from("venues").insert(rows);

    if (error) {
      return jsonError("Seed insert failed", 400, { detail: error.message });
    }

    // Redirect back to admin seed page
    return NextResponse.redirect(
      new URL(`/admin/seed?token=${encodeURIComponent(token)}&ok=1`, req.url)
    );
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
