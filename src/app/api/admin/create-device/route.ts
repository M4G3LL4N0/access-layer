import { NextResponse } from "next/server";
import { sha256, randomBase64Url } from "@/lib/crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const venueId = String(body.venueId || "");
    const name = String(body.name || "Device");
    const device_type = String(body.device_type || "kiosk");

    const adminToken = req.headers.get("x-admin-seed-token") || "";
    if (adminToken !== process.env.ADMIN_SEED_TOKEN) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!venueId) return NextResponse.json({ ok: false, error: "Missing venueId" }, { status: 400 });

    const rawKey = `axw_dev_${randomBase64Url(24)}`;
    const pepper = process.env.DEVICE_KEY_PEPPER || "pepper_missing";
    const api_key_hash = sha256(`${pepper}:${rawKey}`);

    const { data, error } = await supabaseServer
      .from("devices")
      .insert([{ venue_id: venueId, name, device_type, api_key_hash }])
      .select("id, venue_id, name, device_type, status, created_at")
      .limit(1);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ ok: false, error: error?.message || "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      device: data[0],
      api_key: rawKey, // show once
      note: "Store this device api_key securely; it will not be shown again.",
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
