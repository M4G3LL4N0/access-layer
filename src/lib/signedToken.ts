import { SignJWT, jwtVerify } from "jose";

type PassPayload = {
  venueId: string;
  exp: number; // seconds since epoch (JWT standard)
  iat: number; // seconds since epoch
};

function getSecretKey() {
  const secret =
    process.env.SIGNED_TOKEN_SECRET ||
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error(
      "Missing SIGNED_TOKEN_SECRET (or JWT_SECRET / NEXTAUTH_SECRET) env var"
    );
  }

  return new TextEncoder().encode(secret);
}

/**
 * Issue a signed pass token for a venue that expires at `expiresAt`.
 * Returns { token, payload } to match route usage.
 */
export function issueSignedPassToken(venueId: string, expiresAt: Date) {
  if (!venueId) throw new Error("Missing venueId");

  const nowSec = Math.floor(Date.now() / 1000);
  const expSec = Math.floor(expiresAt.getTime() / 1000);

  const payload: PassPayload = {
    venueId,
    iat: nowSec,
    exp: expSec,
  };

  const tokenPromise = new SignJWT({ venueId })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(nowSec)
    .setExpirationTime(expSec)
    .sign(getSecretKey());

  // NOTE: caller expects sync return shape; but signing is async.
  // We return a small wrapper: token is a Promise<string>.
  // If your route expects a string immediately, use `await` when calling.
  return { token: tokenPromise, payload };
}

/**
 * Verify a signed pass token.
 */
export async function verifySignedPassToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    const venueId = payload.venueId;
    if (typeof venueId !== "string" || !venueId) {
      return { ok: false as const, error: "Invalid token payload" };
    }

    return { ok: true as const, payload: { venueId, exp: payload.exp } };
  } catch (e: any) {
    return { ok: false as const, error: e?.message || "Invalid token" };
  }
}

/**
 * Back-compat name some files may still import.
 */
export async function verifyToken(token: string) {
  return verifySignedPassToken(token);
}
