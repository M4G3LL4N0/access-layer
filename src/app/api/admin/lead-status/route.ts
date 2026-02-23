import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

const Schema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "qualified", "converted", "closed_lost"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("leads")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id)
      .select("id, status")
      .limit(1);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, lead: data?.[0] || null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
