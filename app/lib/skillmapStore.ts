// app/lib/stores/skillmapStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SkillmapState = {
  graphData: string | null;
  updatedAt: number | null;
  setGraphData: (graphData: string | null) => void;
  clearGraph: () => void;
};

export const useSkillmapStore = create<SkillmapState>()(
  persist(
    (set) => ({
      graphData: null,
      updatedAt: null,

      setGraphData: (graphData) =>
        set((state) => {
          if (state.graphData === graphData) return state; // 不動 -> updatedAt 不會變
          return { graphData, updatedAt: Date.now() };
        }),

      clearGraph: () => set({ graphData: null, updatedAt: null }),
    }),
    {
      name: "skillmap-cache",
      storage: createJSONStorage(() => sessionStorage),
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