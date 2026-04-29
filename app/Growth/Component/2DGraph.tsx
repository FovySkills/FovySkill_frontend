"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { hierarchy, tree } from "d3-hierarchy";
import { useSkillmapStore } from "@/app/lib/skillmapStore";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type NodeT = { id: string; name: string; level: number; score: number };
type LinkT = { source: string; target: string };
type GraphT = { nodes: NodeT[]; links: LinkT[] };

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/** 節點半徑：畫圖/點擊區一致 */
function nodeRadius(node: any) {
  const score = Number(node.score ?? 0); // 0~5
  return 14 + score * 1.4;
}

/**
 * 底部液位式填充（Canvas）：
 * 灰底圓 + 圓內底部白色液體填充 + 液面弧線
 */
function drawLiquidNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  ratio: number
) {
  ctx.save();

  // 灰色底
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(130,130,130,0.55)";
  ctx.fill();

  // 液面高度（ratio=1 -> 最上；ratio=0 -> 最下）
  const liquidTopY = y + r - 2 * r * ratio;

  const padding = r * 0.06;
  const innerR = r - padding;

  // clip 圓內 + clip 液體區域
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, innerR, 0, Math.PI * 2);
  ctx.clip();

  ctx.beginPath();
  ctx.rect(x - innerR, liquidTopY, innerR * 2, y + innerR - liquidTopY);
  ctx.clip();

  // 液體本體
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.fillRect(x - innerR, y - innerR, innerR * 2, innerR * 2);

  // 液面波浪（輕微）
  const waveAmp =
    Math.max(1, innerR * 0.10) *
    (0.35 + 0.65 * (1 - Math.abs(ratio - 0.5) * 2));

  const leftX = x - innerR;
  const rightX = x + innerR;
  const midX = x;

  ctx.beginPath();
  ctx.moveTo(leftX, liquidTopY);
  ctx.quadraticCurveTo(midX, liquidTopY - waveAmp, rightX, liquidTopY);
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = Math.max(1, innerR * 0.10);
  ctx.stroke();

  // 液面高光
  ctx.beginPath();
  ctx.moveTo(leftX, liquidTopY + 1.5);
  ctx.quadraticCurveTo(
    midX,
    liquidTopY + 1.5 - waveAmp * 0.55,
    rightX,
    liquidTopY + 1.5
  );
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = Math.max(1, innerR * 0.07);
  ctx.stroke();

  ctx.restore(); // end clip

  // 外圈描邊
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

/** 繪製選中狀態的發光外圈 */
function drawSelectedGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r + 4, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(234, 88, 12, 0.9)"; // Orange-600
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]); // 虛線效果增加設計感
  ctx.stroke();
  
  // 發光特效
  ctx.shadowColor = "rgba(234, 88, 12, 0.7)";
  ctx.shadowBlur = 15;
  ctx.stroke();
  
  ctx.restore();
}

/** 找 root：優先 name/id 是「我 / Me」的節點，否則找 level 最小的 */
function pickRoot(nodes: NodeT[]) {
  const byMe = nodes.find((n) => String(n.name ?? "").includes("我")) ||
               nodes.find((n) => String(n.id ?? "") === "Me") ||
               nodes.find((n) => String(n.name ?? "") === "Me");

  if (byMe) return byMe;

  let best = nodes[0];
  for (const n of nodes) {
    if (Number(n.level ?? 999) < Number(best.level ?? 999)) best = n;
  }
  return best;
}

/**
 * 把一般 graph 轉成「以 root 為起點的樹」
 * 這裡把 links 當作無向邊，做 BFS 建 parent-child
 */
function buildTreeFromGraph(data: GraphT) {
  const nodesById = new Map<string, NodeT>();
  data.nodes.forEach((n) => nodesById.set(String(n.id), n));

  const rootNode = pickRoot(data.nodes);
  const rootId = String(rootNode.id);

  const adj = new Map<string, string[]>();
  const addEdge = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, []);
    adj.get(a)!.push(b);
  };

  data.links.forEach((l) => {
    const s = String((l as any).source);
    const t = String((l as any).target);
    addEdge(s, t);
    addEdge(t, s);
  });

  const parent = new Map<string, string | null>();
  parent.set(rootId, null);

  const q: string[] = [rootId];
  while (q.length) {
    const cur = q.shift()!;
    const nei = adj.get(cur) ?? [];
    for (const nb of nei) {
      if (parent.has(nb)) continue;
      parent.set(nb, cur);
      q.push(nb);
    }
  }

  // children map
  const children = new Map<string, string[]>();
  for (const [id, p] of parent.entries()) {
    if (p === null) continue;
    if (!children.has(p)) children.set(p, []);
    children.get(p)!.push(id);
  }

  // 轉成 hierarchy 可吃的 nested object
  const makeNode = (id: string): any => {
    const n = nodesById.get(id);
    return {
      id,
      name: n?.name ?? id,
      level: n?.level ?? 0,
      score: n?.score ?? 0,
      _raw: n,
      children: (children.get(id) ?? []).map(makeNode),
    };
  };

  const rootObj = makeNode(rootId);

  // 只保留 BFS 到的節點與 edges（避免孤島）
  const reachableIds = new Set(Array.from(parent.keys()));
  const prunedNodes = data.nodes.filter((n) => reachableIds.has(String(n.id)));
  const prunedLinks = data.links
    .map((l) => ({ source: String((l as any).source), target: String((l as any).target) }))
    .filter((l) => reachableIds.has(l.source) && reachableIds.has(l.target));

  return { rootObj, prunedNodes, prunedLinks };
}

