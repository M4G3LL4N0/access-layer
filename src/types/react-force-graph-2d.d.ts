declare module "react-force-graph-2d" {
  import { FC } from "react";
  
  interface ForceGraph2DProps {
    graphData: object;
    width: number;
    height: number;
    nodeId?: string;
    linkSource?: string;
    linkTarget?: string;
    nodeLabel?: string | ((node: any) => string);
    linkLabel?: string | ((link: any) => string);
    nodeAutoColorBy?: string | ((node: any) => string);
    linkAutoColorBy?: string | ((link: any) => string);
    nodeCanvasObject?: (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => void;
    linkCanvasObject?: (link: any, ctx: CanvasRenderingContext2D, globalScale: number) => void;
    onNodeClick?: (node: any) => void;
    onLinkClick?: (link: any) => void;
  }
  
  const ForceGraph2D: FC<ForceGraph2DProps>;
  export default ForceGraph2D;
}
