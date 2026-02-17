import { hmacSha256Hex, randomBase64Url } from "./crypto";

type Payload = {
  v: string;      // venue_id
  exp: number;    // unix seconds
  jti: string;    // unique token id
  typ: "pass";    // token type
};

function b64urlJson(obj: any) {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

function parseB64urlJson(s: string) {
  return JSON.parse(Buffer.from(s, "base64url").toString("utf8"));
}

export function issueSignedPassToken(venueId: string, expiresAt: Date) {
  const key = process.env.ACCESS_TOKEN_SIGNING_KEY;
  if (!key) throw new Error("ACCESS_TOKEN_SIGNING_KEY missing");

  const header = { alg: "HS256", typ: "AXW" };
  const payload: Payload = {
    v: venueId,
    exp: Math.floor(expiresAt.getTime() / 1000),
    jti: randomBase64Url(18),
    typ: "pass",
  };

  const h = b64urlJson(header);
  const p = b64urlJson(payload);
  const sig = hmacSha256Hex(key, `${h}.${p}`);

  // compact: header.payload.signatureHex
  return { token: `${h}.${p}.${sig}`, payload };
}

export function verifySignedPassToken(token: string) {
  const key = process.env.ACCESS_TOKEN_SIGNING_KEY;
  if (!key) throw new Error("ACCESS_TOKEN_SIGNING_KEY missing");

  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false as const, reason: "Bad format" };

  const [h, p, sig] = parts;
  const expected = hmacSha256Hex(key, `${h}.${p}`);
  if (sig !== expected) return { ok: false as const, reason: "Bad signature" };

  const payload = parseB64urlJson(p) as Payload;

  if (payload.typ !== "pass") return { ok: false as const, reason: "Wrong type" };

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) return { ok: false as const, reason: "Expired" };

  return { ok: true as const, payload };
}
