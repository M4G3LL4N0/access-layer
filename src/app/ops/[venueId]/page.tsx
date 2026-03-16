import MarketingShell from "@/components/MarketingShell";
import LiveEvents from "@/components/LiveEvents";
import DeviceControls from "@/components/DeviceControls";

export default async function Page({params}:{params:{venueId:string}}){

const venueId=params.venueId

return(

<MarketingShell>

<h1 style={{fontSize:42,fontWeight:900}}>Venue Operator Console</h1>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:20}}>

<LiveEvents venueId={venueId}/>

<DeviceControls devices={[]} venueId={venueId}/>

</div>

</MarketingShell>

)

}
