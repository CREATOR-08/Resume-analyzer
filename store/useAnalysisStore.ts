import { create } from "zustand";

interface AnalysisStore {
  result: any;
  setResult: (result: any) => void;
  premiumResult: any;
  setPremiumResult: (result: any) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  selectedJob: any;
  setSelectedJob: (job: any) => void;
  isLoadingPdf: boolean;
  setIsLoadingPdf: (loading: boolean) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  result: null,

  setResult: (result) =>
    set({
      result,
    }),

  premiumResult: null,
  setPremiumResult: (result) =>
    set({
      premiumResult: result,
    }),

  resumeFile: null,
  setResumeFile: (file) => set({ resumeFile: file }),

  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),

  isLoadingPdf: false,
  setIsLoadingPdf: (loading) => set({ isLoadingPdf: loading }),
}));