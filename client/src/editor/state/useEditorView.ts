import { create } from "zustand";
type TView = "canvas" | "preview" | "database";
interface IEditorView {
  view: TView;
  setView: (by: TView) => void;
}
export const useEditorView = create<IEditorView>()((set) => ({
  view: "canvas",
  setView: (by) => set((state) => ({ view: by })),
}));
