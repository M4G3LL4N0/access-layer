import { supabaseServerService } from "@/lib/supabaseServer";

export async function getNetworkGraph(limitVenues = 50) {
  const supabase = supabaseServerService();

  const { data: venues } = await supabase
    .from("venues")
    .select("id,name,city,region,status")
    .limit(limitVenues);

  const venueIds = (venues ?? []).map(v => v.id);

  const { data: entrypoints } = await supabase
    .from("entrypoints")
    .select("id,venue_id,name,type,status")
    .in("venue_id", venueIds);

  const { data: devices } = await supabase
    .from("devices")
    .select("id,venue_id,entrypoint_id,name,type,status")
    .in("venue_id", venueIds);

  const nodes = [
    ...(venues ?? []).map(v => ({
      id:`venue:${v.id}`,
      label:v.name,
      group:"venue"
    })),
    ...(entrypoints ?? []).map(e => ({
      id:`entry:${e.id}`,
      label:e.name,
      group:"entrypoint"
    })),
    ...(devices ?? []).map(d => ({
      id:`device:${d.id}`,
      label:d.name,
      group:"device"
    }))
  ];

  const links = [
    ...(entrypoints ?? []).map(e => ({
      source:`venue:${e.venue_id}`,
      target:`entry:${e.id}`
    })),
    ...(devices ?? []).map(d => ({
      source:`entry:${d.entrypoint_id}`,
      target:`device:${d.id}`
    }))
  ];

  return { ok:true, nodes, links };
}
