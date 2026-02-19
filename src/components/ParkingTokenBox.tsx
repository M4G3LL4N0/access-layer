"use client";

import { useEffect, useRef, useState } from "react";

export default function ParkingTokenBox({
  initialToken = "",
  onVerify,
}: {
  initialToken?: string;
  onVerify: (token: string) => Promise<void> | void;
}) {
  const [token, setToken] = useState(initialToken);
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setToken(initialToken);
  }, [initialToken]);

  async function pasteFromClipboard() {
    setMsg("");
    try {
      // Clipboard API may require https + user gesture.
      const t = await navigator.clipboard.readText();
      if (t) {
        setToken(t.trim());
        setMsg("Pasted.");
        setTimeout(() => setMsg(""), 1200);
        inputRef.current?.focus();
      } else {
        setMsg("Clipboard empty.");
      }
    } catch {
      setMsg("Paste not allowed here. Click input and paste manually.");
    }
  }

  return (
    <div className="axw-card" style={{ marginTop: 12 }}>
      <div style={{ fontWeight: 950 }}>Verify Token</div>
      <div className="axw-muted" style={{ marginTop: 6, fontSize: 13 }}>
        Paste a parking token and verify if it’s active + not expired.
      </div>

      <div className="axw-row" style={{ marginTop: 10, alignItems: "stretch" }}>
        <input
          ref={inputRef}
          className="axw-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter parking token"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
        />
        <button
          className="axw-btn"
          type="button"
          onClick={pasteFromClipboard}
          style={{ whiteSpace: "nowrap" }}
        >
          Paste
        </button>
        <button
          className="axw-btn axw-btn-primary"
          type="button"
          onClick={() => onVerify(token.trim())}
          style={{ whiteSpace: "nowrap" }}
        >
          Check Token
        </button>
      </div>

      {!!msg && <div className="axw-muted" style={{ marginTop: 8, fontSize: 13 }}>{msg}</div>}
    </div>
  );
}
