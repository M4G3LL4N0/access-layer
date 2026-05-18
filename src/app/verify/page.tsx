"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import MarketingShell from "@/components/MarketingShell";

export default function Verify(){

const [token,setToken]=useState("")
const [result,setResult]=useState("")

async function verify(){

const res=await fetch("/api/verify",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({token})
})

const json=await res.json()

setResult(JSON.stringify(json,null,2))

}

return (
<>
<SubpageVisual variant="default" />
      <MarketingShell>

<h1 style={{fontSize:44,fontWeight:900}}>
Verify Access Token
</h1>

<div style={{marginTop:20,display:"grid",gap:12,maxWidth:500}}>

<textarea
value={token}
onChange={e=>setToken(e.target.value)}
placeholder="paste token here"
style={{padding:10,height:120}}
/>

<button
onClick={verify}
style={{
background:"black",
color:"white",
padding:12,
borderRadius:999
}}
>
Verify
</button>

</div>

<pre style={{marginTop:20,fontSize:12}}>
{result}
</pre>

</MarketingShell>

</>

)

}
