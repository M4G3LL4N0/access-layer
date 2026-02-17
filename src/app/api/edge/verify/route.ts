import { NextResponse } from "next/server";
import { verifySignedPassToken } from "@/lib/signedToken";
import { sha256 } from "@/lib/crypto";
import { supabaseServer } from "@/lib/supabaseServer";

function getIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for") || "";
  return (xf.split(",")[0] || "").trim() || "0.0.0.0";
}

// naive in-db rate limit: count events in last N seconds
async function rateLimit(ipHash: string) {
  const since = new Date(Date.now() - 15_000).toISOString(); // 15s window
  const { data } = await supabaseServer
    .from("security_events")
    .select("id, created_at")
    .eq("event_type", "edge_verify")
    .contains("meta", { ip_hash: ipHash })
    .gte("created_at", since);

  const count = data?.length || 0;
  return count <= 20; // allow <=20 per 15s per IP hash
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const ipHash = sha256(ip);

    const okRate = await rateLimit(ipHash);
    if (!okRate) {
      await supabaseServer.from("security_events").insert([
        { event_type: "rate_limit", meta: { ip_hash: ipHash } },
      ]);
      return NextResponse.json({ allow: false, reason: "Rate limited" }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const token = String(body.token || "");

    await supabaseServer.from("security_events").insert([
      { event_type: "edge_verify", meta: { ip_hash: ipHash } },
    ]);

    if (!token) return NextResponse.json({ allow: false, reason: "Missing token" });

    const v = verifySignedPassToken(token);
    if (!v.ok) {
      await supabaseServer.from("security_events").insert([
        { event_type: "invalid_token", meta: { ip_hash: ipHash, reason: v.reason } },
      ]);
      return NextResponse.json({ allow: false, reason: v.reason });
    }

    const { v: venue_id, exp, jti } = v.payload;

    const { data: deny } = await supabaseServer
      .from("token_denylist")
      .select("jti")
      .eq("jti", jti)
      .limit(1);

    if (deny && deny.length > 0) {
      await supabaseServer.from("security_events").insert([
        { venue_id, event_type: "denied", meta: { ip_hash: ipHash, reason: "denylisted", jti } },
      ]);
      return NextResponse.json({ allow: false, reason: "Revoked" });
    }

    return NextResponse.json({
      allow: true,
      venue_id,
      expires_at: new Date(exp * 1000).toISOString(),
      jti,
    });
  } catch (e: any) {
    return NextResponse.json({ allow: false, reason: String(e?.message || e) }, { status: 500 });
  }
}
