"use client";

import React, { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DropdownButton from './Component/DropDownButton';
import OptionBar from './Component/OptionBar';
import ServicesBar from './Component/ServicesBar';
import Sidebar from './Component/SideMenu';
import DetailCard from './Component/DetailCard';
import SkillMap from './Component/SkillMap';


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

    const [showSkillMap, setShowSkillMap] = useState<boolean>(true)
    const [showGrowth, setShowGrowth] = useState<boolean>(false)
    const [showCompare, setCompare] = useState<boolean>(false)
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
        setCompare(false)
    }
    function showGrowthController() {
        setShowSkillMap(false)
        setShowGrowth(true)
        setCompare(false)
    }
    function showCompareController() {
        setShowSkillMap(false)
        setShowGrowth(false)
        setCompare(true)
    }
    return (
        <>
            {!showSidebar && <SidebarButton showSidebar={showSidebar} setShowSidebar={setShowSidebar}></SidebarButton>}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}></Sidebar>
            <div className=' h-screen w-full grid-rows-[1fr_8fr_1fr] grid'>
                <div className='flex justify-between w-full' >
                    <OptionBar showSkillMap={showSkillMap} showGrowth={showGrowth} showCompare={showCompare} onSkillMap={showSkillMapController} onGrowth={showGrowthController} onCompare={showCompareController}></OptionBar>
                </div>
                <div className="">
                    {showSkillMap && <SkillMap graphData={graphData}/>}
                    {showGrowth && <DetailCard title="" score={110} metrics={[{ label: "aa", value: 11 }]} />}
                    {showCompare && <></>}
                </div>
                <div className="h-full w-full">
                    <ServicesBar></ServicesBar>
                </div>
            </div>
        </>
    );
}

function SidebarButton({ showSidebar, setShowSidebar }: { showSidebar: boolean, setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (

        <button
            onClick={() => setShowSidebar(true)}
            aria-label="Open sidebar"
            className="
        fixed right-0 top-1/2 -translate-y-1/2
        w-10 h-16
        rounded-l-full
        bg-white/10 backdrop-blur
        border border-white/30 border-r-0
        text-white text-xl
        flex items-center justify-center
        shadow-[-6px_0_16px_rgba(0,0,0,0.8)]
        transition-all duration-200
        hover:bg-white/20 hover:scale-105
        active:scale-95
        z-40
        "
        >
            {showSidebar ? ">" : "<"}
        </button>
    )
}