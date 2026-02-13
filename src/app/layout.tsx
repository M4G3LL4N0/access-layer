import "./globals.css";

export const metadata = {
  title: "Access ↔ Space (MVP)",
  description: "Rule-based access passes. No codes published.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
