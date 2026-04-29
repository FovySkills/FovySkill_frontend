export type SkillGraphNode = {
  id: string | number;
  name?: string;
  level?: number;
  score?: number;
  [key: string]: unknown;
};

export type SkillGraphLink = {
  source: unknown;
  target: unknown;
  [key: string]: unknown;
};

export type SkillGraphData = {
  nodes: SkillGraphNode[];
  links: SkillGraphLink[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function parseGraphObject(value: unknown): SkillGraphData | null {
  if (!isRecord(value)) return null;

  const { nodes, links } = value;
  if (!Array.isArray(nodes) || !Array.isArray(links)) return null;
  if (nodes.length === 0) return null;

  const nodesOk = nodes.every((node) => isRecord(node) && "id" in node);
  const linksOk =
    nodes.length <= 1 ||
    links.every((link) => isRecord(link) && "source" in link && "target" in link);

  if (!nodesOk || !linksOk) return null;
  return { nodes: nodes as SkillGraphNode[], links: links as SkillGraphLink[] };
}

export function extractSkillGraphData(value: unknown, depth = 0): SkillGraphData | null {
  if (depth > 5) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    try {
      return extractSkillGraphData(JSON.parse(trimmed), depth + 1);
    } catch {
      return null;
    }
  }

  const direct = parseGraphObject(value);
  if (direct) return direct;
  if (!isRecord(value)) return null;

  for (const key of ["data", "result", "tree", "graph", "skillmap", "skill_map"]) {
    const nested = extractSkillGraphData(value[key], depth + 1);
    if (nested) return nested;
  }

  return null;
}

export function toSkillGraphDataString(value: unknown) {
  const graphData = extractSkillGraphData(value);
  return graphData ? JSON.stringify(graphData) : null;
}

export async function readJsonResponse(response: Response) {
  const text = await response.text().catch(() => "");
  if (!text.trim()) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
