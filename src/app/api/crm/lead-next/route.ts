import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabaseService";

const Body = z.object({
  leadId: z.string().uuid(),
  next_action_at: z.string().datetime().nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { leadId, next_action_at } = Body.parse(json);

    const supabase = supabaseService();
    const { error } = await supabase
      .from("leads")
      .update({ next_action_at })
      .eq("id", leadId);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, leadId, next_action_at });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Bad request" }, { status: 400 });
  }
}
