import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const venueId = String(form.get("venueId") || "");
  const status = String(form.get("status") || "active");

  const { error } = await supabaseServer.from("venues").update({ status }).eq("id", venueId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.redirect(new URL(`/admin/venues/${venueId}?token=${encodeURIComponent(token)}&ok=1`, req.url));
}
