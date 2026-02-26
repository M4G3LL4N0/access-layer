import { supabaseService } from "./supabase";

export async function auditEvent(args: {
  venueId?: string | null;
  actorType?: string | null;
  actorId?: string | null;
  action: string;
  resourceType?: string | null;
  resourceId?: string | null;
  ok?: boolean;
  ip?: string | null;
  ua?: string | null;
  meta?: any;
}) {
  const sb = supabaseService();
  await sb.from("axw_audit_events").insert([
    {
      venue_id: args.venueId ?? null,
      actor_type: args.actorType ?? null,
      actor_id: args.actorId ?? null,
      action: args.action,
      resource_type: args.resourceType ?? null,
      resource_id: args.resourceId ?? null,
      ok: args.ok ?? true,
      ip: args.ip ?? null,
      ua: args.ua ?? null,
      meta: args.meta ?? {}
    }
  ]);
}
