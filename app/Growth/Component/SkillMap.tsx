import ThreeDGraph from "./3DGraph";

export default function SkillMap({ graphData }: { graphData: string }) {


    if (!graphData) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <div className="relative w-[70%] rounded-[180px] px-12 py-16 text-center shadow-[0_0_40px_rgba(255,255,255,0.35)]">
                    <h1 className="text-white text-3xl font-medium mb-6">
                        嗨 Jack!
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed">
                        歡迎來到你的技能地圖，點按「＋」上傳你的專案，
                        <br />
                        開始探索技能與成長吧！
                    </p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="h-full w-full">
                <ThreeDGraph graphData={graphData}></ThreeDGraph>
            </div>
        );

    }
}
