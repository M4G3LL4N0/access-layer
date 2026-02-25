"use client";
import React from "react";

export default function VenuesDirectoryClient({ venues = [] }: any) {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Venues Directory</h1>
      <div style={{ marginTop: 10 }}>
        {venues.map((v: any) => (
          <div
            key={v.id}
            style={{
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ fontWeight: 600 }}>{v.name}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{v.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
