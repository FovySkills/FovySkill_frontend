"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import OptionBar from "./Component/OptionBar";
import ServicesBar from "./Component/ServicesBar";
import Sidebar from "./Component/Sidebar";
import SkillMap from "./Component/SkillMap";
import Growth from "./Component/Growth";
<<<<<<< HEAD
import UploadArea from "./Component/UploadArea";
import DetailCard, { type Metric } from "./Component/DetailCard";

import { useSkillmapStore } from "@/app/lib/skillmapStore";
import { readJsonResponse, toSkillGraphDataString } from "@/app/lib/skillGraph";

type SelectedSkillNode = {
  id?: string | number;
  name?: string;
  level?: number;
  score?: number;
  metrics?: unknown;
  [key: string]: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function getNodeMetrics(node: SelectedSkillNode): Metric[] {
  if (Array.isArray(node.metrics)) {
    const metrics = node.metrics.flatMap((metric) => {
      if (!isRecord(metric)) return [];

      const label = metric.label ?? metric.name ?? metric.title;
      const value = metric.value ?? metric.score;
      const numericValue = Number(value);

      if (!label || !Number.isFinite(numericValue)) return [];
      return [{ label: String(label), value: numericValue }];
    });

    if (metrics.length > 0) return metrics;
  }

  return [{ label: "技能分數", value: Number(node.score ?? 0) }];
}
=======

import { useSkillmapStore } from "@/app/lib/skillmapStore";
import { filterGraph, parseGraph, serializeGraph } from "@/app/lib/domain/graph";
>>>>>>> feat/skillmap-v2

export default function SkillMapPage() {
  const router = useRouter();

  const [showSkillMap, setShowSkillMap] = useState(true);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
<<<<<<< HEAD
  const [showUpload, setShowUpload] = useState(false);
  const [selectedSkillNode, setSelectedSkillNode] = useState<SelectedSkillNode | null>(null);
=======
>>>>>>> feat/skillmap-v2

  const { graphData, updatedAt, setGraphData, clearGraph } = useSkillmapStore();

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [loadingGraph, setLoadingGraph] = useState(false);

  function RouterHandler() {
    router.push("/Dashboard");
  }

  function showSkillMapController() {
    setShowSkillMap(true);
    setShowGrowth(false);
  }

  function showGrowthController() {
    setShowSkillMap(false);
    setShowGrowth(true);
    setSelectedSkillNode(null);
  }

  const handleUploadSuccess = () => {
    // UploadArea 已把新的圖寫入全域狀態，切到技能地圖分頁
    showSkillMapController();
  };

  // 技能地圖只顯示已具備的技能；成長地圖多顯示推薦的延伸技能
  const ownedGraph = useMemo(() => {
    const g = parseGraph(graphData);
    return g ? serializeGraph(filterGraph(g, { includeRecommended: false })) : null;
  }, [graphData]);

  // 1) check session
  useEffect(() => {
    let alive = true;

    async function checkLogin() {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!alive) return;

        if (res.status === 401) {
          clearGraph();
          router.replace("/");
          return;
        }
      } catch {
        if (!alive) return;
        router.replace("/");
        return;
      } finally {
        if (!alive) return;
        setCheckingLogin(false);
      }
    }

    checkLogin();
    return () => {
      alive = false;
    };
  }, [clearGraph, router]);

  useEffect(() => {
    if (checkingLogin) return;

    let alive = true;

    async function loadGraphIfNeeded() {
      const TTL_MS = 5 * 60 * 1000;
      const isFresh = updatedAt !== null && Date.now() - updatedAt < TTL_MS;

      // isFresh 對 null 也生效：剛 fetch 完但沒有樹（404/503）也不應馬上重試
      if (isFresh) return;

      setLoadingGraph(true);
      try {
        const res = await fetch("/api/tree/latest", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          if (res.status === 401) {
            clearGraph();
            router.replace("/");
            return;
          }
          // 404 = 新帳號尚無技能樹，正常狀態 → 顯示 placeholder
          if (res.status === 404) {
            if (!alive) return;
            setGraphData(null);
            return;
          }
          throw new Error(`Request failed: ${res.status}`);
        }

<<<<<<< HEAD
        const json = await readJsonResponse(res);
        const nextGraphData = toSkillGraphDataString(json);
=======
        const json = await res.json();
        const graph = json?.data?.graph ?? null;
        const nextGraphData = graph === null ? null : JSON.stringify(graph);
>>>>>>> feat/skillmap-v2

        if (!alive) return;
        setGraphData(nextGraphData);
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setGraphData(null);
      } finally {
        if (!alive) return;
        setLoadingGraph(false);
      }
    }

    loadGraphIfNeeded();

    return () => {
      alive = false;
    };
  }, [checkingLogin, updatedAt, setGraphData, clearGraph, router]);

  useEffect(() => {
    setSelectedSkillNode(null);
  }, [graphData]);

  if (checkingLogin) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-white/90">
        Checking session...
      </div>
    );
  }

  return (
    <>
      {!showSidebar && (
        <SidebarButton showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      )}

      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="h-screen w-full grid-rows-[1fr_8fr_1fr] grid">
        <div className="flex justify-between w-full">
          <OptionBar
            showSkillMap={showSkillMap}
            showGrowth={showGrowth}
            onSkillMap={showSkillMapController}
            onGrowth={showGrowthController}
          />
        </div>

        <div className="relative min-h-0">
          {loadingGraph && (
            <div className="flex items-center justify-center h-screen w-full text-white">
              Loading skillmap...
            </div>
          )}

<<<<<<< HEAD
          {!loadingGraph && showSkillMap && (
            <SkillMap
              graphData={graphData}
              onNodeSelect={setSelectedSkillNode}
            />
          )}
=======
          {!loadingGraph && showSkillMap && <SkillMap graphData={ownedGraph} />}
>>>>>>> feat/skillmap-v2
          {!loadingGraph && showGrowth && <Growth graphData={graphData} />}

          {!loadingGraph && showSkillMap && selectedSkillNode && (
            <div className="absolute right-6 top-1/2 z-30 max-h-full -translate-y-1/2 overflow-y-auto py-4">
              <button
                type="button"
                aria-label="Close detail card"
                onClick={() => setSelectedSkillNode(null)}
                className="absolute right-5 top-9 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                ✕
              </button>
              <DetailCard
                title={String(selectedSkillNode.name ?? selectedSkillNode.id ?? "技能節點")}
                score={Number(selectedSkillNode.score ?? 0)}
                metrics={getNodeMetrics(selectedSkillNode)}
              />
            </div>
          )}
        </div>

        <div className="h-full w-full relative">
          <ServicesBar
            RouterHandler={RouterHandler}
            setGraphData={setGraphData}
            onUploadSuccess={handleUploadSuccess}
            onHistory={() => router.push("/History")}
          />
        </div>
      </div>
    </>
  );
}

function SidebarButton({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setShowSidebar(true)}
      aria-label="Open sidebar"
      className="fixed right-0 top-1/2 -translate-y-1/2 w-10 h-16 rounded-l-full bg-white/10 backdrop-blur
      border border-white/30 border-r-0 text-white text-xl flex items-center justify-center shadow-[-6px_0_16px_rgba(0,0,0,0.8)]
      transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 z-40"
    >
      {showSidebar ? ">" : "<"}
    </button>
  );
}
