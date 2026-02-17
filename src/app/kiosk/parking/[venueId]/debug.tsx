"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ParkingDebug() {
  const { venueId } = useParams() as { venueId: string };
  const [entries, setEntries] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function loadEntries() {
    try {
      const res = await fetch(`/api/parking/list?venueId=${venueId}`);
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || res.statusText);
      setEntries(j.data);
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
  }

  useEffect(() => {
    loadEntries();
  }, [venueId]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Parking Debug — {venueId}</h1>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </main>
  );
}
