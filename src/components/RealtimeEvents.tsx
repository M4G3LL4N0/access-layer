"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RealtimeEvents(){

const [events,setEvents]=useState<any[]>([])

useEffect(()=>{

const channel=supabase
.channel("events-stream")
.on(
"postgres_changes",
{event:"INSERT",schema:"public",table:"events"},
payload=>{
setEvents(e=>[payload.new,...e].slice(0,20))
}
)
.subscribe()

return ()=>supabase.removeChannel(channel)

},[])

return(

<div style={{border:"1px solid #eee",padding:16,borderRadius:18}}>

<div style={{fontWeight:900}}>Realtime Access Events</div>

<div style={{marginTop:12,display:"grid",gap:8}}>

{events.map((e,i)=>(
<div key={i} style={{fontSize:13}}>
{e.action} · {e.result}
</div>
))}

</div>

</div>

)

}
