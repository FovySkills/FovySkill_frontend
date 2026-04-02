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
          // 相同非 null 值 → 不動（省略重複 render）
          // null → null 仍更新 updatedAt，確保 TTL 從收到 null 開始計算
          if (state.graphData !== null && state.graphData === graphData) return state;
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