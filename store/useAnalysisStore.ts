import { create } from "zustand";

interface AnalysisStore {
  result: any;
  setResult: (result: any) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  result: null,

  setResult: (result) =>
    set({
      result,
    }),
}));