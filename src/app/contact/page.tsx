import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export const dynamic = "force-static";

export default function ContactPage(){

return (
<>
<SubpageVisual variant="contact" />
      <MarketingShell>

<h1 style={{fontSize:52,fontWeight:950}}>
Talk to the AXW team
</h1>

<p style={{maxWidth:760,lineHeight:1.6,color:"#333"}}>
If you operate a venue, space, or infrastructure system where access matters,
AXW can help reduce friction and increase accountability.
</p>

<form style={{marginTop:24,maxWidth:520}}>

<input placeholder="Name" style={input}/>

<input placeholder="Company" style={input}/>

<input placeholder="Email" style={input}/>

<textarea placeholder="How can we help?" style={{...input,height:120}}/>

<button style={button}>
Submit →
</button>

</form>

</MarketingShell>

</>

)

}

const input={
display:"block",
width:"100%",
marginBottom:12,
padding:12,
border:"1px solid #ddd",
borderRadius:10
}

const button={
padding:"12px 16px",
borderRadius:999,
border:"1px solid #ddd",
background:"#000",
color:"#fff",
fontWeight:900,
cursor:"pointer",
transition:"all 0.2s ease",
":hover":{
  opacity:0.9
}
}
