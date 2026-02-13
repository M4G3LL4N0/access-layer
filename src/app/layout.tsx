import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access ↔ Space",
  description: "Rule-based access, no codes published.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white text-zinc-900">
          {children}
        </div>
      </body>
    </html>
  );
}
