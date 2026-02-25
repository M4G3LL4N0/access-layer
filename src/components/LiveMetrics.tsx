"use client";
import { useEffect, useState } from "react";

export default function LiveMetrics() {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12 }}>
      <strong>Live Metrics</strong>
      <div style={{ marginTop: 10, fontSize: 12 }}>{time}</div>
    </div>
  );
}
