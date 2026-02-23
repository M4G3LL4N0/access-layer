import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function jsonError(msg: string, status = 400, extra?: any) {
  return NextResponse.json({ ok: false, error: msg, ...(extra || {}) }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const token = String(body?.token || "");
    const venueId = String(body?.venueId || "");
    const patch = (body?.patch || {}) as Record<string, any>;

    if (!token) return jsonError("Missing token");
    if (!venueId) return jsonError("Missing venueId");
    if (!patch || typeof patch !== "object") return jsonError("Missing patch object");

    // Simple admin check using seed token (same pattern as other admin routes)
    if (process.env.ADMIN_SEED_TOKEN && token !== process.env.ADMIN_SEED_TOKEN) {
      return jsonError("Unauthorized", 401);
    }

    const supabase = supabaseServer();

    // ✅ 1) Find the latest rule for this venue (optional)
    const { data: latestRule, error: latestErr } = await supabase
      .from("access_rules")
      .select("id")
      .eq("venue_id", venueId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestErr) {
      return jsonError("Failed to lookup latest rule", 500, { detail: latestErr.message });
    }

    // ✅ 2) If a rule exists, update it. Otherwise create a new one.
    if (latestRule?.id) {
      const { error: updErr } = await supabase
        .from("access_rules")
        .update({ ...patch })
        .eq("id", latestRule.id);

      if (updErr) return jsonError("Update failed", 500, { detail: updErr.message });

      return NextResponse.json({ ok: true, mode: "update", id: latestRule.id });
    }

    const { data: created, error: insErr } = await supabase
      .from("access_rules")
      .insert([{ venue_id: venueId, ...patch }])
      .select("id")
      .maybeSingle();

    if (insErr) return jsonError("Insert failed", 500, { detail: insErr.message });

    return NextResponse.json({ ok: true, mode: "insert", id: created?.id || null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
