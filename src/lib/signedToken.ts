import crypto from "crypto";

const SECRET = process.env.SIGNED_TOKEN_SECRET || process.env.JWT_SECRET || "";

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Minimal HMAC-signed token (NOT a full JWT).
 * If you already use JWT elsewhere, swap this out later.
 */
export function signToken(payload: Record<string, any>, ttlSeconds = 3600) {
  if (!SECRET) throw new Error("Missing SIGNED_TOKEN_SECRET (or JWT_SECRET)");

  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = { ...payload, exp };

  const encoded = base64url(JSON.stringify(body));
  const sig = base64url(
    crypto.createHmac("sha256", SECRET).update(encoded).digest()
  );

  return `${encoded}.${sig}`;
}

export function verifyToken(token: string) {
  if (!SECRET) throw new Error("Missing SIGNED_TOKEN_SECRET (or JWT_SECRET)");

  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  const expected = base64url(
    crypto.createHmac("sha256", SECRET).update(encoded).digest()
  );

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;

  const json = JSON.parse(Buffer.from(encoded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
  if (typeof json?.exp === "number" && json.exp < Math.floor(Date.now() / 1000)) return null;

  return json;
}
