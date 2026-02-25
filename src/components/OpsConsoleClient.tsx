"use client";
import React from "react";

export default function OpsConsoleClient(props: any) {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Ops Console</h1>
      <p style={{ opacity: 0.7 }}>Placeholder component.</p>
      <pre style={{ marginTop: 10, fontSize: 12 }}>
        {JSON.stringify(props ?? {}, null, 2)}
      </pre>
    </div>
  );
}
