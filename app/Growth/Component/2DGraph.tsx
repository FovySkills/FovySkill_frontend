"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import DetailCard from "./DetailCard";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
    ssr: false,
});

type NodeT = { id: string; name: string; level: number; score: number };
type LinkT = { source: string; target: string };
type GraphT = { nodes: NodeT[]; links: LinkT[] };

function SkillTree2D({ data }: { data: GraphT }) {
    const fgRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const [selectedNode, setSelectedNode] = useState<NodeT | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        });

        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (!fgRef.current) return;

        fgRef.current.d3Force("charge").strength(-700).distanceMax(280);
        fgRef.current.d3Force("link").distance(120);
        fgRef.current.d3AlphaDecay(0.02);
        fgRef.current.d3VelocityDecay(0.22);
        fgRef.current.d3ReheatSimulation();
    }, [data]);

    return (
        <div ref={containerRef} className="w-full h-full relative">
            {selectedNode && (
                <div className="absolute top-3 right-3 z-10">
                    <DetailCard
                        title={selectedNode.name ?? selectedNode.id}
                        score={Number(selectedNode.score ?? 0)}
                        metrics={[
                            { label: "Level", value: Math.min(100, Number(selectedNode.level ?? 0) * 25) },
                            { label: "Confidence", value: Math.min(100, Number(selectedNode.score ?? 0)) },
                            { label: "Progress", value: Math.min(100, Number(selectedNode.score ?? 0)) },
                        ]}
                    />
                </div>
            )}
            {!!size.width && !!size.height && (
                <ForceGraph2D
                    ref={fgRef}
                    width={size.width}
                    height={size.height}
                    graphData={data}
                    backgroundColor="#232323"

                    nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                        const radius = 5 + Number(node.score ?? 3);
                        const color =
                            node.level === 1
                                ? "#007BFF"
                                : node.level === 2
                                    ? "#28A745"
                                    : node.level === 3
                                        ? "#FFC107"
                                        : "#66ccff";

                        ctx.beginPath();
                        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = color;
                        ctx.globalAlpha = 0.85;
                        ctx.fill();
                        ctx.globalAlpha = 1;

                        const label = String(node.name ?? node.id);
                        const fontSize = Math.max(10, 14 / globalScale);
                        ctx.font = `600 ${fontSize}px Arial`;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "bottom";
                        ctx.fillStyle = "rgba(255,255,255,0.95)";
                        ctx.fillText(label, node.x, node.y - radius - 4);
                    }}

                    linkColor={() => "rgba(255,255,255,0.35)"}
                    linkWidth={1}

                    onNodeClick={(node: any) => {
                        setSelectedNode({
                            id: String(node.id),
                            name: String(node.name ?? node.id),
                            level: Number(node.level ?? 0),
                            score: Number(node.score ?? 0),
                        });
                    }}

                    onNodeDrag={(node: any) => {
                        node.fx = node.x;
                        node.fy = node.y;
                    }}
                    onNodeDragEnd={(node: any) => {
                        node.fx = node.x;
                        node.fy = node.y;
                    }}
                />
            )}
        </div>
    );
}


export default function GrowthTree({ graphData }: { graphData: string }) {
    const data = useMemo<GraphT | null>(() => {
        try {
            if (!graphData) return null;
            return JSON.parse(graphData) as GraphT;
        } catch {
            return null;
        }
    }, [graphData]);

    if (!data) return <div className="w-full h-full" />;

    return <SkillTree2D data={data} />;
}
