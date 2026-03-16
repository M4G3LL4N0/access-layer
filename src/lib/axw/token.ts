import crypto from "crypto";

type IssueInput = {
  credentialId: string;
  venueId: string;
  scope?: string[];
  exp?: number;
};

type TokenPayload = {
  credentialId: string;
  venueId: string;
  scope: string[];
  exp: number;
  iat: number;
  jti: string;
};

function b64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replaceAll("=", "")
    .replaceAll("+", "-")
    .replaceAll("/", "_");
}

function b64urlDecode(input: string) {
  let s = input.replaceAll("-", "+").replaceAll("_", "/");
  while (s.length % 4) s += "=";
  return Buffer.from(s, "base64").toString("utf8");
}

function secret() {
  return (
    process.env.AXW_TOKEN_SECRET ||
    process.env.SIGNED_TOKEN_SECRET ||
    "dev_axw_secret_change_me"
  );
}

function sign(data: string) {
  return b64url(
    crypto.createHmac("sha256", secret()).update(data).digest()
  );
}

export function issueAxwToken(input: IssueInput) {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    credentialId: input.credentialId,
    venueId: input.venueId,
    scope: input.scope ?? [],
    iat: now,
    exp: input.exp ?? now + 60 * 60 * 12,
    jti: crypto.randomUUID(),
  };

  const encoded = b64url(JSON.stringify(payload));
  const signature = sign(encoded);
  const token = `${encoded}.${signature}`;

  return { token, payload };
}

export function verifyAxwToken(token: string) {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) {
      return { ok: false as const, error: "Malformed token" };
    }

    const expected = sign(encoded);
    if (expected !== signature) {
      return { ok: false as const, error: "Bad signature" };
    }

    const payload = JSON.parse(b64urlDecode(encoded)) as TokenPayload;
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return { ok: false as const, error: "Expired token" };
    }

    return { ok: true as const, payload };
  } catch (err: any) {
    return { ok: false as const, error: err?.message || "Token verify failed" };
  }
}
