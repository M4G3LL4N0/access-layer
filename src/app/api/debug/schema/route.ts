import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

async function getColumns(table: string) {
  const supabase = supabaseAdmin();

  const { data, error } = await supabase.rpc("columns_for_table", { p_table: table });

  if (error) {
    return { table, ok: false, error: error.message, columns: [] as string[] };
  }

  const columns = (data || []).map((r: any) => r.column_name).filter(Boolean);
  return { table, ok: true, error: null as string | null, columns };
}

export async function GET() {
  const tables = ["venues", "access_passes", "access_rules", "venue_owner_invites", "venue_owners"];
  const results = [];
  for (const t of tables) results.push(await getColumns(t));
  return NextResponse.json({ ok: true, results });
}
