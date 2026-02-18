import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const Schema = z.object({
  venueId: z.string().uuid(),
  email: z.string().email(),
  note: z.string().max(1000).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const form = await req.formData();

  const parsed = Schema.safeParse({
    venueId: String(form.get("venueId") || ""),
    email: String(form.get("email") || ""),
    note: String(form.get("note") || ""),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }

  const { venueId, email, note } = parsed.data;

  const { error } = supabaseServer().from("owner_leads").insert({
    venue_id: venueId,
    email,
    note: note || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL(`/claim/${venueId}?ok=1`, req.url));
}

