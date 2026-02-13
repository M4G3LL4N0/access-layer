import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function SignagePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supabase = supabaseServer();

  const { data: venue, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status")
    .eq("id", venueId)
    .maybeSingle();

  if (error || !venue) {
    return (
      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-black">Signage</h1>
        <p className="mt-2 text-zinc-700">Venue not found.</p>

        <Link className="mt-4 inline-block underline" href="/venues">
          Back to directory →
        </Link>

        {(error || !venue) && (
          <pre className="mt-6 rounded-xl bg-zinc-50 p-4 text-xs overflow-auto">
            {JSON.stringify(
              { error: error?.message ?? null, hint: "Check venueId exists in venues" },
              null,
              2
            )}
          </pre>
        )}
      </main>
    );
  }

  const requestUrlPath = `/request/${venue.id}`;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Printable Signage</h1>
        <Link className="underline" href={`/v/${venue.id}`}>
          Venue →
        </Link>
      </div>

      <p className="mt-2 text-zinc-700">
        Print this page. Post near the entrance / front desk / restroom corridor.
      </p>

      <div className="mt-6 rounded-3xl border bg-white p-8">
        <div className="text-sm font-bold tracking-wide text-zinc-500">
          ACCESS ↔ SPACE
        </div>

        <div className="mt-2 text-3xl font-black">
          {venue.name}
        </div>

        <div className="mt-1 text-zinc-700">
          {venue.address ? `${venue.address}, ` : ""}
          {venue.city} {venue.region ? `— ${venue.region}` : ""} {venue.country ? `— ${venue.country}` : ""}
        </div>

        <div className="mt-5 rounded-2xl border bg-zinc-50 p-5">
          <div className="text-2xl font-black">Request Access Here</div>
          <div className="mt-2 text-sm text-zinc-700">
            Scan QR or open:
          </div>
          <div className="mt-2 rounded-xl border bg-white p-3 font-mono text-sm break-all">
            {requestUrlPath}
          </div>

          <div className="mt-3 text-sm text-zinc-800">
            <span className="font-bold">No codes displayed.</span> You’ll receive a time-limited pass to show staff.
          </div>
        </div>

        <div className="mt-5 text-sm text-zinc-700">
          Category: <span className="font-bold text-zinc-900">{venue.category}</span>
          {" · "}
          Status: <span className="font-bold text-zinc-900">{venue.status}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link className="underline" href="/venues">Back to directory →</Link>
      </div>
    </main>
  );
}
