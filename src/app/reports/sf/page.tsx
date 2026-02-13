import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export default async function SfReportPage() {
  const supabase = supabaseServer();

  // Venues in SF region (your schema uses `region`)
  const { data: venues } = await supabase
    .from("venues")
    .select("id,name,category,status,city,region,created_at")
    .eq("region", "San Francisco CA");

  const totalVenues = venues?.length ?? 0;
  const activeVenues = (venues ?? []).filter((v) => v.status === "active").length;

  // Access passes last 7 days
  const since = isoDaysAgo(7);
  const { data: passes7 } = await supabase
    .from("access_passes")
    .select("status,created_at,venue_id")
    .gte("created_at", since);

  const totalRequestsProxy = passes7?.length ?? 0;
  const totalGranted = (passes7 ?? []).filter((p) => p.status === "active").length;

  // Simple “top venues by activity”
  const byVenue: Record<string, number> = {};
  for (const p of passes7 ?? []) {
    byVenue[p.venue_id] = (byVenue[p.venue_id] || 0) + 1;
  }
  const top = Object.entries(byVenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">SF Reliability Report</h1>
          <p className="mt-2 text-zinc-700">
            Public proof-of-work for the Access ↔ Space pilot. No codes published — rule-based passes only.
          </p>
        </div>

        <div className="flex gap-3">
          <Link className="underline" href="/venues">Directory</Link>
          <Link className="underline" href="/investors">Investors</Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs font-bold text-zinc-500">Participating venues</div>
          <div className="mt-1 text-3xl font-black">{totalVenues}</div>
          <div className="mt-1 text-sm text-zinc-700">SF region</div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs font-bold text-zinc-500">Active venues</div>
          <div className="mt-1 text-3xl font-black">{activeVenues}</div>
          <div className="mt-1 text-sm text-zinc-700">status=active</div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs font-bold text-zinc-500">Passes issued (7d)</div>
          <div className="mt-1 text-3xl font-black">{totalRequestsProxy}</div>
          <div className="mt-1 text-sm text-zinc-700">proxy for requests</div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs font-bold text-zinc-500">Granted (7d)</div>
          <div className="mt-1 text-3xl font-black">{totalGranted}</div>
          <div className="mt-1 text-sm text-zinc-700">status=active</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-black">Top venues by activity (7d)</h2>
        <p className="mt-1 text-sm text-zinc-700">
          Early signal: which locations are getting demand and validating the corridor.
        </p>

        <div className="mt-4 space-y-2">
          {top.length === 0 && (
            <div className="text-sm text-zinc-700">No activity yet in the last 7 days.</div>
          )}
          {top.map(([venueId, count]) => {
            const v = (venues ?? []).find((x) => x.id === venueId);
            return (
              <div key={venueId} className="flex items-center justify-between rounded-xl border bg-zinc-50 p-3">
                <div>
                  <div className="font-bold">{v?.name ?? venueId}</div>
                  <div className="text-xs text-zinc-600">
                    {v?.category ?? "unknown"} · {v?.status ?? "unknown"}
                  </div>
                </div>
                <div className="text-lg font-black">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-black">What this proves</h2>
        <ul className="mt-2 list-disc pl-6 text-zinc-800 space-y-2">
          <li>Real usage demand can be measured by corridor and venue type.</li>
          <li>Venues can participate with zero hardware: QR → pass → verify.</li>
          <li>Rules (hours, caps, cooldowns) are enforceable without publishing codes.</li>
        </ul>
      </div>
    </main>
  );
}
