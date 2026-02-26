import { supabaseService } from "./supabase";

export async function getLatestVenue() {
  const sb = supabaseService();
  const { data, error } = await sb
    .from("axw_venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function listPolicies(venueId: string) {
  const sb = supabaseService();
  const { data, error } = await sb
    .from("axw_policies")
    .select("id,effect,priority,subject_type,subject_id,resource_type,resource_id,action,conditions,note,status,created_at")
    .eq("venue_id", venueId)
    .order("priority", { ascending: true })
    .limit(200);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function upsertPolicy(row: any) {
  const sb = supabaseService();
  const { error } = await sb.from("axw_policies").upsert([row]);
  if (error) throw new Error(error.message);
}

export async function listAudit(venueId?: string, limit = 100) {
  const sb = supabaseService();
  let q = sb.from("axw_audit_events").select("*").order("at", { ascending: false }).limit(limit);
  if (venueId) q = q.eq("venue_id", venueId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return data ?? [];
}
