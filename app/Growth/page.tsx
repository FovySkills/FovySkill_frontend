"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OptionBar from "./Component/OptionBar";
import ServicesBar from "./Component/ServicesBar";
import Sidebar from "./Component/Sidebar";
import SkillMap from "./Component/SkillMap";
import Growth from "./Component/Growth";
import UploadArea from "./Component/UploadArea";

import { useSkillmapStore } from "@/app/lib/skillmapStore";

export default function SkillMapPage() {
  const router = useRouter();

  const [showSkillMap, setShowSkillMap] = useState(true);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

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
  }

  const handleUploadSuccess = () => {

  };

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

      if (graphData !== null && isFresh) return;

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
        const tree = json?.data?.data ?? null;

        const nextGraphData =
          tree === null ? null : typeof tree === "string" ? tree : JSON.stringify(tree);

        if (!alive) return;
        setGraphData(nextGraphData);
      } catch (e) {
        console.error(e);
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

  if (checkingLogin) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-white/90">
        Checking session...
      </div>
    );
  }

  return (
    <>
      <UploadArea
        show={showUpload}
        setShow={setShowUpload}
        onUploadSuccess={handleUploadSuccess}
        setGraphData={setGraphData}
      />

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
            <div className="flex items-center justify-center h-screen w-full text-white">
              Loading skillmap...
            </div>
          )}

          {!loadingGraph && showSkillMap && <SkillMap graphData={graphData} />}
          {!loadingGraph && showGrowth && <Growth graphData={graphData} />}
        </div>

        <div className="h-full w-full relative">
          <ServicesBar RouterHandler={RouterHandler} setGraphData={setGraphData} />
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