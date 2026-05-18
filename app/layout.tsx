import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://accessxworld.com"),
  title: "AXW Access Layer - Programmable Access Infrastructure",
  description:
    "AXW is a neutral coordination layer for physical access infrastructure: policy-defined credentials, edge verification, and auditable proof for venues, parking, property, enterprise, and government.",
  applicationName: "AXW Access Layer",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: "AXW Access Layer - Programmable Access Infrastructure",
    description:
      "Policy-driven coordination for real-world spaces: lower liability, faster throughput, and verifiable proof of access.",
    url: "https://accessxworld.com",
    siteName: "AXW Access Layer",
    images: [{ url: "/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AXW Access Layer - Programmable Access Infrastructure",
    description:
      "Neutral physical access coordination for venues, parking, property, enterprise, and infrastructure teams.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
