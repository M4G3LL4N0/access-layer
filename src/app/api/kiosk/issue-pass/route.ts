import { NextResponse } from "next/server";
import crypto from "crypto";
import * as SB from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function generateToken() {
  return crypto.randomBytes(24).toString("base64url");
}

function getSupabase() {
  // Your project sometimes exports a function, sometimes a client object.
  // This makes the route work either way.
  const anySB = SB as any;

  if (typeof anySB.supabaseServer === "function") return anySB.supabaseServer();
  if (anySB.supabaseServer) return anySB.supabaseServer;

  // fallback (in case you renamed it)
  if (typeof anySB.default === "function") return anySB.default();
  if (anySB.default) return anySB.default;

  throw new Error("supabaseServer export not found in @/lib/supabaseServer");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const venueId = String(body?.venueId || "").trim();

    if (!venueId) {
      return NextResponse.json({ error: "Missing venueId" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Confirm venue exists (avoid FK failures)
    const { data: venueRows, error: venueErr } = await supabase
      .from("venues")
      .select("id,name")
      .eq("id", venueId)
      .limit(1);

    if (venueErr) {
      return NextResponse.json({ error: venueErr.message }, { status: 500 });
    }
    if (!venueRows || venueRows.length === 0) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    const token = generateToken();
    const now = new Date();
    const expires = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes

    const { error: insertErr } = await supabase.from("access_passes").insert([
      {
        venue_id: venueId,
        token,
        status: "active",
        issued_at: now.toISOString(),
        expires_at: expires.toISOString(),
      },
    ]);

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    const base =
      process.env.NEXT_PUBLIC_APP_BASE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    return NextResponse.json({
      ok: true,
      venue: venueRows[0],
      token,
      expires_at: expires.toISOString(),
      passUrl: `${base.replace(/\/$/, "")}/pass/${token}`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
