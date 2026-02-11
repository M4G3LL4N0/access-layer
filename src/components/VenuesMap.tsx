"use client";

import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";

// Dynamic imports so Leaflet only loads in the browser
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

type Venue = {
  id: string;
  name: string;
  lat?: number | null;
  lng?: number | null;
  city?: string | null;
  region?: string | null;
};

export default function VenuesMap({ venues }: { venues: Venue[] }) {
  const withCoords = venues.filter((v) => typeof v.lat === "number" && typeof v.lng === "number");

  // Default center: San Francisco
  const center: LatLngExpression = [37.7749, -122.4194];

  return (
    <div style={{ height: 360, borderRadius: 14, overflow: "hidden", border: "1px solid #eee" }}>
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {withCoords.map((v) => (
          <Marker key={v.id} position={[v.lat as number, v.lng as number]}>
            <Popup>
              <div style={{ fontWeight: 800 }}>{v.name}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {v.city || ""} {v.region || ""}
              </div>
              <a href={`/v/${v.id}`} style={{ fontSize: 12 }}>
                View →
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

