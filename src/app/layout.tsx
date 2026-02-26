import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://accessxworld.com"),
  title: "Access × World",
  description: "Programmable access infrastructure and policy-driven coordination systems."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
