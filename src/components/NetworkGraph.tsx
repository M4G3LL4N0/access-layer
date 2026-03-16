"use client";

import React from "react";

export default function NetworkGraph({nodes,edges}:{nodes:any[],edges:any[]}){

return(

<div style={{border:"1px solid #eee",borderRadius:18,padding:20,background:"white"}}>

<div style={{fontWeight:900,marginBottom:10}}>AXW Network Graph</div>

<svg width="100%" height="400">

{edges.map((e,i)=>(
<line
key={i}
x1={e.x1}
y1={e.y1}
x2={e.x2}
y2={e.y2}
stroke="#ddd"
/>
))}

{nodes.map((n,i)=>(
<circle
key={i}
cx={n.x}
cy={n.y}
r="8"
fill="black"
/>
))}

</svg>

</div>

)

}
