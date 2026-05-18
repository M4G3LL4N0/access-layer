import SimpleNetworkGraph from "./SimpleNetworkGraph";

type GraphNode = {
  id: string;
  label?: string;
  type?: string;
  [key: string]: unknown;
};

type GraphEdge = {
  id?: string;
  source: string;
  target: string;
  type?: string;
};

export default function NetworkGraph({
  data,
}: {
  data: { nodes?: GraphNode[]; edges?: GraphEdge[]; links?: GraphEdge[] };
}) {
  const nodes = (data.nodes ?? []).map((node) => ({
    ...node,
    label: node.label ?? node.id,
    type: node.type ?? "entrypoint",
  }));

  const edges = (data.edges ?? data.links ?? []).map((edge, index) => ({
    ...edge,
    id: edge.id ?? `${edge.source}-${edge.target}-${index}`,
  }));

  return <SimpleNetworkGraph nodes={nodes} edges={edges} />;
}
