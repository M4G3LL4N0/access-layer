import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://accessxworld.com"),
  title: "AXW — Access Layer",
  description: "Programmable access infrastructure.",
  applicationName: "AXW",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon-dark.png", type: "image/png", media: "(prefers-color-scheme: dark)" }
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: ["/favicon.ico"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
