import { redirect } from "next/navigation";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

export default async function AccountPage() {
  const { supabase, user } = await supabaseServerAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Your Account</h1>
      <p>Signed in as: {user?.email}</p>
      <p>UUID: {user?.id}</p>
      <button
        onClick={() => supabase.auth.signOut()}
        style={{
          padding: "8px 12px",
          background: "black",
          color: "white",
          fontWeight: 800,
          borderRadius: 6,
          marginTop: 12,
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </main>
  );
}
