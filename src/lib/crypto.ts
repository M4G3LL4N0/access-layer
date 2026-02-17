import crypto from "crypto";

export function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function hmacSha256Hex(secret: string, input: string) {
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export function randomBase64Url(bytes = 24) {
  return crypto.randomBytes(bytes).toString("base64url");
}
