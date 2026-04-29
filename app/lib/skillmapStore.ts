// app/lib/stores/skillmapStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toSkillGraphDataString } from "./skillGraph";

export type SkillNode = { id: string; name: string; level: number; score: number };

export type SkillmapState = {
  graphData: string | null;
  updatedAt: number | null;
  selectedNodes: SkillNode[];
  setGraphData: (graphData: string | null) => void;
  clearGraph: () => void;
  toggleNodeSelection: (node: SkillNode) => void;
  clearSelection: () => void;
};

export const useSkillmapStore = create<SkillmapState>()(
  persist(
    (set) => ({
      graphData: null,
      updatedAt: null,
      selectedNodes: [],

      setGraphData: (graphData) =>
        set((state) => {
          const nextGraphData = toSkillGraphDataString(graphData);

          // 相同非 null 值 → 不動（省略重複 render）
          // null → null 仍更新 updatedAt，確保 TTL 從收到 null 開始計算
          if (state.graphData !== null && state.graphData === nextGraphData) return state;

          return {
            graphData: nextGraphData,
            updatedAt: Date.now(),
            selectedNodes: nextGraphData ? state.selectedNodes : [],
          };
        }),

      clearGraph: () => set({ graphData: null, updatedAt: null, selectedNodes: [] }),
      
      toggleNodeSelection: (node) => 
        set((state) => {
          const isSelected = state.selectedNodes.some(n => n.id === node.id);
          if (isSelected) {
            // Remove node
            return { selectedNodes: state.selectedNodes.filter(n => n.id !== node.id) };
          } else {
            // Add node (FIFO: if max 3 reached, pop oldest, append new)
            const newSelection = [...state.selectedNodes, node];
            if (newSelection.length > 3) {
              newSelection.shift();
            }
            return { selectedNodes: newSelection };
          }
        }),
        
      clearSelection: () => set({ selectedNodes: [] }),
    }),
    {
      name: "skillmap-cache",
      storage: createJSONStorage(() => sessionStorage),
      merge: (persisted, current) => {
        const p = persisted as Partial<SkillmapState>;
        const graphData = toSkillGraphDataString(p.graphData);

        return {
          ...current,
          graphData,
          updatedAt: graphData ? p.updatedAt ?? current.updatedAt : null,
          selectedNodes: graphData ? p.selectedNodes ?? current.selectedNodes : [],
        };
      },
    }
  )
);
