export function hasEnv(name: string): boolean {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0;
}

export function getEnv(name: string): string | undefined {
  const v = process.env[name];
  if (typeof v !== "string") return undefined;
  const trimmed = v.trim();
  return trimmed.length ? trimmed : undefined;
}

export function requireEnv(name: string): string {
  const v = getEnv(name);
  if (!v) {
    throw new Error(`Missing env var: ${name}`);
  }
  return v;
}

export const ENV = {
  SUPABASE_URL: () =>
    requireEnv(hasEnv("SUPABASE_URL") ? "SUPABASE_URL" : "NEXT_PUBLIC_SUPABASE_URL"),

  SUPABASE_ANON_KEY: () =>
    requireEnv(
      hasEnv("SUPABASE_ANON_KEY")
        ? "SUPABASE_ANON_KEY"
        : "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    ),

  SUPABASE_SERVICE_ROLE_KEY: () => requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
};
