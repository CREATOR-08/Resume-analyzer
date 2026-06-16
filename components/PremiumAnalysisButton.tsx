"use client";

import { useState } from "react";

type PremiumAnalysisButtonProps = {
  endpointUrl?: string;
  onResponse?: (response: unknown) => void;
};

export default function PremiumAnalysisButton({
  endpointUrl,
  onResponse,
}: PremiumAnalysisButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoint = endpointUrl || process.env.NEXT_PUBLIC_AI_SERVICES_PREMIUM;

  const handleClick = async () => {
    setError(null);

    if (!endpoint) {
      setError("Premium endpoint is not configured.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Premium request failed (${response.status})`);
      }

      const payload = await response.json();

      if (onResponse) {
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
