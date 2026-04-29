export const metadata = {
  title: "access-layer",
  description: "Live homepage restoration layer"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#050816" }}>{children}</body>
    </html>
  );
}
