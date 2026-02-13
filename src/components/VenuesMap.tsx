"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type Venue = {
  id: string;
  name: string;
  lat: number | null;
  lng: number | null;
  category: string | null;
  status: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
};

// IMPORTANT: dynamic imports so Leaflet only runs in browser
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function VenuesMap({
  venues,
  height = 420,
}: {
  venues: Venue[];
  height?: number;
}) {
  const points = venues
    .filter((v) => typeof v.lat === "number" && typeof v.lng === "number")
    .map((v) => ({ ...v, lat: v.lat as number, lng: v.lng as number }));

  // Default center SF if no points
  const center: [number, number] = points.length
    ? [points[0].lat, points[0].lng]
    : [37.7749, -122.4194];

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #23232a",
        background: "#111118",
      }}
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((v) => (
          <Marker key={v.id} position={[v.lat, v.lng]}>
            <Popup>
              <div style={{ fontFamily: "system-ui", minWidth: 200 }}>
                <div style={{ fontWeight: 900 }}>{v.name}</div>
                <div style={{ opacity: 0.75, marginTop: 4 }}>
                  {(v.city || "") + (v.region ? `, ${v.region}` : "")}
                </div>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
                  {v.category || "venue"} · {v.status || "unknown"}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
