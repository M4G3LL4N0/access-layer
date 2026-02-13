import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

function isExpired(expiresAt: string) {
  return new Date(expiresAt).getTime() <= Date.now();
}

export default async function PassPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const supabase = supabaseServer();

  // Avoid .single() "coerce" errors by selecting + ordering + limiting.
  const { data, error } = await supabase
    .from("access_passes")
    .select("token,status,issued_at,expires_at,venue_id,created_at")
    .eq("token", token)
    .order("created_at", { ascending: false })
    .limit(1);

  const pass = data?.[0];

  if (error || !pass) {
    return (
      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-black">Access Pass</h1>
        <p className="mt-2 text-zinc-700">
          Pass not found or expired.
        </p>
        <Link className="mt-4 inline-block underline" href="/venues">
          Back to directory →
        </Link>

        {error && (
          <pre className="mt-6 rounded-xl bg-zinc-50 p-4 text-xs overflow-auto">
            {JSON.stringify({ error: error.message }, null, 2)}
          </pre>
        )}
      </main>
    );
  }

  const expired = isExpired(pass.expires_at);
  const active = pass.status === "active" && !expired;

  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black">Access Pass</h1>
        <Link className="underline" href={`/v/${pass.venue_id}`}>
          Venue →
        </Link>
      </div>

      <div
        className={[
          "mt-4 rounded-2xl border p-5",
          active ? "border-emerald-200 bg-emerald-50" : "border-zinc-200 bg-zinc-50",
        ].join(" ")}
      >
        <div className="text-lg font-extrabold">
          {active ? "Status: active" : "Status: inactive"}
        </div>

        <div className="mt-2 text-sm text-zinc-700">
          <div><span className="font-bold">Issued:</span> {new Date(pass.issued_at).toLocaleString()}</div>
          <div><span className="font-bold">Expires:</span> {new Date(pass.expires_at).toLocaleString()}</div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-bold text-zinc-600">Token</div>
          <div className="mt-1 rounded-xl border bg-white p-3 font-mono text-sm break-all">
            {pass.token}
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-800">
          Show this pass to confirm you were granted access during the active window.
          <span className="font-bold"> (No codes displayed.)</span>
        </p>
      </div>

      <Link className="mt-5 inline-block underline" href="/venues">
        Back to directory →
      </Link>
    </main>
  );
}
