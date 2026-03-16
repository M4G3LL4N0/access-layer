"use client";

import React, { useState } from "react";

export default function DeviceControls({devices, venueId}:{devices:any[],venueId:string}){

const [rows,setRows]=useState(devices)

async function toggle(id:string,status:string){

const next=status==="active"?"inactive":"active"

await fetch("/api/ops/toggle-device",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({deviceId:id,venueId,status:next})
})

setRows(rows.map(d=>d.id===id?{...d,status:next}:d))

}

return(

<div style={{border:"1px solid #eee",borderRadius:18,padding:16,background:"white"}}>

<div style={{fontWeight:900}}>Device Controls</div>

<div style={{marginTop:12,display:"grid",gap:10}}>

{rows.map(d=>(

<div key={d.id}
style={{display:"flex",justifyContent:"space-between",border:"1px solid #eee",padding:10,borderRadius:12}}>

<div>
<div style={{fontWeight:800}}>{d.name}</div>
<div style={{fontSize:12,color:"#666"}}>{d.status}</div>
</div>

<button
onClick={()=>toggle(d.id,d.status)}
style={{borderRadius:999,padding:"8px 14px",border:"1px solid #ddd",background:"white",fontWeight:800}}
>

{d.status==="active"?"Disable":"Enable"}

</button>

</div>

))}

</div>

</div>

)

}
