import crypto from "crypto";

type Payload = {
  venueId: string;
  exp?: number;
  jti: string;
};

function reqEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function b64url(buf: Buffer) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function sign(data: string) {
  const secret = reqEnv("SIGNED_TOKEN_SECRET");
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export function issueSignedPassToken(venueId: string, expiresAt?: Date) {
  const payload: Payload = {
    venueId,
    exp: expiresAt ? Math.floor(expiresAt.getTime() / 1000) : undefined,
    jti: crypto.randomUUID(),
  };
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = sign(body);
  return { token: `${body}.${sig}`, payload };
}

export function verifySignedPassToken(token: string) {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return { ok: false as const, error: "Malformed token" };
    const expected = sign(body);
    if (sig !== expected) return { ok: false as const, error: "Bad signature" };
    const payload = JSON.parse(Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")) as Payload;
    if (payload.exp && Date.now() / 1000 > payload.exp) return { ok: false as const, error: "Expired token" };
    return { ok: true as const, payload };
  } catch (e) {
    return { ok: false as const, error: e };
  }
}

export function verifyToken(token: string) {
  return verifySignedPassToken(token);
}
