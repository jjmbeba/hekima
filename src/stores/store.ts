// src/stores/counter-store.ts
import { Tables } from "@/database.types";
import { create } from "zustand";

export type ViewState = {
  view: string;
};

export type ViewActions = {
  changeView: (view: string) => void;
};

export type ViewStore = ViewState & ViewActions;

export type EventStore = {
  selectedEventID: number | null;
  setSelectedEventID: (eventID: number) => void;
};

const useViewStore = create<ViewStore>()((set) => ({
  view: "Cards",
  changeView: (view) =>
    set((state) => ({
      view,
    })),
}));

const useEventStore = create<EventStore>()((set) => ({
  selectedEventID: null,
  setSelectedEventID: (eventID) =>
    set((state) => ({
      selectedEventID: eventID,
    })),
}));

export { useViewStore, useEventStore };
