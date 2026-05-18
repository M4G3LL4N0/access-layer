import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function Investors(){

return (
<>
<SubpageVisual variant="default" />
      <MarketingShell>

<h1 style={{fontSize:56,fontWeight:900,letterSpacing:-2}}>
Access infrastructure for the physical world
</h1>

<p style={{fontSize:18,color:"#444",maxWidth:900}}>
AXW replaces fragmented access systems with a unified trust layer.
</p>

<section style={{marginTop:40,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>

<Card
title="Massive Market"
body="Every building, venue, airport, and parking network depends on access control."
/>

<Card
title="Broken Infrastructure"
body="Current systems are fragmented, insecure, and impossible to scale globally."
/>

<Card
title="AXW Solution"
body="A universal access layer built on credentials, verification, and proof."
/>

<Card
title="Network Effects"
body="Each venue added increases the value of the system for every participant."
/>

</section>

</MarketingShell>

</>

)

}

function Card({title,body}:{title:string,body:string}){

return(

<div style={{border:"1px solid #eee",borderRadius:16,padding:16}}>

<div style={{fontWeight:900}}>{title}</div>

<p style={{marginTop:8,color:"#555"}}>{body}</p>

</div>

)

}
