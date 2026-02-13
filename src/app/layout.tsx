import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access ↔ Space (MVP)",
  description: "Rule-based access layer (no codes published).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0b0b0d",
          color: "#ffffff",
          fontFamily: "system-ui",
        }}
      >
        {children}
      </body>
    </html>
  );
}
