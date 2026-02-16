import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabaseService";

const Body = z.object({
  leadId: z.string().uuid(),
  stage: z.enum(["new", "contacted", "pilot_offered", "piloting", "closed_won", "closed_lost"]),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { leadId, stage } = Body.parse(json);

    const supabase = supabaseService();
    const { error } = await supabase
      .from("leads")
      .update({ stage, last_contacted_at: new Date().toISOString() })
      .eq("id", leadId);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, leadId, stage });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Bad request" }, { status: 400 });
  }
}
