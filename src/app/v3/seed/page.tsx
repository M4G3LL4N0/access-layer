export const dynamic = "force-dynamic";

export default function SeedPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 24, marginBottom: 10 }}>Seed</h1>
      <p>If you can see this page, routing is working. Next step: wire Supabase seeding.</p>
    </main>
  );
}
