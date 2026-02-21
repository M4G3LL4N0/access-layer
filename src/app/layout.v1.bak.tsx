import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Access ↔ Space (MVP)",
  description: "Rule-based access passes. No codes published.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#f4f4f5",
          color: "#111",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
