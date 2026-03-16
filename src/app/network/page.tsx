import MarketingShell from "@/components/MarketingShell";
import NetworkGraph from "@/components/NetworkGraph";

export default function Network(){

const data = {

nodes: [
{id:"AXW",group:1},
{id:"Venue A",group:2},
{id:"Venue B",group:2},
{id:"Device 1",group:3},
{id:"Device 2",group:3},
{id:"Credential",group:4}
],

links: [
{source:"AXW",target:"Venue A"},
{source:"AXW",target:"Venue B"},
{source:"Venue A",target:"Device 1"},
{source:"Venue B",target:"Device 2"},
{source:"Device 1",target:"Credential"}
]

}

return(

<MarketingShell>

<h1 style={{fontSize:52,fontWeight:900}}>
Global Access Network
</h1>

<p style={{color:"#555",maxWidth:900}}>
AXW builds a programmable network connecting spaces,
devices, and credentials across the physical world.
</p>

<div style={{marginTop:30}}>

<NetworkGraph data={data}/>

</div>

</MarketingShell>

)

}