/** 用 d3.tree 做 radial tree layout，輸出固定座標的 graphData */
function layoutRadialTree(
  rootObj: any,
  nodes: NodeT[],
  links: { source: string; target: string }[],
  levelDistance = 170
): GraphT {
  // 建 hierarchy
  const h = hierarchy(rootObj);

  // 先算深度 -> 決定半徑
  const maxDepth = h.height; // root depth=0
  const radius = Math.max(220, (maxDepth + 1) * levelDistance);

  // tree layout：x=角度(0~2π)，y=半徑(0~radius)
  const t = tree<any>()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.6));

  const laid = t(h);

  // id -> position
  const pos = new Map<string, { x: number; y: number; depth: number }>();
  laid.descendants().forEach((d) => {
    const angle = d.x - Math.PI / 2; // 讓 root 往上
    const r = d.y;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    pos.set(String(d.data.id), { x, y, depth: d.depth });
  });

  // 產生新的 nodes（加 fx/fy 固定）
  const outNodes = nodes.map((n) => {
    const id = String(n.id);
    const p = pos.get(id) ?? { x: 0, y: 0, depth: 0 };
    return {
      ...n,
      // 固定位置（ForceGraph2D 會尊重 fx/fy）
      fx: p.x,
      fy: p.y,
      // 也給初始 x/y，避免第一次閃一下
      x: p.x,
      y: p.y,
    } as any;
  });

  // links 用原本的（也可以改成只用 parent-child links，但保留原圖會比較「關聯」完整）
  const outLinks = links.map((l) => ({ source: l.source, target: l.target })) as any;

  return { nodes: outNodes as any, links: outLinks as any };
}

function SkillTree2D({ data }: { data: GraphT }) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { selectedNodes, toggleNodeSelection } = useSkillmapStore();

  // ✅ 做「真正樹狀」固定座標版 graph
  const laidOutData = useMemo(() => {
    const { rootObj, prunedNodes, prunedLinks } = buildTreeFromGraph(data);
    return layoutRadialTree(rootObj, prunedNodes, prunedLinks, 170);
  }, [data]);

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

  // ✅ 重要：固定布局就不要再讓力模擬亂跑（設 cooldownTicks=0）
  // 但有時候 ForceGraph 仍會嘗試跑幾步，你可以強制 stop：
  useEffect(() => {
    if (!fgRef.current) return;
    // 有些版本有這個 API，沒有也沒關係
    try {
      fgRef.current.pauseAnimation?.();
    } catch {}
  }, [laidOutData]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* 
        將原本的 selectedNode DetailCard 隱藏，
        因為已經統一由 Sidebar 來顯示選中的節點資訊，
        若是需要保留單擊彈出 DetailCard，也可恢復此段。
      */}

      {!!size.width && !!size.height && (
        <ForceGraph2D
          ref={fgRef}
          width={size.width}
          height={size.height}
          graphData={laidOutData}
          backgroundColor="#232323"
          cooldownTicks={0}              // ✅ 不跑物理
          enableNodeDrag={false}         // ✅ 固定 layout，不允許拖（你也可以改 true，但會破壞樹）
          nodeRelSize={1}                // 不重要，但可保留

          nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
            const r = nodeRadius(node);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
            ctx.fill();
          }}

          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const score = Number(node.score ?? 0); // 0~5
            const ratio = clamp01(score / 5);
            const r = nodeRadius(node);

            // 如果該節點被選中，畫出亮色外圍光圈
            const isSelected = selectedNodes.some(sn => sn.id === String(node.id));
            if (isSelected) {
              drawSelectedGlow(ctx, node.x, node.y, r);
            }

            // 液位式節點
            drawLiquidNode(ctx, node.x, node.y, r, ratio);

            // label
            const label = String(node.name ?? node.id);
            const fontSize = Math.max(10, 14 / globalScale);
            ctx.font = `600 ${fontSize}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            ctx.fillText(label, node.x, node.y - r - 4);
          }}

          linkColor={() => "rgba(255,255,255,0.28)"}
          linkWidth={1}

          onNodeClick={(node: any) => {
            toggleNodeSelection({
              id: String(node.id),
              name: String(node.name ?? node.id),
              level: Number(node.level ?? 0),
              score: Number(node.score ?? 0),
            });
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
