import crypto from "crypto";

export type PassPayload = {
  venueId: string;
  exp?: number;
  jti: string;
  iat: number;
};

function b64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlJson(obj: any) {
  return b64url(JSON.stringify(obj));
}

function hmac(data: string, secret: string) {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

function secret() {
  const s = process.env.AXW_TOKEN_SECRET;
  if (!s) throw new Error("Missing AXW_TOKEN_SECRET");
  return s;
}

export function issueSignedPassToken(venueId: string, expiresAt?: Date) {
  const header = { alg: "HS256", typ: "AXW" };
  const now = Math.floor(Date.now() / 1000);
  const payload: PassPayload = {
    venueId,
    iat: now,
    jti: crypto.randomUUID(),
    exp: expiresAt ? Math.floor(expiresAt.getTime() / 1000) : undefined,
  };

  const h = b64urlJson(header);
  const p = b64urlJson(payload);
  const body = `${h}.${p}`;
  const sig = hmac(body, secret());
  const token = `${body}.${sig}`;

  return { token, payload };
}

export function verifySignedPassToken(token: string): { ok: true; payload: PassPayload } | { ok: false; error: string } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return { ok: false, error: "bad_format" };

    const [h, p, s] = parts;
    const body = `${h}.${p}`;
    const expected = hmac(body, secret());
    if (!crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected))) return { ok: false, error: "bad_sig" };

    const payloadJson = Buffer.from(p.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const payload = JSON.parse(payloadJson) as PassPayload;

    if (!payload.venueId || !payload.jti || !payload.iat) return { ok: false, error: "bad_payload" };

    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return { ok: false, error: "expired" };

    return { ok: true, payload };
  } catch {
    return { ok: false, error: "verify_failed" };
  }
}

export function verifyToken(token: string) {
  return verifySignedPassToken(token);
}
