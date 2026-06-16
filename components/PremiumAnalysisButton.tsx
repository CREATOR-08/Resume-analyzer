"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import premiumbridge from "@/lib/premiumbridge";
import { useAnalysisStore } from "@/store/useAnalysisStore";

type PremiumAnalysisButtonProps = {
  endpointUrl?: string;
  onResponse?: (response: unknown) => void;
  fromSummary?: boolean;
};

export default function PremiumAnalysisButton({
  endpointUrl,
  onResponse,
  fromSummary = false,
}: PremiumAnalysisButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const resumeFile = useAnalysisStore((s) => s.resumeFile);
  const result = useAnalysisStore((s) => s.result);
  const setPremiumResult = useAnalysisStore((s) => s.setPremiumResult);
  const role = (result as any)?.role ?? "";

  const handleClick = async () => {
    setError(null);

    if (!resumeFile) {
      setError("No resume file available. Run basic analysis first or upload a resume.");
      return;
    }

    setLoading(true);

    try {
      const payload = await premiumbridge(resumeFile, "", role, "");

      if (fromSummary) {
        setPremiumResult(payload);
        router.push("/summary/premium");
      } else if (onResponse) {
        onResponse(payload);
      }

      console.log("Premium response:", payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch premium response.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Checking premium..." : "Run Premium Analysis"}
      </button>
      {error ? (
        <p className="text-sm text-rose-300">{error}</p>
      ) : null}
    </div>
  );
}
