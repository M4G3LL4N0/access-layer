import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";
  if (!expected || token !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const lines = String(form.get("lines") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const rows = lines.map((line) => {
    const [name, neighborhood, category] = line.split("|").map((s) => (s || "").trim());
    return {
      name: name || "Pilot Venue",
      address: neighborhood || "San Francisco",
      city: "San Francisco",
      region: "CA",
      category: category || "restroom",
      status: "active",
    };
  });

  if (rows.length === 0) {
    return NextResponse.json({ error: "No lines provided" }, { status: 400 });
  }

  const { error } = await supabaseServer.from("venues").insert(rows);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.redirect(new URL(`/admin/seed?token=${encodeURIComponent(token)}&ok=1`, req.url));
}
