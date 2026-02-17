import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ allow: false, reason: "Missing token" });
    }

    const supabase = supabaseServer;

    const { data, error } = await supabase
      .from("access_passes")
      .select("*")
      .eq("token", token)
      .limit(1);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ allow: false, reason: "Token not found" });
    }

    const pass = data[0];

    if (pass.status !== "active") {
      return NextResponse.json({ allow: false, reason: "Not active" });
    }

    if (new Date(pass.expires_at) < new Date()) {
      return NextResponse.json({ allow: false, reason: "Expired" });
    }

    // Log hardware event
    await supabase.from("access_pass_events").insert([
      {
        pass_id: pass.id,
        event_type: "hardware_verified",
        created_at: new Date().toISOString(),
      },
    ]);

    return NextResponse.json({
      allow: true,
      venue_id: pass.venue_id,
      expires_at: pass.expires_at,
    });
  } catch (e: any) {
    return NextResponse.json({
      allow: false,
      reason: String(e?.message || e),
    });
  }
}
