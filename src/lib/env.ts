export function mustEnv(...keys: string[]) {
  for (const k of keys) {
    const v = process.env[k];
    if (v && v.trim().length > 0) return v.trim();
  }
  throw new Error(`Missing env: ${keys[0]}`);
}

export const ENV = {
  SUPABASE_URL: () => mustEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"),
  SUPABASE_ANON_KEY: () => mustEnv("SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: () =>
    mustEnv("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_KEY"),
  SIGNED_TOKEN_SECRET: () => mustEnv("SIGNED_TOKEN_SECRET", "TOKEN_SECRET"),
};
