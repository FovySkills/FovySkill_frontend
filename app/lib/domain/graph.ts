// 技能圖資料處理 — 純函式

export type GraphNode = {
  id: string;
  name: string;
  level: number;
  score: number;
  origin?: "root" | "taxonomy" | "llm";
  status?: "owned" | "recommended";
  evidence?: string[];
};
export type GraphLink = { source: string; target: string };
export type Graph = { nodes: GraphNode[]; links: GraphLink[] };

export function parseGraph(raw: string | null | undefined): Graph | null {
  if (!raw) return null;
  try {
    const g = JSON.parse(raw);
    if (!g || !Array.isArray(g.nodes) || !Array.isArray(g.links)) return null;
    return g as Graph;
  } catch {
    return null;
  }
}

/** 技能地圖只顯示「已具備」；成長地圖顯示全部（含推薦）。 */
export function filterGraph(g: Graph, opts: { includeRecommended: boolean }): Graph {
  if (opts.includeRecommended) return g;
  const nodes = g.nodes.filter((n) => n.status !== "recommended");
  const ids = new Set(nodes.map((n) => n.id));
  const links = g.links.filter((l) => ids.has(String(l.source)) && ids.has(String(l.target)));
  return { nodes, links };
}

export function countByStatus(g: Graph): { owned: number; recommended: number } {
  let owned = 0;
  let recommended = 0;
  for (const n of g.nodes) {
    if (n.level === 0) continue;
    if (n.status === "recommended") recommended += 1;
    else owned += 1;
  }
  return { owned, recommended };
}

export function serializeGraph(g: Graph | null): string | null {
  return g ? JSON.stringify(g) : null;
}
