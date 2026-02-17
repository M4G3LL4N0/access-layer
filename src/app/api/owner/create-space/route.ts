import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { venueId, name, type } = await req.json();
  const supabase = supabaseServer;

  const { error } = await supabase.from("spaces").insert([
    {
      venue_id: venueId,
      name,
      type,
    },
  ]);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({ ok: true });
}
