import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function Analytics(){

return (
<>
<SubpageVisual variant="default" />
      <MarketingShell>

<h1 style={{fontSize:48,fontWeight:900}}>
Network Analytics
</h1>

<div style={{marginTop:30,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>

<Card title="Venues" value="24"/>

<Card title="Devices" value="137"/>

<Card title="Credentials Issued" value="8,421"/>

<Card title="Access Events" value="129,311"/>

</div>

</MarketingShell>

</>

)

}

function Card({title,value}:{title:string,value:string}){

return(

<div style={{border:"1px solid #eee",borderRadius:18,padding:20}}>

<div style={{fontSize:12,color:"#666"}}>
{title}
</div>

<div style={{fontSize:34,fontWeight:900}}>
{value}
</div>

</div>

)

}
