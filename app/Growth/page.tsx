"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import OptionBar from "./Component/OptionBar";
import ServicesBar from "./Component/ServicesBar";
import Sidebar from "./Component/Sidebar";
import SkillMap from "./Component/SkillMap";
import Growth from "./Component/Growth";
import { useSkillmapStore } from "@/app/lib/skillmapStore";

//-----------------------------mock data-------------------------------------------
const defaultData = {
  nodes: [
    { id: "me", name: "Me", level: 0, score: 5 },
    { id: "1", name: "軟體工程基礎", level: 1, score: 5 },
    { id: "1.1", name: "程式語言基礎", level: 2, score: 4 },
    { id: "1.1.1", name: "Python", level: 3, score: 5 },
    { id: "1.1.2", name: "JavaScript", level: 3, score: 5 },
    { id: "1.1.3", name: "Tailwind", level: 3, score: 3 },
    { id: "2", name: "後端開發", level: 1, score: 4 },
    { id: "2.3", name: "網路與通訊", level: 2, score: 4 },
    { id: "2.3.1", name: "WebSocket", level: 3, score: 4 },
    { id: "3", name: "前端開發", level: 1, score: 4 },
    { id: "3.1", name: "Drag and Drop API", level: 2, score: 4 },
    { id: "3.2", name: "SASS/LESS", level: 2, score: 4 },
    { id: "3.3", name: "Angular (2+)", level: 2, score: 4 },
  ],
  links: [
    { source: "me", target: "1" },
    { source: "me", target: "2" },
    { source: "me", target: "3" },
    { source: "1", target: "1.1" },
    { source: "1.1", target: "1.1.1" },
    { source: "1.1", target: "1.1.2" },
    { source: "1.1", target: "1.1.3" },
    { source: "2", target: "2.3" },
    { source: "2.3", target: "2.3.1" },
    { source: "3", target: "3.1" },
    { source: "3", target: "3.2" },
    { source: "3", target: "3.3" },
  ],
};

export default function SkillMapPage() {
  const router = useRouter();

  // UI state（不持久化）
  const [showSkillMap, setShowSkillMap] = useState(true);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // graphData cache（持久化在 sessionStorage）
  const { graphData, updatedAt, setGraphData, clearGraph } = useSkillmapStore();

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [loadingGraph, setLoadingGraph] = useState(false);

  const fallbackGraphData = useMemo(() => JSON.stringify(defaultData), []);

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
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkingLogin) return;

    let alive = true;

    async function loadGraphIfNeeded() {
      const TTL_MS = 5 * 60 * 1000; // 5 min
      const isFresh = updatedAt && Date.now() - updatedAt < TTL_MS;

      if (graphData && isFresh) return;

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
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = await res.json();
        const gd = json?.data ? JSON.stringify(json.data) : null;

        if (!alive) return;

        if (gd) setGraphData(gd);
        else setGraphData(fallbackGraphData);
      } catch {
        if (!alive) return;
        setGraphData(fallbackGraphData);
      } finally {
        if (!alive) return;
        setLoadingGraph(false);
      }
    }

    loadGraphIfNeeded();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingLogin]);

  const finalGraphData = graphData ?? fallbackGraphData;

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

        <div>
          {loadingGraph && (
            <div className="text-white/80 p-4">Loading skillmap...</div>
          )}

          {showSkillMap && <SkillMap graphData={finalGraphData} />}
          {showGrowth && <Growth graphData={finalGraphData} />}
        </div>

        <div className="h-full w-full">
          <ServicesBar RouterHandler={RouterHandler} />
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
