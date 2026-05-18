"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function ParkingOperator({ params }: any) {
  const { venueId } = params;

  const [plate, setPlate] = useState("");
  const [minutes, setMinutes] = useState(120);
  const [result, setResult] = useState<any>(null);

  async function issue() {
    const res = await fetch("/api/parking/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        venueId,
        plate,
        minutes,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <SubpageVisual variant="default" />
      <h1>Parking Validation Panel</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="License Plate"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />

        <button onClick={issue}>
          Validate
        </button>
      </div>

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
