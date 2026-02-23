import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

/**
 * Device verify endpoint.
 *
 * Accepts:
 *  - GET /api/device/verify?deviceKey=...&venueId=... (optional venueId)
 *  - Header "x-device-key: ..."
 *
 * Server computes api_key_hash = sha256(`${pepper}:${deviceKey}`)
 * and looks up devices.api_key_hash.
 *
 * Returns:
 *  { ok: true, device: { id, venue_id, status } } if a matching active device exists.
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const headerKey =
      req.headers.get("x-device-key") ||
      req.headers.get("x-device_token") ||
      req.headers.get("x-api-key") ||
      "";

    const deviceKey = String(url.searchParams.get("deviceKey") || headerKey || "").trim();
    const venueId = String(url.searchParams.get("venueId") || "").trim();

    if (!deviceKey) {
      return NextResponse.json(
        { ok: false, error: "Missing deviceKey (query param ?deviceKey=... or header x-device-key)" },
        { status: 400 }
      );
    }

    const pepper = String(process.env.KIOSK_PIN || process.env.DEVICE_PEPPER || "axw");
    const deviceHash = crypto.createHash("sha256").update(`${pepper}:${deviceKey}`).digest("hex");

    const supabase = supabaseServer();

    // ✅ IMPORTANT: await BEFORE destructuring
    const { data, error } = await supabase
      .from("devices")
      .select("id, venue_id, status")
      .eq("api_key_hash", deviceHash)
      .limit(10);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    const devices = data ?? [];

    // Optional: lock verification to a specific venueId if provided
    const filtered = venueId ? devices.filter((d) => String(d.venue_id) === venueId) : devices;

    if (!filtered.length) {
      return NextResponse.json(
        { ok: false, error: "Not found", hint: venueId ? "Device hash not found for venueId" : "Device hash not found" },
        { status: 404 }
      );
    }

    // Prefer active device
    const active = filtered.find((d) => String(d.status).toLowerCase() === "active") || filtered[0];

    if (String(active.status).toLowerCase() !== "active") {
      return NextResponse.json(
        { ok: false, error: "Device is not active", device: active },
        { status: 403 }
      );
    }

    return NextResponse.json({ ok: true, device: active });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
