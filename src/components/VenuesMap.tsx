"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/components/VenuesDirectoryClient";

// Load react-leaflet only in browser
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function VenuesMap({ venues }: { venues: Venue[] }) {
  const points = (venues || []).filter((v) => typeof v.lat === "number" && typeof v.lng === "number");

  // Default center: SF-ish if nothing else
  const center: [number, number] =
    points.length > 0
      ? ([points[0].lat as number, points[0].lng as number] as [number, number])
      : ([37.7749, -122.4194] as [number, number]);

  return (
    <div
      style={{
        width: "100%",
        height: 420, // explicit height = NO collapse / half-render
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.12)",
        background: "white",
      }}
    >
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((v) => (
          <Marker key={v.id} position={[v.lat as number, v.lng as number] as any}>
            <Popup>
              <div style={{ fontFamily: "system-ui", minWidth: 200 }}>
                <div style={{ fontWeight: 900 }}>{v.name}</div>
                <div style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>
                  {(v.city || "—")} — {(v.region || "—")}
                </div>
                <div style={{ marginTop: 10 }}>
                  <a href={`/v/${v.id}`} style={{ fontWeight: 900 }}>
                    Open venue →
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
