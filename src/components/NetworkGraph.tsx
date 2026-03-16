"use client";

import ForceGraph2D from "react-force-graph-2d";

export default function NetworkGraph({data}:{data:any}){

return(

<div style={{height:500,border:"1px solid #eee",borderRadius:20}}>

<ForceGraph2D
graphData={data}
nodeAutoColorBy="group"
/>

</div>

)

}
