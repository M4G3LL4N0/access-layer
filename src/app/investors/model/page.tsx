k"use client";
import { useState } from "react";

export default function InvestorModel() {
  const [venues, setVenues] = useState(1000);
  const [price, setPrice] = useState(99);
  const [multiple, setMultiple] = useState(15);

  const arr = venues * price * 12;
  const valuation = arr * multiple;

  return (
    <main style={{ padding: 40 }}>
      <h1>AXW Valuation Simulator</h1>

      <label>Venues</label>
      <input type="range" min="100" max="100000" value={venues}
        onChange={(e) => setVenues(Number(e.target.value))} />
      <div>{venues.toLocaleString()}</div>

      <label>Monthly per Venue ($)</label>
      <input type="range" min="10" max="500" value={price}
        onChange={(e) => setPrice(Number(e.target.value))} />
      <div>${price}</div>

      <label>Revenue Multiple</label>
      <input type="range" min="5" max="25" value={multiple}
        onChange={(e) => setMultiple(Number(e.target.value))} />
      <div>{multiple}x</div>

      <hr />

      <h2>ARR: ${arr.toLocaleString()}</h2>
      <h2>Valuation: ${valuation.toLocaleString()}</h2>
    </main>
  );
}
