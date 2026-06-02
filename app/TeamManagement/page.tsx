"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Users } from "lucide-react";

import { extractSkillGraphData } from "@/app/lib/skillGraph";
import SkillTree from "@/app/Growth/Component/3DGraph";

type SkillNode = {
  id?: string | number;
  name?: string;
  level?: number;
  score?: number | null;
  [key: string]: unknown;
};

type SkillLink = {
  source: string | number | SkillNode;
  target: string | number | SkillNode;
  [key: string]: unknown;
};

type SkillGraph = {
  name: string;
  nodes: SkillNode[];
  links: SkillLink[];
};

type Employee = {
  id: number | string;
  user_id?: number | string;
  username: string;
  first_name?: string;
  last_name?: string;
  real_name?: string | null;
  user_type?: string | null;
  position?: string | null;
  title?: string | null;
  profile?: {
    id?: number | string;
    user_id?: number | string;
    real_name?: string | null;
    user_type?: string | null;
  } | null;
};

type TeamMember = {
  id: string;
  userId: string;
  name: string;
  position: string;
  graph: SkillGraph | null;
  graphStatus: "idle" | "loading" | "ready" | "empty" | "error";
  graphError?: string;
};

type EmployeesResponse = {
  ok?: boolean;
  data?:
    | {
        results?: Employee[];
        employees?: Employee[];
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
  return payload.data?.results ?? payload.data?.employees ?? [];
}

function getDisplayName(employee: Employee) {
  if (employee.real_name) return employee.real_name;
  if (employee.profile?.real_name) return employee.profile.real_name;

  const fullName = [employee.first_name, employee.last_name].filter(Boolean).join(" ").trim();
  return fullName || employee.username || `使用者 ${employee.id}`;
}

function getEmployeeUserId(employee: Employee) {
  return String(employee.user_id ?? employee.profile?.user_id ?? employee.id);
}

function getApiErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;
  const record = payload as Record<string, unknown>;
  const message = record.message ?? record.detail;

  if (typeof message === "string") return message;
  if (message && typeof message === "object") return JSON.stringify(message);

  return fallback;
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

export default function TeamUpgradePage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeMemberId, setActiveMemberId] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const loadMemberTree = useCallback(async (member: TeamMember) => {
    if (member.graphStatus === "loading") return;

    setMembers((current) =>
      current.map((item) =>
        item.id === member.id
          ? { ...item, graphStatus: "loading", graphError: undefined }
          : item
      )
    );

    try {
      const treeRes = await fetch(`/api/tree/latest/${encodeURIComponent(member.userId)}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (treeRes.status === 404) {
        setMembers((current) =>
          current.map((item) =>
            item.id === member.id ? { ...item, graphStatus: "empty", graph: null } : item
          )
        );
        return;
      }

      if (!treeRes.ok) {
        const payload = await readJson<unknown>(treeRes);
        const graphError = getApiErrorMessage(payload, `Latest tree failed (${treeRes.status})`);
        setMembers((current) =>
          current.map((item) =>
            item.id === member.id
              ? { ...item, graphStatus: "error", graph: null, graphError }
              : item
          )
        );
        return;
      }

      const treeData = await readJson<unknown>(treeRes);
      const graph = normalizeGraph(treeData, member);

      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? graph
              ? { ...item, graph, graphStatus: "ready", graphError: undefined }
              : { ...item, graph: null, graphStatus: "empty", graphError: undefined }
            : item
        )
      );
    } catch {
      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? { ...item, graphStatus: "error", graph: null, graphError: "Latest tree request failed" }
            : item
        )
      );
    }
  }, []);

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
        const baseMembers: TeamMember[] = employees.map((employee) => {
          const userId = getEmployeeUserId(employee);

          return {
            id: userId,
            userId,
            name: getDisplayName(employee),
            position: employee.position || employee.title || employee.user_type || employee.profile?.user_type || "employee",
            graph: null,
            graphStatus: "idle",
          };
        });

        if (!alive) return;
        setMembers(baseMembers);
        setActiveMemberId(baseMembers[0]?.id ?? "");
        if (baseMembers[0]) {
          loadMemberTree(baseMembers[0]);
        }
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
  }, [loadMemberTree]);

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

      <section className="grid h-[calc(100vh-174px)] grid-cols-[310px_minmax(0,1fr)] gap-5">
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
                  onClick={() => {
                    setActiveMemberId(member.id);
                    loadMemberTree(member);
                  }}
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
            <SkillTree graphData={JSON.stringify(activeMember.graph)} />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center text-white/65">
              <div>
                <p className="text-lg font-semibold text-white/85">
                  {loading || activeMember?.graphStatus === "loading"
                    || activeMember?.graphStatus === "idle"
                    ? "技能樹載入中"
                    : activeMember
                      ? "這位使用者目前沒有可顯示的技能樹"
                      : "尚無可顯示的使用者"}
                </p>
                <p className="mt-2 text-sm text-white/45">
                  {activeMember?.graphStatus === "error"
                    ? activeMember.graphError || "最新技能樹 API 回傳錯誤，清單仍保留此使用者。"
                    : ""}
                </p>
              </div>
            </div>
          )}
        </section>
      </section>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center mx-15 my-5">
        <div />
        <button
          type="button"
          onClick={() => router.push("/Dashboard")}
          className="p-3 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow-[0_0_24px_rgba(0,0,0,0.8)] hover:scale-120 active:scale-90 duration-300 ease-in-out"
          title="Return Dashboard"
        >
          <svg className="size-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <div />
      </div>
    </main>
  );
}
