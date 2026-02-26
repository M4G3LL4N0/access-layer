import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseService } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

function stableUuidFromString(input: string): string {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const bytes = Buffer.from(hash.slice(0, 32), "hex");
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function json(ok: boolean, body: any, status = 200) {
  return NextResponse.json({ ok, ...body }, { status });
}

export async function POST(req: Request) {
  try {
    const sb = supabaseService();

    const body = await req.json().catch(() => ({}));
    const city = typeof body.city === "string" && body.city.trim() ? body.city.trim() : "Los Angeles";
    const venueName =
      typeof body.venueName === "string" && body.venueName.trim()
        ? body.venueName.trim()
        : "AXW Demo Venue";

    const venueId = stableUuidFromString(`axw:v3:seed:${city}:${venueName}`);

    const venueRow: any = {
      id: venueId,
      name: venueName,
      city,
      region: "CA",
      status: "active",
    };

    const { error: vErr } = await sb.from("venues").upsert(venueRow, { onConflict: "id" });
    if (vErr) return json(false, { error: "venues upsert failed", detail: vErr.message }, 400);

    const spaces = [
      {
        id: stableUuidFromString(`axw:v3:seed:${venueId}:space:front-desk`),
        venue_id: venueId,
        name: "Front Desk",
        type: "lobby",
      },
      {
        id: stableUuidFromString(`axw:v3:seed:${venueId}:space:garage`),
        venue_id: venueId,
        name: "Garage",
        type: "parking",
      },
    ];

    const { error: sErr } = await sb.from("spaces").upsert(spaces, { onConflict: "id" });
    if (sErr) return json(false, { error: "spaces upsert failed", detail: sErr.message }, 400);

    const accessPoints = [
      {
        id: stableUuidFromString(`axw:v3:seed:${venueId}:ap:front-door`),
        venue_id: venueId,
        space_id: spaces[0].id,
        name: "Front Door",
        kind: "door",
        status: "active",
      },
      {
        id: stableUuidFromString(`axw:v3:seed:${venueId}:ap:garage-gate`),
        venue_id: venueId,
        space_id: spaces[1].id,
        name: "Garage Gate",
        kind: "gate",
        status: "active",
      },
    ];

    const { error: apErr } = await sb.from("access_points").upsert(accessPoints, { onConflict: "id" });
    if (apErr) return json(false, { error: "access_points upsert failed", detail: apErr.message }, 400);

    return json(true, { venueId, venueName, city, spaces, accessPoints }, 200);
  } catch (e: any) {
    return json(false, { error: e?.message || "seed failed" }, 500);
  }
}
