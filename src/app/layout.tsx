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
  title: "AXW Access Layer — Policy-Driven Physical Access Infrastructure",
  description: "The first access control platform that brings IAM-grade policy enforcement, cryptographic verification, and real-time audit to physical spaces. Issue signed passes, enforce fine-grained policies, revoke instantly, and integrate with existing hardware through developer-friendly APIs.",
  applicationName: "AXW Access Layer",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: "AXW Access Layer — Policy-Driven Physical Access Infrastructure",
    description: "The first access control platform that brings IAM-grade policy enforcement, cryptographic verification, and real-time audit to physical spaces.",
    url: "https://accessxworld.com",
    siteName: "AXW Access Layer",
    images: [{ url: "/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AXW Access Layer — Policy-Driven Physical Access Infrastructure",
    description: "Issue signed passes, enforce fine-grained policies, revoke instantly, and integrate with existing hardware through developer-friendly APIs.",
    images: ["/opengraph-image.png"],
  },
  keywords: [
    "access control",
    "physical access",
    "policy engine",
    "access management",
    "parking access",
    "building access",
    "venue access",
    "cryptographic verification",
    "access infrastructure",
    "IAM for physical spaces"
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <div className="flex-1 flex flex-col">
          <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white px-4">
            <div className="container mx-auto flex h-16 items-center justify-between">
              <a href="/" className="font-bold">AXW Access Layer</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/developers" className="text-sm hover:text-blue-600">Developers</a>
                <a href="/login" className="text-sm hover:text-blue-600">Login</a>
                <a href="/demo" className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                  Get Demo
                </a>
              </div>
            </div>
          </nav>
          <main className="flex-1">
            <div className="w-full" suppressHydrationWarning>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
