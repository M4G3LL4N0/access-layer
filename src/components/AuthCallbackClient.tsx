"use client";

import { useEffect, useState } from "react";

export default function AuthCallbackClient() {
  const [msg, setMsg] = useState("Completing sign-in…");

  useEffect(() => {
    const t = setTimeout(() => setMsg("Signed in. You can close this tab."), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 18, marginBottom: 8 }}>Auth Callback</h1>
      <p style={{ opacity: 0.8 }}>{msg}</p>
    </div>
  );
}
