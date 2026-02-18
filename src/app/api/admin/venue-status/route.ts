import { NextResponse } from "next/server";
import { supabaseServer, supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") || "";

    if (!token) return unauthorized();
    if (process.env.ADMIN_SEED_TOKEN && token !== process.env.ADMIN_SEED_TOKEN) return unauthorized();

    const form = await req.formData();
    const venueId = String(form.get("venueId") || "");
    const status = String(form.get("status") || "active");

    if (!venueId) {
      return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });
    }

    // Use service role if available (avoids RLS issues)
    const supabase =
      typeof supabaseServerService === "function" ? supabaseServerService() : supabaseServer();

    // ✅ IMPORTANT: await the update BEFORE destructuring
    const { error } = await supabase.from("venues").update({ status }).eq("id", venueId);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.redirect(
      new URL(`/admin/venues/${venueId}?token=${encodeURIComponent(token)}&ok=1`, req.url)
    );
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
