"use client";
import { useAnalysisStore } from "@/store/useAnalysisStore";

const bridge = async (
  resume: File,
  jd: File | null,
  role: string,
  jobDescription: string,

) => {

  const formData = new FormData();

  formData.append("resume", resume);

  if (jd) {
    formData.append("jd", jd);
  }

  formData.append("role", role);
  formData.append("jobDescription", jobDescription);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AI_SERVICES}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  const result = await response.json();

  useAnalysisStore.getState().setResult(result.report);
  console.log("Analysis Result:", result.status);

  return result;

};

export default bridge;
