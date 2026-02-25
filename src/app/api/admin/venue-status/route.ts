import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const Body = z.object({
  venueId: z.string().uuid(),
  status: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid body", detail: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { venueId, status } = parsed.data;

    const supabase = await supabaseServer();

    const { error } = await supabase
      .from("venues")
      .update({ status })
      .eq("id", venueId);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
