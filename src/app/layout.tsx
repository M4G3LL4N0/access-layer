import "./globals.css";

export const metadata = {
  title: "AXW — Access × World",
  description: "Programmable access, everywhere.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
