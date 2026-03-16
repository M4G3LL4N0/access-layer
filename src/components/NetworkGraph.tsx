"use client";

import dynamic from "next/dynamic";
import React from "react";

const ForceGraph2D = dynamic(
() => import("react-force-graph-2d"),
{ ssr: false }
);

export default function NetworkGraph({ data }: { data: any }) {

return (

<div
style={{
height:520,
border:"1px solid #eee",
borderRadius:18,
background:"white"
}}
>

<ForceGraph2D
graphData={data}
nodeAutoColorBy="group"
nodeCanvasObject={(node:any, ctx:any) => {

ctx.beginPath();
ctx.arc(node.x,node.y,5,0,2*Math.PI,false);
ctx.fillStyle="black";
ctx.fill();

ctx.font="10px sans-serif";
ctx.fillText(node.id,node.x+8,node.y+3);

}}
/>

</div>

)

}
