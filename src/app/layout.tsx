import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://accessxworld.com"),
  title: "AXW — Access × World",
  description: "The coordination layer between access and space: safer, faster operations with provable audit trails.",
  applicationName: "AXW",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: "AXW — Access × World",
    description: "Programmable access infrastructure and policy-driven coordination systems.",
    url: "https://accessxworld.com",
    siteName: "AXW",
    images: [{ url: "/opengraph-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXW — Access × World",
    description: "Programmable access infrastructure and policy-driven coordination systems.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
