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
              <div className="flex items-center gap-6">
                <a href="/use-cases" className="text-sm hover:text-blue-600 transition-colors">Use Cases</a>
                <a href="/pricing" className="text-sm hover:text-blue-600 transition-colors">Pricing</a>
                <a href="/developers" className="text-sm hover:text-blue-600 transition-colors">Developers</a>
                <a href="/dashboard" className="text-sm hover:text-blue-600 transition-colors">Dashboard</a>
                <a href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Login</a>
                <a href="/demo" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
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
          <footer className="border-t border-gray-200 bg-gray-50">
            <div className="container py-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                <div className="md:col-span-2">
                  <div className="font-bold text-lg mb-4">AXW Access Layer</div>
                  <p className="text-sm text-gray-600 mb-4 max-w-sm">
                    Policy-driven physical access infrastructure for parking, coworking, events, and property management.
                  </p>
                  <div className="flex gap-4">
                    <a href="https://twitter.com/axw" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="https://github.com/axw" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com/company/axw" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-4 text-sm">Product</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/features" className="hover:text-blue-600 transition-colors">Features</a></li>
                    <li><a href="/use-cases" className="hover:text-blue-600 transition-colors">Use Cases</a></li>
                    <li><a href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                    <li><a href="/security" className="hover:text-blue-600 transition-colors">Security</a></li>
                    <li><a href="/roadmap" className="hover:text-blue-600 transition-colors">Roadmap</a></li>
                  </ul>
                </div>
                
                <div>
                  <div className="font-semibold mb-4 text-sm">Developers</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/developers" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                    <li><a href="/developers/api" className="hover:text-blue-600 transition-colors">API Reference</a></li>
                    <li><a href="/developers/guides" className="hover:text-blue-600 transition-colors">Integration Guides</a></li>
                    <li><a href="/developers/sdks" className="hover:text-blue-600 transition-colors">SDKs</a></li>
                    <li><a href="/developers/examples" className="hover:text-blue-600 transition-colors">Code Examples</a></li>
                  </ul>
                </div>
                
                <div>
                  <div className="font-semibold mb-4 text-sm">Company</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/about" className="hover:text-blue-600 transition-colors">About</a></li>
                    <li><a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a></li>
                    <li><a href="/customers" className="hover:text-blue-600 transition-colors">Customers</a></li>
                    <li><a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
                    <li><a href="/careers" className="hover:text-blue-600 transition-colors">Careers</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600">
                    © 2024 AXW Access Layer. All rights reserved.
                  </div>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    <a href="/compliance" className="hover:text-blue-600 transition-colors">Compliance</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
