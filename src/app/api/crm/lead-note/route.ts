import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabaseService";

const Body = z.object({
  leadId: z.string().uuid(),
  note: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { leadId, note } = Body.parse(json);

    const supabase = supabaseService();
    const { data, error } = await supabase
      .from("lead_notes")
      .insert([{ lead_id: leadId, note }])
      .select("id, created_at")
      .limit(1);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, note: data?.[0] || null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Bad request" }, { status: 400 });
  }
}
