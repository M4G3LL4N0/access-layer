import "./globals.css";

export const metadata = {
  title: "Access ↔ Space",
  description: "Neutral access layer for physical space.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
