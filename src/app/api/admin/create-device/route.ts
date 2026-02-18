import { NextResponse } from "next/server";
import { supabaseServerService } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { adminToken, venueId, device_name, device_type } = body || {};

    if (!adminToken || adminToken !== process.env.ADMIN_SEED_TOKEN) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!venueId) return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });

    const supabase = supabaseServerService();

    // Confirm venue exists
    const { data: v, error: vErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1)
      .maybeSingle();

    if (vErr) throw vErr;
    if (!v) return NextResponse.json({ ok: false, error: "Venue not found" }, { status: 404 });

    // Insert a device row (requires you have a devices table; if not, we return a clear message)
    const { data, error } = await supabase
      .from("devices")
      .insert([
        {
          venue_id: venueId,
          device_name: device_name || "AXW Device",
          device_type: device_type || "kiosk",
          status: "active",
        },
      ])
      .select("*")
      .maybeSingle();

    if (error) {
      // If table doesn't exist, give a clean response instead of exploding builds
      const msg = String((error as any)?.message || error);
      if (msg.toLowerCase().includes("relation") && msg.toLowerCase().includes("does not exist")) {
        return NextResponse.json(
          { ok: false, error: "devices table does not exist yet. Create it in Supabase then retry." },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json({ ok: true, venue: v, device: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e || "unknown") }, { status: 500 });
  }
}
