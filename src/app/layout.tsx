import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://accessxworld.com"),
  title: "AXW — Access Layer",
  description: "Programmable access infrastructure and policy-driven coordination.",
  icons: {
    icon: [{ url: "/icon.png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "AXW — Access Layer",
    description: "Programmable access infrastructure and policy-driven coordination.",
    url: "/",
    siteName: "AXW",
    images: [{ url: "/opengraph-image.png" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AXW — Access Layer",
    description: "Programmable access infrastructure and policy-driven coordination.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
