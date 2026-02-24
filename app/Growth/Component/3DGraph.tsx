"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

type NodeT = { id: string; name: string; level: number; score: number };
type LinkT = { source: string; target: string };
type GraphT = { nodes: NodeT[]; links: LinkT[] };

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

function SkillTree3D({ data }: { data: GraphT }) {
  const fgRef = useRef<any>(null);
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
    if (!fgRef.current) return;
    fgRef.current.d3Force("charge").strength(-700).distanceMax(280);
    fgRef.current.d3Force("link").distance(120);
    fgRef.current.d3AlphaDecay(0.02);
    fgRef.current.d3VelocityDecay(0.22);
    fgRef.current.d3ReheatSimulation();
  }, [data]);

  useEffect(() => {
    if (!fgRef.current) return;

    const radial = (alpha: number) => {
      const nodes = fgRef.current.graphData().nodes;
      for (const n of nodes) {
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

    fgRef.current.d3Force("radial", radial);
    fgRef.current.d3ReheatSimulation();

    return () => {
      try {
        fgRef.current.d3Force("radial", null);
      } catch {}
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
          backgroundColor="#232323"
          enableNavigationControls={true}
          showNavInfo={false} 
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node: any) => {
            const radius = 5 + Number(node.score ?? 3);

            const geometry = new THREE.SphereGeometry(radius, 18, 18);
            const color =
              node.level === 1
                ? "#007BFF"
                : node.level === 2
                ? "#28A745"
                : node.level === 3
                ? "#FFC107"
                : "#66ccff";

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
          onNodeClick={(node: any) => {
            // 你之後可以 setSelectedNode(node) 開 detail card
            console.log("clicked node:", node);
          }}
        />
      )}
    </div>
  );
}

export default function SkillTree({ graphData }: { graphData: string }) {
  const data = useMemo<GraphT | null>(() => {
    try {
      if (!graphData) return null;
      return JSON.parse(graphData) as GraphT;
    } catch {
      return null;
    }
  }, [graphData]);

  if (!data) return <div className="w-full h-full" />;

  return <SkillTree3D data={data} />;
}
