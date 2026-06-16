"use client";

import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import ResumeLoading from "@/components/ResumeLoading";

function scoreTone(score = 0) {
  if (score >= 85) return "text-emerald-300";
  if (score >= 65) return "text-sky-300";
  if (score >= 45) return "text-amber-300";
  return "text-rose-300";
}

function SectionCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20 ${className}`}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function IssueItem({ original, issue, suggestion }: any) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 mb-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.12em] text-rose-300 mb-1">Original</p>
        <p className="text-sm text-slate-300 italic">"{original}"</p>
      </div>
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.12em] text-amber-300 mb-1">Issue</p>
        <p className="text-sm text-slate-300">{issue}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-emerald-300 mb-1">Suggestion</p>
        <p className="text-sm text-slate-300">{suggestion}</p>
      </div>
    </div>
  );
}

export default function PremiumSummary() {
  const premiumResult = useAnalysisStore((state) => state.premiumResult);
  const selectedJob = useAnalysisStore((state) => state.selectedJob);
  const setIsLoadingPdf = useAnalysisStore((state) => state.setIsLoadingPdf);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const data = premiumResult?.report ?? {};
  const companyName = useMemo(() => selectedJob?.company_name ?? "Premium Analysis", [selectedJob]);
  const summary = data.summary ?? {};
  const grammarIssues = data.grammar ?? [];
  const weakVerbs = data.weak_verbs ?? [];
  const suggestions = data.suggestions ?? [];
  const lacking = data.lacking ?? [];

  useEffect(() => {
    if (premiumResult && !isPdfGenerating) {
      generateAndSendPdf();
    }
  }, [premiumResult]);

  const generateAndSendPdf = async () => {
    setIsPdfGenerating(true);
    setIsLoadingPdf(true);
    try {
      const pdfResponse = await fetch("/api/analysis/premium-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          report: data,
          companyName,
          role: selectedJob?.role || "Target Role",
          selectedJob,
        }),
      });

      if (!pdfResponse.ok) {
        console.error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsPdfGenerating(false);
      setIsLoadingPdf(false);
    }
  };

  if (!premiumResult) {
    return (
      <main className="min-h-screen bg-[#040407] text-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">No premium analysis loaded</p>
          <h1 className="mt-6 text-4xl font-semibold text-white">Premium analysis not yet available</h1>
          <p className="mt-4 text-slate-400">Start a premium analysis to generate your detailed report.</p>
          <Link href="/premium" className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Start premium analysis
          </Link>
        </div>
      </main>
    );
  }

  if (isPdfGenerating) {
    return <ResumeLoading />;
  }

  return (
    <main className="min-h-screen bg-[#040407] text-slate-100">
      <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Premium Resume Analysis</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">{companyName}</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{selectedJob?.role || "Target Role"}</p>
          </div>
          <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-cyan-300">Grammar Issues</p>
              <p className="font-bold text-xl text-cyan-300">{summary.grammar_count ?? 0}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs uppercase tracking-[0.12em] text-amber-300">Weak Verbs</p>
              <p className="font-bold text-xl text-amber-300">{summary.weak_verbs_count ?? 0}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 py-6 lg:grid-cols-2">
          <SectionCard title="Grammar Issues Overview">
            <div className="space-y-2 text-sm text-slate-300">
              <p>Total Grammar Issues: <span className="font-bold text-cyan-300">{summary.grammar_count ?? 0}</span></p>
              <p>Weak Verbs Found: <span className="font-bold text-amber-300">{summary.weak_verbs_count ?? 0}</span></p>
              <p>Suggestions: <span className="font-bold text-emerald-300">{summary.suggestion_count ?? 0}</span></p>
              <p>Items Lacking Details: <span className="font-bold text-rose-300">{summary.lacking_count ?? 0}</span></p>
            </div>
          </SectionCard>

          <SectionCard title="Quick Stats">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Issues to Address:</span>
                <span className="font-bold text-cyan-300">{grammarIssues.length + weakVerbs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Suggestions:</span>
                <span className="font-bold text-emerald-300">{suggestions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Missing Elements:</span>
                <span className="font-bold text-rose-300">{lacking.length}</span>
              </div>
            </div>
          </SectionCard>
        </section>

        {grammarIssues.length > 0 && (
          <section className="mt-5 rounded-lg border border-slate-800 bg-slate-900/80 p-5 mx-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300 mb-4">Grammar & Writing Issues ({grammarIssues.length})</h2>
            <div className="space-y-4">
              {grammarIssues.map((item: any, idx: number) => (
                <IssueItem key={idx} original={item.original} issue={item.issue} suggestion={item.suggestion} />
              ))}
            </div>
          </section>
        )}

        {weakVerbs.length > 0 && (
          <section className="mt-5 rounded-lg border border-slate-800 bg-slate-900/80 p-5 mx-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 mb-4">Weak Verb Usage ({weakVerbs.length})</h2>
            <div className="space-y-4">
              {weakVerbs.map((item: any, idx: number) => (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-amber-300 mb-2">Weak Word: "{item.weak_word}"</p>
                  <p className="text-sm text-slate-300 mb-3">In: "{item.original}"</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-emerald-300 mb-1">Suggestion</p>
                  <p className="text-sm text-slate-300 font-semibold">{item.suggestion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {suggestions.length > 0 && (
          <section className="mt-5 rounded-lg border border-slate-800 bg-slate-900/80 p-5 mx-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300 mb-4">Recommendations ({suggestions.length})</h2>
            <div className="space-y-4">
              {suggestions.map((item: any, idx: number) => (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-semibold text-white mb-2">{item.issue}</p>
                  <p className="text-sm text-slate-300">💡 {item.suggestion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {lacking.length > 0 && (
          <section className="mt-5 rounded-lg border border-slate-800 bg-slate-900/80 p-5 mx-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300 mb-4">Missing Elements ({lacking.length})</h2>
            <div className="space-y-4">
              {lacking.map((item: any, idx: number) => (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-sm font-semibold text-white mb-2">{item.issue}</p>
                  <p className="text-sm text-slate-300">✓ {item.suggestion}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 py-6 flex gap-4 mx-2">
          <Link href="/summary" className="inline-flex rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            View Basic Analysis
          </Link>
          <Link href="/premium" className="inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Run Another Analysis
          </Link>
        </section>
      </div>
    </main>
  );
}
