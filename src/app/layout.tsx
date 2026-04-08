import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <main className="flex-1 w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
