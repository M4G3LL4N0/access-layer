export type PolicyRow = {
  id: string;
  effect: "allow" | "deny";
  priority: number;
  conditions: any;
};

export type EvalInput = {
  subject: { type: string; id: string };
  resource: { type: string; id: string };
  action: string;
  context?: Record<string, any>;
};

function condMatch(conditions: any, ctx: Record<string, any>) {
  if (!conditions || typeof conditions !== "object") return true;
  const entries = Object.entries(conditions);
  for (const [k, v] of entries) {
    if (k === "always") {
      if (v === true) continue;
      return false;
    }
    if (k === "eq") {
      if (!v || typeof v !== "object") return false;
      for (const [ck, cv] of Object.entries(v)) {
        if (ctx[ck] !== cv) return false;
      }
      continue;
    }
    if (k === "in") {
      if (!v || typeof v !== "object") return false;
      for (const [ck, arr] of Object.entries(v)) {
        const list = Array.isArray(arr) ? arr : [];
        if (!list.includes(ctx[ck])) return false;
      }
      continue;
    }
    if (ctx[k] !== v) return false;
  }
  return true;
}

export function evaluatePolicies(rows: PolicyRow[], input: EvalInput) {
  const ctx = input.context ?? {};
  const sorted = [...rows].sort((a, b) => a.priority - b.priority);
  const matched = sorted.filter(r => condMatch(r.conditions, ctx));
  const deny = matched.find(r => r.effect === "deny");
  if (deny) return { ok: true as const, allow: false, reason: "deny", matched: matched.map(r => r.id) };
  const allow = matched.find(r => r.effect === "allow");
  if (allow) return { ok: true as const, allow: true, reason: "allow", matched: matched.map(r => r.id) };
  return { ok: true as const, allow: false, reason: "no_match", matched: [] as string[] };
}
