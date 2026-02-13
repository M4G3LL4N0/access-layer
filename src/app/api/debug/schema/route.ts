import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

async function getColumns(table: string) {
  const supabase = supabaseAdmin();

  // Query Postgres catalog through RPC-like SQL via Supabase is not exposed,
  // so we use a simple "select * limit 1" and read keys.
  // This is robust for development and avoids schema guessing.
  const { data, error } = await supabase.from(table).select("*").limit(1);

  if (error) return { table, ok: false, error: error.message, columns: [] as string[] };
  const row = (data && data[0]) || null;
  const columns = row ? Object.keys(row).sort() : [];
  return { table, ok: true, error: null as string | null, columns };
}

export async function GET() {
  const tables = ["venues", "access_passes", "access_rules", "venue_owner_invites", "venue_owners"];
  const results = [];
  for (const t of tables) results.push(await getColumns(t));
  return NextResponse.json({ ok: true, results });
}
