import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function safeJsonParse(s: string) {
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let venueId = "";
    let name = "";
    let type = "";
    let external_ref: string | null = null;
    let status = "active";
    let meta: any = {};

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      venueId = String(body.venueId || "");
      name = String(body.name || "");
      type = String(body.type || "");
      external_ref = body.external_ref ? String(body.external_ref) : null;
      status = body.status ? String(body.status) : "active";
      meta = body.meta && typeof body.meta === "object" ? body.meta : {};
    } else {
      const form = await req.formData();
      venueId = String(form.get("venueId") || "");
      name = String(form.get("name") || "");
      type = String(form.get("type") || "");
      external_ref = form.get("external_ref") ? String(form.get("external_ref")) : null;
      status = String(form.get("status") || "active");
      meta = form.get("meta") ? safeJsonParse(String(form.get("meta"))) : {};
    }

    if (!venueId) return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    if (!name) return NextResponse.json({ ok: false, error: "Missing name" }, { status: 400 });
    if (!type) return NextResponse.json({ ok: false, error: "Missing type" }, { status: 400 });

    const supabase = await supabaseServer();

    const { data: v, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .maybeSingle();

    if (vErr) return NextResponse.json({ ok: false, error: vErr.message }, { status: 400 });
    if (!v) return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });

    const { data, error } = await supabase
      .from("access_points")
      .insert([{ venue_id: venueId, name, type, external_ref, status, meta }])
      .select("id, venue_id, name, type, external_ref, status, meta, created_at")
      .maybeSingle();

    if (error) {
      // If this is a form submit, redirect back with err
      if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
        const back = new URL(`/admin/access-points/${venueId}?err=${encodeURIComponent(error.message)}`, req.url);
        return NextResponse.redirect(back);
      }
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    // If this is a form submit, redirect back with ok
    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const back = new URL(`/admin/access-points/${venueId}?ok=1`, req.url);
      return NextResponse.redirect(back);
    }

    return NextResponse.json({ ok: true, venue: v, accessPoint: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
