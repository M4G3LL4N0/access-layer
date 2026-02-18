import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

/**
 * Edge verify: verifies an access token is valid (active + not expired),
 * with a simple rate-limit backed by security_events.
 *
 * IMPORTANT: Supabase queries must be awaited BEFORE destructuring.
 */

// Basic hash (we never store raw IP)
function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Very small helper to get IP from headers
function getIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "0.0.0.0";
}

async function rateLimit(ipHash: string) {
  const supabase = supabaseServer();

  const since = new Date(Date.now() - 15_000).toISOString(); // 15s window

  // ✅ MUST await before destructuring
  const { data, error } = await supabase
    .from("security_events")
    .select("id, created_at")
    .eq("event_type", "edge_verify")
    .eq("ip_hash", ipHash)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    // If the rate-limit table is missing or blocked, fail open (don’t break verify)
    return { ok: true, remaining: 999, note: "rate-limit unavailable" as const };
  }

  const count = (data || []).length;
  const limit = 12; // 12 calls per 15 seconds per IP hash
  const remaining = Math.max(0, limit - count);

  return { ok: count < limit, remaining };
}

async function logSecurityEvent(opts: {
  event_type: string;
  ip_hash: string;
  token?: string | null;
  venue_id?: string | null;
  meta?: any;
}) {
  try {
    const supabase = supabaseServer();
    await supabase.from("security_events").insert([
      {
        event_type: opts.event_type,
        ip_hash: opts.ip_hash,
        token: opts.token || null,
        venue_id: opts.venue_id || null,
        meta: opts.meta ?? null,
      },
    ]);
  } catch {
    // swallow
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = String(url.searchParams.get("token") || "").trim();

    if (!token) {
      return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
    }

    const ip = getIp(req);
    const ipHash = sha256(ip);

    const rl = await rateLimit(ipHash);
    if (!rl.ok) {
      await logSecurityEvent({
        event_type: "edge_verify_rate_limited",
        ip_hash: ipHash,
        token,
        meta: { remaining: rl.remaining },
      });
      return NextResponse.json(
        { ok: false, error: "Rate limited", remaining: rl.remaining },
        { status: 429 }
      );
    }

    const supabase = supabaseServer();

    // ✅ Avoid .single() to prevent "Cannot coerce to a single JSON object"
    const { data, error } = await supabase
      .from("access_passes")
      .select("token, status, issued_at, expires_at, venue_id")
      .eq("token", token)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      await logSecurityEvent({
        event_type: "edge_verify_error",
        ip_hash: ipHash,
        token,
        meta: { message: error.message },
      });
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    const row = (data && data[0]) || null;
    if (!row) {
      await logSecurityEvent({ event_type: "edge_verify_not_found", ip_hash: ipHash, token });
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const now = Date.now();
    const expiresAt = row.expires_at ? new Date(row.expires_at).getTime() : 0;

    const isActive = String(row.status).toLowerCase() === "active";
    const isExpired = expiresAt > 0 && expiresAt <= now;

    if (!isActive || isExpired) {
      await logSecurityEvent({
        event_type: "edge_verify_denied",
        ip_hash: ipHash,
        token,
        venue_id: row.venue_id,
        meta: { status: row.status, expires_at: row.expires_at },
      });
      return NextResponse.json(
        { ok: false, error: isExpired ? "Expired" : "Inactive", status: row.status, expires_at: row.expires_at },
        { status: 403 }
      );
    }

    await logSecurityEvent({
      event_type: "edge_verify_ok",
      ip_hash: ipHash,
      token,
      venue_id: row.venue_id,
      meta: { expires_at: row.expires_at },
    });

    return NextResponse.json({
      ok: true,
      token: row.token,
      venue_id: row.venue_id,
      status: row.status,
      issued_at: row.issued_at,
      expires_at: row.expires_at,
      remaining: rl.remaining,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
