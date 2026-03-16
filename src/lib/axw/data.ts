import { supabaseServerService } from "@/lib/supabaseServer";

export async function getVenueStats() {
  try {
    const supabase = supabaseServerService();

    const [
      venuesRes,
      spacesRes,
      entrypointsRes,
      devicesRes,
      credentialsRes,
      eventsRes,
    ] = await Promise.all([
      supabase.from("venues").select("id", { count: "exact", head: true }),
      supabase.from("spaces").select("id", { count: "exact", head: true }),
      supabase.from("entrypoints").select("id", { count: "exact", head: true }),
      supabase.from("devices").select("id", { count: "exact", head: true }),
      supabase.from("credentials").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
    ]);

    return {
      ok: true as const,
      venues: venuesRes.count ?? 0,
      spaces: spacesRes.count ?? 0,
      entrypoints: entrypointsRes.count ?? 0,
      devices: devicesRes.count ?? 0,
      credentials: credentialsRes.count ?? 0,
      events: eventsRes.count ?? 0,
    };
  } catch (err: any) {
    return {
      ok: false as const,
      error: err?.message || "Failed to load venue stats",
      venues: 0,
      spaces: 0,
      entrypoints: 0,
      devices: 0,
      credentials: 0,
      events: 0,
    };
  }
}

export async function getVenuesList(limit = 24) {
  try {
    const supabase = supabaseServerService();

    const { data, error } = await supabase
      .from("venues")
      .select("id,name,slug,city,region,country,status,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { ok: false as const, error: error.message, venues: [] as any[] };
    }

    return { ok: true as const, venues: data ?? [] };
  } catch (err: any) {
    return { ok: false as const, error: err?.message || "Failed to load venues", venues: [] as any[] };
  }
}

export async function getRecentEvents(limit = 50) {
  try {
    const supabase = supabaseServerService();

    const { data, error } = await supabase
      .from("events")
      .select("id,venue_id,entrypoint_id,device_id,credential_id,token_jti,action,result,metadata,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { ok: false as const, error: error.message, events: [] as any[] };
    }

    return { ok: true as const, events: data ?? [] };
  } catch (err: any) {
    return { ok: false as const, error: err?.message || "Failed to load events", events: [] as any[] };
  }
}

export async function getNetworkGraph(limitVenues = 32) {
  try {
    const supabase = supabaseServerService();

    const { data: venues, error: venuesErr } = await supabase
      .from("venues")
      .select("id,name,city,region,status")
      .order("created_at", { ascending: false })
      .limit(limitVenues);

    if (venuesErr) {
      return { ok: false as const, error: venuesErr.message, nodes: [], edges: [] };
    }

    const venueIds = (venues ?? []).map((v: any) => v.id);
    if (!venueIds.length) {
      return { ok: true as const, nodes: [], edges: [] };
    }

    const { data: entrypoints, error: entryErr } = await supabase
      .from("entrypoints")
      .select("id,venue_id,name,type,status")
      .in("venue_id", venueIds)
      .limit(200);

    if (entryErr) {
      return { ok: false as const, error: entryErr.message, nodes: [], edges: [] };
    }

    const nodes = [
      ...(venues ?? []).map((v: any) => ({
        id: `venue:${v.id}`,
        label: v.name,
        type: "venue",
        city: v.city,
        region: v.region,
        status: v.status,
      })),
      ...(entrypoints ?? []).map((e: any) => ({
        id: `entry:${e.id}`,
        label: e.name || e.type || "Entrypoint",
        type: "entrypoint",
        status: e.status,
        venue_id: e.venue_id,
      })),
    ];

    const edges = (entrypoints ?? []).map((e: any) => ({
      id: `edge:${e.venue_id}:${e.id}`,
      source: `venue:${e.venue_id}`,
      target: `entry:${e.id}`,
      type: "contains",
    }));

    return { ok: true as const, nodes, edges };
  } catch (err: any) {
    return { ok: false as const, error: err?.message || "Failed to build graph", nodes: [], edges: [] };
  }
}
