export function getEnv(key: string): string | undefined {
  const v = process.env[key];
  if (!v) return undefined;
  return v;
}

export function hasEnv(keys: string[]): boolean {
  return keys.every((k) => !!process.env[k]);
}
