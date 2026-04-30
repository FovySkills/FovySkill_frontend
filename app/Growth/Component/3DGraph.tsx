"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import type { ForceGraphMethods } from "react-force-graph-3d";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

type NodeT = {
  id?: string | number;
  name?: string;
  level?: number;
  score?: number;
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
  [key: string]: unknown;
};
type LinkT = { source: string | NodeT; target: string | NodeT };
type GraphT = { nodes: NodeT[]; links: LinkT[] };
type SkillTree3DProps = {
  data: GraphT;
  onNodeSelect?: (node: NodeT) => void;
};

function getLevelColor(level: unknown) {
  const normalizedLevel = Number(level ?? 0);

  if (normalizedLevel === 1) return "#007BFF";
  if (normalizedLevel === 2) return "#28A745";
  if (normalizedLevel === 3) return "#FFC107";
  return "#66ccff";
}

function createTextSprite(text: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const fontSize = 64;

  ctx.font = `600 ${fontSize}px Arial`;
  const textWidth = ctx.measureText(text).width;

  const padX = 28;
  const padY = 20;

  canvas.width = Math.ceil(textWidth + padX * 2);
  canvas.height = fontSize + padY * 2;

  ctx.font = `600 ${fontSize}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false, 
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
    sprite.renderOrder = 999;
  const scale = 0.09;
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);

  return sprite;
}

function SkillTree3D({ data, onNodeSelect }: SkillTree3DProps) {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

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
    if (fgRef.current && size.width && size.height) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 260 });
    }
  }, [size]);

  useEffect(() => {
    const graph = fgRef.current;
    if (!graph) return;

    const chargeForce = graph.d3Force("charge");
    chargeForce?.strength?.(-700);
    chargeForce?.distanceMax?.(280);

    const linkForce = graph.d3Force("link");
    linkForce?.distance?.(120);

    graph.d3ReheatSimulation();
  }, [data]);

  useEffect(() => {
    const graph = fgRef.current;
    if (!graph) return;

    const radial = (alpha: number) => {
      for (const n of data.nodes) {
        const lv = Number(n.level ?? 0);
        const targetR = lv * 60; 
        if (targetR === 0) continue;

        const x = n.x ?? 0;
        const y = n.y ?? 0;
        const z = n.z ?? 0;

        const r = Math.sqrt(x * x + y * y + z * z) || 1;
        const k = ((targetR - r) / r) * 0.08 * alpha; 
        n.vx = (n.vx ?? 0) + x * k;
        n.vy = (n.vy ?? 0) + y * k;
        n.vz = (n.vz ?? 0) + z * k;
      }
    };

    graph.d3Force("radial", radial);
    graph.d3ReheatSimulation();

    return () => {
      try {
        graph.d3Force("radial", null);
      } catch {
        // The graph instance can be disposed before effect cleanup finishes.
      }
    };
  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {!!size.width && !!size.height && (
        <ForceGraph3D
          ref={fgRef}
          width={size.width}
          height={size.height}
          graphData={data}
          forceEngine="d3"
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.22}
          backgroundColor="#232323"
          enableNavigationControls={true}
          showNavInfo={false} 
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node: NodeT) => {
            const radius = 5 + Number(node.score ?? 3);
            const color = getLevelColor(node.level);

            const geometry = new THREE.SphereGeometry(radius, 18, 18);
            const material = new THREE.MeshStandardMaterial({
              color,
              opacity: 0.85,
              transparent: true,
              roughness: 0.35,
              metalness: 0.08,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.renderOrder = 1;
            const group = new THREE.Group();
            group.add(sphere);

            const label = createTextSprite(String(node.name ?? node.id));
            label.renderOrder = 999;
            label.position.set(0, 0, 0);
            group.add(label);

            return group;
          }}
          linkColor={() => "rgba(255,255,255,0.35)"}
          linkWidth={1}
          linkOpacity={0.7}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={1}
          onNodeClick={(node: NodeT) => {
            onNodeSelect?.(node);
          }}
        />
      )}
    </div>
  );
}

export default function SkillTree({
  graphData,
  onNodeSelect,
}: {
  graphData: string;
  onNodeSelect?: (node: NodeT) => void;
}) {
  const data = useMemo<GraphT | null>(() => {
    try {
      if (!graphData) return null;
      return JSON.parse(graphData) as GraphT;
    } catch {
      return null;
    }
  }, [graphData]);

  if (!data) return <div className="w-full h-full" />;

  return (
    <SkillTree3D
      data={data}
      onNodeSelect={onNodeSelect}
    />
  );
}
