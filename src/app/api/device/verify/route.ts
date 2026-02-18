import { NextResponse } from "next/server";
import { sha256 } from "@/lib/crypto";
import { verifySignedPassToken } from "@/lib/signedToken";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const deviceKey = req.headers.get("x-device-key") || "";
    const pepper = process.env.DEVICE_KEY_PEPPER || "pepper_missing";
    const deviceHash = sha256(`${pepper}:${deviceKey}`);

    const { data: devices } = supabaseServer()
      .from("devices")
      .select("id, venue_id, status")
      .eq("api_key_hash", deviceHash)
      .limit(1);

    if (!devices || devices.length === 0) {
      supabaseServer().from("security_events").insert([
        { event_type: "device_auth_failed", meta: {} },
      ]);
      return NextResponse.json({ allow: false, reason: "Bad device key" }, { status: 401 });
    }

    const device = devices[0];
    if (device.status !== "active") {
      supabaseServer().from("security_events").insert([
        { venue_id: device.venue_id, device_id: device.id, event_type: "device_disabled", meta: {} },
      ]);
      return NextResponse.json({ allow: false, reason: "Device disabled" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const token = String(body.token || "");

    const v = verifySignedPassToken(token);
    if (!v.ok) {
      supabaseServer().from("security_events").insert([
        { venue_id: device.venue_id, device_id: device.id, event_type: "invalid_token", meta: { reason: v.reason } },
      ]);
      return NextResponse.json({ allow: false, reason: v.reason });
    }

    // venue match enforcement (device can only verify its venue)
    if (v.payload.v !== device.venue_id) {
      supabaseServer().from("security_events").insert([
        { venue_id: device.venue_id, device_id: device.id, event_type: "venue_mismatch", meta: { tokenVenue: v.payload.v } },
      ]);
      return NextResponse.json({ allow: false, reason: "Venue mismatch" });
    }

    // denylist check
    const { data: deny } = supabaseServer()
      .from("token_denylist")
      .select("jti")
      .eq("jti", v.payload.jti)
      .limit(1);

    if (deny && deny.length > 0) {
      supabaseServer().from("security_events").insert([
        { venue_id: device.venue_id, device_id: device.id, event_type: "denied", meta: { reason: "denylisted", jti: v.payload.jti } },
      ]);
      return NextResponse.json({ allow: false, reason: "Revoked" });
    }

    supabaseServer().from("security_events").insert([
      { venue_id: device.venue_id, device_id: device.id, event_type: "verified", meta: { jti: v.payload.jti } },
    ]);

    return NextResponse.json({
      allow: true,
      venue_id: device.venue_id,
      expires_at: new Date(v.payload.exp * 1000).toISOString(),
      jti: v.payload.jti,
    });
  } catch (e: any) {
    return NextResponse.json({ allow: false, reason: String(e?.message || e) }, { status: 500 });
  }
}
