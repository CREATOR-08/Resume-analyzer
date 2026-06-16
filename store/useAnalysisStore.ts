import { create } from "zustand";

interface AnalysisStore {
  result: any;
  setResult: (result: any) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  result: null,

  setResult: (result) =>
    set({
      result,
    }),

  // store the resume file that the user uploaded during basic analysis
  resumeFile: null,
  setResumeFile: (file) => set({ resumeFile: file }),
}));