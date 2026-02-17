import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = supabaseServer;

  const { count: venueCount } = await supabase
    .from("venues")
    .select("*", { count: "exact", head: true });

  const { count: passCount } = await supabase
    .from("access_passes")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({
    venues: venueCount || 0,
    passes: passCount || 0,
  });
}
