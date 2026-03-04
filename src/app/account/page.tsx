import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function missingEnv(): string[] {
  const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"];
  return required.filter((k) => !process.env[k] || String(process.env[k]).trim().length === 0);
}

export default async function AccountPage() {
  const missing = missingEnv();

  // If env is missing, DO NOT import or call any Supabase helpers.
  // This keeps `next build` green and avoids leaking secrets.
  if (missing.length) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>Account</h1>
        <p style={{ marginTop: 10, color: "#444", lineHeight: 1.55 }}>
          Supabase env vars are not configured for this environment, so Account is temporarily in safe mode.
        </p>

        <div
          style={{
            marginTop: 16,
            border: "1px solid #eee",
            borderRadius: 14,
            padding: 16,
            background: "white",
          }}
        >
          <div style={{ fontSize: 12, letterSpacing: 1.1, color: "#666" }}>MISSING ENV</div>
          <ul style={{ marginTop: 10, marginBottom: 0, color: "#444", lineHeight: 1.6 }}>
            {missing.map((k) => (
              <li key={k}>
                <code>{k}</code>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: 12, fontSize: 13, color: "#666", lineHeight: 1.55 }}>
            Fix by adding env vars in Vercel Project → Settings → Environment Variables, and locally in <code>.env.local</code>.
          </p>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "9px 12px",
                border: "1px solid #ddd",
                borderRadius: 999,
                textDecoration: "none",
                color: "black",
                background: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Home
            </a>

            <a
              href="/login"
              style={{
                display: "inline-block",
                padding: "9px 12px",
                border: "1px solid #ddd",
                borderRadius: 999,
                textDecoration: "none",
                color: "black",
                background: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Login
            </a>

            <a
              href="/api/debug/env"
              style={{
                display: "inline-block",
                padding: "9px 12px",
                border: "1px solid #eee",
                borderRadius: 999,
                textDecoration: "none",
                color: "black",
                background: "#fafafa",
                fontSize: 14,
              }}
            >
              Debug env
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Env exists: now it's safe to import server auth helper.
  const { supabaseServerAuth } = await import("@/lib/supabaseServerAuth");
  const { supabase, user } = await supabaseServerAuth();

  if (!user) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>Account</h1>
        <p style={{ marginTop: 10, color: "#444", lineHeight: 1.55 }}>
          You’re not logged in.
        </p>
        <div style={{ marginTop: 14 }}>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              padding: "9px 12px",
              border: "1px solid #ddd",
              borderRadius: 999,
              textDecoration: "none",
              color: "black",
              background: "white",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Go to Login →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ fontSize: 34, margin: 0 }}>Account</h1>
      <p style={{ marginTop: 10, color: "#444", lineHeight: 1.55 }}>
        Logged in.
      </p>

      <div
        style={{
          marginTop: 16,
          border: "1px solid #eee",
          borderRadius: 14,
          padding: 16,
          background: "white",
        }}
      >
        <div style={{ fontSize: 12, letterSpacing: 1.1, color: "#666" }}>USER</div>
        <div style={{ marginTop: 10, lineHeight: 1.6 }}>
          <div>
            <b>Email:</b> {user.email ?? "—"}
          </div>
          <div>
            <b>UUID:</b> <code>{user.id}</code>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            const { supabaseServerAuth } = await import("@/lib/supabaseServerAuth");
            const { supabase } = await supabaseServerAuth();
            await supabase.auth.signOut();
          }}
        >
          <button
            type="submit"
            style={{
              marginTop: 14,
              padding: "9px 12px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
