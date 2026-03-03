import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://accessxworld.com"),
  title: "AXW — Access × World",
  description: "Programmable access infrastructure and policy-driven coordination systems.",
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
      <body style={{ margin: 0, background: "#fafafa" }}>
        <SiteHeader />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 16px 54px" }}>{children}</div>
      </body>
    </html>
  );
}
