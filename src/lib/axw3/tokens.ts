import crypto from "crypto";

function b64u(input: Buffer | string) {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return b.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64uJson(obj: any) {
  return b64u(Buffer.from(JSON.stringify(obj)));
}

function b64uToBuf(s: string) {
  const pad = 4 - (s.length % 4 || 4);
  const base = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad === 4 ? 0 : pad);
  return Buffer.from(base, "base64");
}

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export type AxwTokenPayload = {
  iss: string;
  aud: string;
  sub: string;
  jti: string;
  venueId: string;
  subjectType: string;
  subjectId: string;
  scopes: string[];
  iat: number;
  exp?: number;
};

export function issueSignedPassToken(args: {
  venueId: string;
  subjectType: string;
  subjectId: string;
  scopes: string[];
  ttlMinutes: number;
  issuer?: string;
  audience?: string;
}) {
  const secret = mustEnv("AXW_TOKEN_SECRET");
  const now = Math.floor(Date.now() / 1000);
  const exp = args.ttlMinutes > 0 ? now + args.ttlMinutes * 60 : undefined;

  const header = { alg: "HS256", typ: "JWT" };
  const payload: AxwTokenPayload = {
    iss: args.issuer ?? "axw",
    aud: args.audience ?? "axw-access",
    sub: `${args.subjectType}:${args.subjectId}`,
    jti: crypto.randomUUID(),
    venueId: args.venueId,
    subjectType: args.subjectType,
    subjectId: args.subjectId,
    scopes: args.scopes ?? [],
    iat: now,
    exp
  };

  const signingInput = `${b64uJson(header)}.${b64uJson(payload)}`;
  const sig = crypto.createHmac("sha256", secret).update(signingInput).digest();
  const token = `${signingInput}.${b64u(sig)}`;
  return { token, payload };
}

export function verifySignedPassToken(token: string): { ok: true; payload: AxwTokenPayload } | { ok: false; error: string } {
  try {
    const secret = mustEnv("AXW_TOKEN_SECRET");
    const parts = token.split(".");
    if (parts.length !== 3) return { ok: false, error: "bad_format" };
    const [h, p, s] = parts;
    const signingInput = `${h}.${p}`;
    const expected = crypto.createHmac("sha256", secret).update(signingInput).digest();
    const got = b64uToBuf(s);
    if (!crypto.timingSafeEqual(expected, got)) return { ok: false, error: "bad_sig" };
    const payload = JSON.parse(b64uToBuf(p).toString("utf8")) as AxwTokenPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) return { ok: false, error: "expired" };
    return { ok: true, payload };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "verify_failed" };
  }
}
