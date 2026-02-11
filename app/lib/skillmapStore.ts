// lib/stores/skillmapStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SkillmapState = {
  graphData: string | null;
  updatedAt: number | null;
  setGraphData: (graphData: string) => void;
  clearGraph: () => void;
};

export const useSkillmapStore = create<SkillmapState>()(
  persist(
    (set) => ({
      graphData: null,
      updatedAt: null,
      setGraphData: (graphData) =>
        set({ graphData, updatedAt: Date.now() }),

      clearGraph: () =>
        set({ graphData: null, updatedAt: null }), 
    }),
    {
      name: "skillmap-cache",
      storage: createJSONStorage(() => sessionStorage),

      // 確保 hydration 正常
      merge: (persisted, current) => {
        const p = persisted as Partial<SkillmapState>;
        return {
          ...current,
          graphData: p.graphData ?? current.graphData,
          updatedAt: p.updatedAt ?? current.updatedAt,
        };
      },
    }
  )
);
