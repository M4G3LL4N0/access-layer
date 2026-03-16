import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function InvestorsPage(){

return(

<MarketingShell>

<div style={{fontSize:12,color:"#777",fontWeight:900}}>
INVESTORS
</div>

<h1 style={{fontSize:52,fontWeight:950,letterSpacing:-1.4}}>
AXW is the trust layer for physical access.
</h1>

<p style={{maxWidth:900,lineHeight:1.65,color:"#333"}}>
AXW connects identity, policy, and space into a programmable system.
The platform that proves access becomes the infrastructure layer
operators, devices, and partners integrate into.
</p>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:14,
marginTop:24
}}>

<Card
title="Why now"
body="Operators face rising liability and fragmented systems."
/>

<Card
title="Why AXW"
body="One layer governing permissions, tokens, verification, and logs."
/>

<Card
title="Why it compounds"
body="Every venue strengthens the network."
/>

<Card
title="Outcome"
body="AXW becomes infrastructure for physical access networks."
/>

</div>

</MarketingShell>

)

}

function Card({title,body}:{title:string,body:string}){

return(

<div style={{
border:"1px solid #eee",
borderRadius:16,
padding:16,
background:"white"
}}>

<div style={{fontWeight:900}}>
{title}
</div>

<div style={{marginTop:8,color:"#666",lineHeight:1.6}}>
{body}
</div>

</div>

)

}
