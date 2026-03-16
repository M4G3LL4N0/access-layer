"use client";

import React, { useEffect, useState } from "react";

type Event = {
  id: string;
  action: string;
  result: string;
  created_at: string;
  device_id?: string;
  credential_id?: string;
};

export default function LiveEvents({ venueId }: { venueId?: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [status, setStatus] = useState("live");

  async function load() {
    try {
      const url = venueId
        ? `/api/ops/recent-events?venueId=${venueId}`
        : `/api/ops/recent-events`;

      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();

      if (json.ok) {
        setEvents(json.events);
        setStatus("live");
      } else {
        setStatus("degraded");
      }
    } catch {
      setStatus("degraded");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 4000);
    return () => clearInterval(id);
  }, [venueId]);

  return (
    <div style={{border:"1px solid #eee",borderRadius:18,padding:16,background:"white"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div style={{fontWeight:900}}>Live event feed</div>
        <div style={{fontSize:12,color:status==="live"?"#0a7a2f":"#a15a00"}}>
          {status}
        </div>
      </div>

      <div style={{marginTop:12,display:"grid",gap:10}}>
        {events.map(e=>(
          <div key={e.id} style={{border:"1px solid #eee",borderRadius:12,padding:10}}>
            <div style={{fontWeight:800}}>
              {e.action.toUpperCase()} · {e.result.toUpperCase()}
            </div>
            <div style={{fontSize:12,color:"#666"}}>
              {new Date(e.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
