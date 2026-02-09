"use client";

import React, { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OptionBar from './Component/OptionBar';
import ServicesBar from './Component/ServicesBar';
import Sidebar from './Component/Sidebar';
import SkillMap from './Component/SkillMap';
import Growth from './Component/Growth';

//-----------------------------mock data-------------------------------------------
const defaultData = {
        nodes: [
            { id: "me", name: "Me", level: 0, score: 5 }, // 中心節點
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
            { source: "me", target: "1" }, // 中心節點連接到根節點
            { source: "me", target: "2" }, // 中心節點連接到根節點
            { source: "me", target: "3" }, // 中心節點連接到根節點
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
    const router = useRouter()

    function RouterHandler() {
    // 检查浏览器 cookie
    const hasToken = document.cookie.includes("token=");
    router.push("/Dashboard")
    // if (!hasToken) {
    //   router.push("/login"); // 没 cookie 就跳去 login
    // } else {
    //   router.push("/dashboard"); // 有 cookie 去 dashboard
    // }
  }

    const [showSkillMap, setShowSkillMap] = useState<boolean>(true)
    const [showGrowth, setShowGrowth] = useState<boolean>(false)
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    //----------------------------------------------------graph data --------------------------------------------
    const [graphData, setGraphData] = useState<string>(JSON.stringify(defaultData));

    async function loadGraph() {
        const res = await fetch("/api/getGraph", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: "123",
            }),
        });

        if (!res.ok) {
            throw new Error("Request failed");
        }

        const data = await res.json();

        setGraphData(data.graphData);
    }

    useEffect(() => {
        // loadGraph();
    }, []);

    //--------------------------------------------component controller----------------------------------------------

    function showSkillMapController() {
        setShowSkillMap(true)
        setShowGrowth(false)
    }
    function showGrowthController() {
        setShowSkillMap(false)
        setShowGrowth(true)
    }

    return (
        <>
            {!showSidebar && <SidebarButton showSidebar={showSidebar} setShowSidebar={setShowSidebar}></SidebarButton>}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}></Sidebar>
            <div className=' h-screen w-full grid-rows-[1fr_8fr_1fr] grid'>
                <div className='flex justify-between w-full' >
                    <OptionBar showSkillMap={showSkillMap} showGrowth={showGrowth} onSkillMap={showSkillMapController} onGrowth={showGrowthController}></OptionBar>
                </div>
                <div className="">
                    {showSkillMap && <SkillMap graphData={graphData}/>}
                    {showGrowth && <Growth graphData={graphData}/>}
                </div>
                <div className="h-full w-full">
                    <ServicesBar RouterHandler={RouterHandler}></ServicesBar>
                </div>
            </div>
        </>
    );
}

function SidebarButton({ showSidebar, setShowSidebar } : { showSidebar: boolean, setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <button onClick={() => setShowSidebar(true)} aria-label="Open sidebar" className="fixed right-0 top-1/2 -translate-y-1/2 w-10 h-16 rounded-l-full bg-white/10 backdrop-blur
        border border-white/30 border-r-0 text-white text-xl flex items-center justify-center shadow-[-6px_0_16px_rgba(0,0,0,0.8)]
        transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 z-40">
            {showSidebar ? ">" : "<"}
        </button>
    )
}