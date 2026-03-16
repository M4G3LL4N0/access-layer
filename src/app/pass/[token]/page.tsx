import React from "react";
import QRCode from "react-qr-code";
import MarketingShell from "@/components/MarketingShell";

export default function PassPage({ params }: { params: { token: string } }) {

const token = params.token

return (

<MarketingShell>

<div style={{textAlign:"center",paddingTop:40}}>

<h1 style={{fontSize:44,fontWeight:900,letterSpacing:-1}}>
AXW Access Pass
</h1>

<p style={{color:"#555",marginTop:6}}>
Present this QR code at the entry point
</p>

<div style={{
marginTop:30,
display:"inline-block",
padding:20,
border:"1px solid #eee",
borderRadius:20,
background:"white"
}}>

<QRCode
value={token}
size={260}
/>

</div>

<p style={{
marginTop:20,
fontSize:12,
color:"#777",
wordBreak:"break-all",
maxWidth:400,
marginLeft:"auto",
marginRight:"auto"
}}>
{token}
</p>

</div>

</MarketingShell>

)

}
