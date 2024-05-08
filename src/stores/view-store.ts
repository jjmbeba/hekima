// src/stores/counter-store.ts
import { create } from "zustand";

export type ViewState = {
  view: string;
};

export type ViewActions = {
  changeView: (view: string) => void;
};

export type ViewStore = ViewState & ViewActions;

const useViewStore = create<ViewStore>()((set) => ({
  view: "cards",
  changeView: (view) =>
    set((state) => ({
      view,
    })),
}));

export default useViewStore;