// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const APP_BASE =
  process.env.NEXT_PUBLIC_APP_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://app.accessxworld.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_BASE),

  title: {
    default: "AXW — Access × World",
    template: "%s — AXW",
  },
  description:
    "AXW (Access × World) is programmable access infrastructure: policy-driven issuance, verification, and audit logs for physical spaces.",

  applicationName: "AXW",
  authors: [{ name: "AXW" }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  themeColor: "#0B1220",

  // Favicons + app icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },

  // Social preview
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AXW",
    title: "AXW — Access × World",
    description:
      "Programmable access infrastructure: policy-driven issuance, verification, and audit logs for physical spaces.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AXW",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AXW — Access × World",
    description:
      "Programmable access infrastructure: policy-driven issuance, verification, and audit logs for physical spaces.",
    images: ["/opengraph-image.png"],
  },

  // Optional: helps SEO/UX
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
