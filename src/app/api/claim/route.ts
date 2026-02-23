import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer, supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const Schema = z.object({
  venueId: z.string().min(1),
  email: z.string().email(),
  note: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { venueId, email, note } = parsed.data;

    // Prefer service role (avoids RLS issues) if available
    const supabase =
      typeof supabaseServerService === "function" ? supabaseServerService() : supabaseServer();

    // ✅ IMPORTANT: await the insert BEFORE destructuring
    const { error } = await supabase.from("owner_leads").insert({
      venue_id: venueId,
      email,
      note: note || null,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
