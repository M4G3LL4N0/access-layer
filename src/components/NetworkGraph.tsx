"use client";

import dynamic from "next/dynamic";
import React from "react";

const ForceGraph2D: any = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
);

export default function NetworkGraph({ data }: { data: any }) {
  return (
    <div
      style={{
        height: 520,
        border: "1px solid #eee",
        borderRadius: 18,
        background: "white",
        overflow: "hidden",
      }}
    >
      <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
          const label = String(node.id || "");
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
          ctx.fillStyle = "#000";
          ctx.fill();

          ctx.font = "10px sans-serif";
          ctx.fillStyle = "#111";
          ctx.fillText(label, node.x + 10, node.y + 3);
        }}
        linkColor={() => "#ddd"}
        backgroundColor="#ffffff"
      />
    </div>
  );
}
