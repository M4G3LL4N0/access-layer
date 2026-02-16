import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = String(url.searchParams.get("token") || "").trim();

  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
  }

  const supabase = supabaseServer;

  const { data, error } = await supabase
    .from("parking_validations")
    .select("venue_id, token, status, issued_at, expires_at")
    .eq("token", token)
    .order("issued_at", { ascending: false })
    .limit(1);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const row = data?.[0];
  if (!row) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const now = Date.now();
  const exp = new Date(row.expires_at).getTime();
  const active = row.status === "active" && exp > now;

  // Log verify event (ignore failures)
  try {
    const { error: evErr } = await supabase.from("parking_events").insert([
      {
        venue_id: row.venue_id,
        token,
        event_type: active ? "verify_ok" : "verify_fail",
        meta: { status: row.status, expires_at: row.expires_at },
      },
    ]);
    if (evErr) {
      // ignore
    }
  } catch {
    // ignore
  }

  if (!active) {
    return NextResponse.json(
      { ok: false, error: "Expired or inactive", status: row.status, expires_at: row.expires_at },
      { status: 410 }
    );
  }

  return NextResponse.json({
    ok: true,
    venue_id: row.venue_id,
    status: row.status,
    issued_at: row.issued_at,
    expires_at: row.expires_at,
  });
}
