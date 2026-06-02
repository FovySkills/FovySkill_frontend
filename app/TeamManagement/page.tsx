"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Search, Users } from "lucide-react";
import * as THREE from "three";
import type { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-3d";

import { extractSkillGraphData } from "@/app/lib/skillGraph";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

type SkillNode = NodeObject<{
  name?: string;
  level?: number;
  score?: number | null;
}>;

type SkillLink = LinkObject<SkillNode>;

type SkillGraph = {
  name: string;
  nodes: SkillNode[];
  links: SkillLink[];
};

type Employee = {
  id: number | string;
  username: string;
  first_name?: string;
  last_name?: string;
  user_type?: string | null;
  position?: string | null;
  title?: string | null;
};

type TeamMember = {
  id: string;
  name: string;
  position: string;
  graph: SkillGraph | null;
  graphStatus: "loading" | "ready" | "empty" | "error";
};

type EmployeesResponse = {
  ok?: boolean;
  data?:
    | {
        results?: Employee[];
      }
    | Employee[];
};

async function readJson<T>(res: Response): Promise<T | null> {
  const text = await res.text().catch(() => "");
  if (!text.trim()) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function getEmployees(payload: EmployeesResponse | null) {
  if (!payload) return [];
  if (Array.isArray(payload.data)) return payload.data;
  return payload.data?.results ?? [];
}

function getDisplayName(employee: Employee) {
  const fullName = [employee.first_name, employee.last_name].filter(Boolean).join(" ").trim();
  return fullName || employee.username || `使用者 ${employee.id}`;
}

function normalizeGraph(rawData: unknown, member: Pick<TeamMember, "id" | "name">): SkillGraph | null {
  const graphData = extractSkillGraphData(rawData);
  if (!graphData) return null;

  return {
    name: member.name,
    nodes: graphData.nodes.map((node) => ({
      ...node,
      name: Number(node.level ?? -1) === 0 ? member.name : node.name ?? String(node.id),
    })),
    links: graphData.links as SkillLink[],
  };
}

function getNodeColor(level?: number) {
  if (level === 0) return "#f8fafc";
  if (level === 1) return "#38bdf8";
  if (level === 2) return "#22c55e";
  if (level === 3) return "#f59e0b";
  if (level === 4) return "#f97316";
  if (level === 5) return "#a855f7";
  return "#94a3b8";
}

function getScoreColor(score?: number | null) {
  if (typeof score !== "number" || Number.isNaN(score)) return "#64748b";
  if (score >= 8) return "#14b8a6";
  if (score >= 6.5) return "#22c55e";
  if (score >= 5) return "#eab308";
  if (score >= 3) return "#f97316";
  return "#ef4444";
}

function getScoreRatio(score?: number | null) {
  if (typeof score !== "number" || Number.isNaN(score)) return 0;
  return Math.min(Math.max(score / 10, 0), 1);
}

function createTextSprite(text: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const fontSize = 72;

  ctx.font = `600 ${fontSize}px Arial`;
  const textWidth = ctx.measureText(text).width;
  canvas.width = Math.ceil(textWidth + 48);
  canvas.height = fontSize + 44;

  ctx.font = `600 ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.96)";
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
  const scale = 0.09;
  sprite.renderOrder = 999;
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
  sprite.position.set(0, 8, 6);

  return sprite;
}

function createWaterFillTexture(fillRatio: number, fillColor: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext("2d")!;
  const center = canvas.width / 2;
  const radius = 112;
  const fillHeight = radius * 2 * fillRatio;
  const fillTop = center + radius - fillHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = "rgba(15, 15, 15, 0.74)";
  ctx.fillRect(center - radius, center - radius, radius * 2, radius * 2);
  ctx.fillStyle = fillColor;
  ctx.fillRect(center - radius, fillTop, radius * 2, fillHeight);

  ctx.restore();
  ctx.beginPath();
  ctx.arc(center, center, radius - 3, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.lineWidth = 8;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function SkillTree3D({ data }: { data: SkillGraph }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.max(320, Math.floor(rect.width)),
        height: Math.max(320, Math.floor(rect.height)),
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!fgRef.current) return;

    fgRef.current.cameraPosition({ x: 0, y: 0, z: 230 }, { x: 0, y: 0, z: 0 }, 400);

    const chargeForce = fgRef.current.d3Force("charge");
    chargeForce?.strength?.(-520);
    chargeForce?.distanceMax?.(260);

    const linkForce = fgRef.current.d3Force("link");
    linkForce?.distance?.(92);

    fgRef.current.d3ReheatSimulation?.();
  }, [data.name, dimensions.width, dimensions.height]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph3D
          key={`${data.name}-${dimensions.width}-${dimensions.height}`}
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          forceEngine="d3"
          d3AlphaDecay={0.025}
          d3VelocityDecay={0.24}
          nodeThreeObject={(node: SkillNode) => {
            const score = typeof node.score === "number" ? node.score : 0;
            const nodeColor =
              typeof node.score === "number" ? getScoreColor(node.score) : getNodeColor(node.level);
            const geometry = new THREE.SphereGeometry(7 + Math.min(score, 10) * 0.55, 28, 28);
            const material = new THREE.MeshStandardMaterial({
              color: nodeColor,
              transparent: true,
              opacity: typeof node.score === "number" ? 0.3 : 0.88,
              roughness: 0.72,
              metalness: 0.08,
            });

            const group = new THREE.Group();
            group.add(new THREE.Mesh(geometry, material));

            if (typeof node.score === "number") {
              const fillMaterial = new THREE.SpriteMaterial({
                map: createWaterFillTexture(getScoreRatio(node.score), nodeColor),
                transparent: true,
                depthTest: false,
              });
              const fillSprite = new THREE.Sprite(fillMaterial);
              const spriteSize = 17 + Math.min(score, 10) * 1.1;
              fillSprite.scale.set(spriteSize, spriteSize, 1);
              fillSprite.renderOrder = 10;
              group.add(fillSprite);
            }

            group.add(createTextSprite(String(node.name ?? node.id)));
            return group;
          }}
          linkColor={() => "rgba(255,255,255,0.38)"}
          linkWidth={1}
          linkOpacity={0.72}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={1}
          backgroundColor="#303030"
          showNavInfo={false}
        />
      )}
    </div>
  );
}

export default function TeamUpgradePage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeMemberId, setActiveMemberId] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;

    async function fetchData() {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch("/api/auth/employees?profile__user_type=employee", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(res.status === 403 ? "沒有讀取所有使用者的權限" : "無法取得使用者清單");
        }

        const data = await readJson<EmployeesResponse>(res);
        const employees = getEmployees(data);
        const baseMembers: TeamMember[] = employees.map((employee) => ({
          id: String(employee.id),
          name: getDisplayName(employee),
          position: employee.position || employee.title || employee.user_type || "employee",
          graph: null,
          graphStatus: "loading",
        }));

        if (!alive) return;
        setMembers(baseMembers);
        setActiveMemberId(baseMembers[0]?.id ?? "");

        const loadedMembers = await Promise.all(
          baseMembers.map(async (member) => {
            try {
              const treeRes = await fetch(`/api/tree/latest/${encodeURIComponent(member.id)}`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
              });

              if (treeRes.status === 404) {
                return { ...member, graphStatus: "empty" as const };
              }

              if (!treeRes.ok) {
                return { ...member, graphStatus: "error" as const };
              }

              const treeData = await readJson<unknown>(treeRes);
              const graph = normalizeGraph(treeData, member);

              return graph
                ? { ...member, graph, graphStatus: "ready" as const }
                : { ...member, graphStatus: "empty" as const };
            } catch {
              return { ...member, graphStatus: "error" as const };
            }
          })
        );

        if (!alive) return;
        setMembers(loadedMembers);
      } catch (error) {
        if (!alive) return;
        setMembers([]);
        setActiveMemberId("");
        setErrorMessage(error instanceof Error ? error.message : "載入團隊資料失敗");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      alive = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return members;

    return members.filter((member) =>
      [member.name, member.position, member.id].some((value) => value.toLowerCase().includes(keyword))
    );
  }, [members, query]);

  const activeMember =
    members.find((member) => member.id === activeMemberId) ?? filteredMembers[0] ?? members[0] ?? null;

  useEffect(() => {
    if (!activeMemberId && filteredMembers[0]) {
      setActiveMemberId(filteredMembers[0].id);
      return;
    }

    if (activeMemberId && filteredMembers.length && !filteredMembers.some((member) => member.id === activeMemberId)) {
      setActiveMemberId(filteredMembers[0].id);
    }
  }, [activeMemberId, filteredMembers]);

  const readyCount = members.filter((member) => member.graphStatus === "ready").length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#303030] px-7 py-5 text-white">
      <header className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-3 text-white/65">
          <Users className="h-5 w-5" />
          <span className="text-sm tracking-[0.2em]">ALL USERS</span>
        </div>

        <h1 className="text-center text-lg tracking-widest">升級團隊，讓成長更有效</h1>

        <div className="justify-self-end text-sm text-white/60">
          {loading ? "載入中" : `${members.length} 位使用者 / ${readyCount} 份技能樹`}
        </div>
      </header>

      <section className="grid h-[calc(100vh-112px)] grid-cols-[310px_minmax(0,1fr)] gap-5">
        <aside className="flex min-h-0 flex-col rounded-[8px] border border-white/10 bg-[#292929] shadow-[0_0_18px_rgba(0,0,0,0.35)]">
          <div className="border-b border-white/10 p-4">
            <label className="flex h-10 items-center gap-2 rounded-full bg-[#353535] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋使用者"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </label>
          </div>

          <div className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
            {errorMessage ? (
              <div className="rounded-[8px] border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-100">
                {errorMessage}
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="rounded-[8px] border border-white/10 p-4 text-sm text-white/55">
                {loading ? "載入使用者中" : "沒有符合條件的使用者"}
              </div>
            ) : (
              filteredMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveMemberId(member.id)}
                  className={[
                    "grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-[8px] border px-4 py-3 text-left transition",
                    activeMember?.id === member.id
                      ? "border-white/45 bg-white text-[#232323] shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                      : "border-white/10 bg-[#353535] text-white hover:border-white/28 hover:bg-[#3b3b3b]",
                  ].join(" ")}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-base font-semibold">{member.name}</span>
                    <span className={activeMember?.id === member.id ? "text-xs text-black/55" : "text-xs text-white/45"}>
                      {member.position}
                    </span>
                  </span>
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      member.graphStatus === "ready"
                        ? "bg-emerald-400"
                        : member.graphStatus === "loading"
                          ? "bg-yellow-300"
                          : "bg-white/25",
                    ].join(" ")}
                    aria-label={member.graphStatus}
                  />
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="relative min-h-0 overflow-hidden rounded-[8px] border border-white/10 bg-[#232323] shadow-[0_0_22px_rgba(0,0,0,0.38)]">
          <div className="absolute left-5 top-5 z-10 rounded-[8px] bg-[#232323]/80 px-4 py-3 backdrop-blur">
            <h2 className="m-0 text-xl font-semibold tracking-wide">
              {activeMember?.name ?? (loading ? "載入中" : "尚無使用者")}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              {activeMember ? `${activeMember.position} · 全部樹狀圖` : "全部樹狀圖"}
            </p>
          </div>

          {activeMember?.graphStatus === "ready" && activeMember.graph ? (
            <SkillTree3D data={activeMember.graph} />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center text-white/65">
              <div>
                <p className="text-lg font-semibold text-white/85">
                  {loading || activeMember?.graphStatus === "loading"
                    ? "技能樹載入中"
                    : activeMember
                      ? "這位使用者目前沒有可顯示的技能樹"
                      : "尚無可顯示的使用者"}
                </p>
                <p className="mt-2 text-sm text-white/45">
                  {activeMember?.graphStatus === "error"
                    ? "最新技能樹 API 回傳錯誤，清單仍保留此使用者。"
                    : "系統會顯示資料庫內所有使用者；不再依部門分組或顯示部門標籤。"}
                </p>
              </div>
            </div>
          )}

          {filteredMembers.length > 1 && (
            <ChevronRight className="pointer-events-none absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 text-white/35" />
          )}
        </section>
      </section>

      <button
        type="button"
        onClick={() => router.push("/Dashboard")}
        className="fixed bottom-8 right-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-[0_0_24px_rgba(0,0,0,0.8)] duration-300 ease-in-out hover:scale-125"
        title="Back To Dashboard"
      >
        <Home className="h-5 w-5" />
      </button>
    </main>
  );
}
