"use client";

import Link from "next/link";
import React, { useMemo } from "react";

import { useAnalysisStore } from "@/store/useAnalysisStore";

function scoreTone(score = 0) {
  if (score >= 85) return "text-emerald-300";
  if (score >= 65) return "text-sky-300";
  if (score >= 45) return "text-amber-300";
  return "text-rose-300";
}

function matchBadge(match: "strong" | "partial" | "missing") {
  const styles = {
    strong: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
    partial: "bg-amber-500/15 text-amber-200 ring-amber-400/25",
    missing: "bg-rose-500/15 text-rose-200 ring-rose-400/25",
  };

  return styles[match] || "bg-slate-700/60 text-slate-200 ring-slate-500/30";
}

function normalizeEntries(source = {}) {
  return Object.entries(source).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Number(value) || 0,
  }));
}

function DonutScore({ score }:{ score: number }) {
  const radius = 58;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  return (
    <div className="relative flex aspect-square min-h-44 w-full max-w-56 items-center justify-center">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          strokeWidth={stroke}
          className="fill-none stroke-slate-800"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="fill-none stroke-cyan-300 drop-shadow-[0_0_16px_rgba(103,232,249,0.35)]"
        />
      </svg>
      <div className="absolute text-center">
        <div className={`text-4xl font-semibold ${scoreTone(score)}`}>{score.toFixed(1)}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Overall</div>
      </div>
    </div>
  );
}

function BarChart({ title, data, suffix = "%" }:{title:string;data:{ name: string; value: number }[];suffix?: string;}) {
  const maxValue = Math.max(100, ...data.map((item) => item.value));

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{title}</h2>
      <div className="mt-5 space-y-4">
        {data.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-slate-200">{item.name}</span>
              <span className={scoreTone(item.value)}>
                {item.value}
                {suffix}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300"
                style={{ width: `${Math.min((item.value / maxValue) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ResumeMatchSummary() {
  const result = useAnalysisStore((state) => state.result);
  const data = result ?? {};
  const categoryData = useMemo(() => normalizeEntries(data.category_scores), [data.category_scores]);
  const weightData = useMemo(() => normalizeEntries(data.effective_weights), [data.effective_weights]);
  const requiredSkills = (data.skills ?? []).filter((item) => item.requirement === "required");
  const preferredSkills = (data.skills ?? []).filter((item) => item.requirement === "preferred");

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">No analysis loaded</p>
          <h1 className="mt-6 text-4xl font-semibold text-white">Resume analysis not yet available</h1>
          <p className="mt-4 text-slate-400">
            Start an analysis to generate your report and save the PDF to Supabase.
          </p>
          <Link
            href="/analyse"
            className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Start analysis
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">AI resume assessment</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">Candidate Match Summary</h1>
            <p className="mt-4 text-base leading-7 text-slate-300">{data.role_summary}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            <div>
              Provider: <span className="font-medium text-white">{data.provider}</span>
            </div>
            <div className="mt-1">
              Model: <span className="font-medium text-white">{data.model}</span>
            </div>
          </div>
        </header>

        <section className="grid gap-5 py-6 lg:grid-cols-[320px_1fr_1fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Match Score</h2>
            <div className="mt-5 flex justify-center">
              <DonutScore score={Number(data.overall_score) || 0} />
            </div>
          </div>
          <BarChart title="Category Scores" data={categoryData} />
          <BarChart title="Effective Weights" data={weightData} />
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Strengths</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {data.strengths?.map((item) => (
                <li key={item} className="border-l-2 border-emerald-300/60 pl-3">{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">Concerns</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {data.concerns?.map((item) => (
                <li key={item} className="border-l-2 border-rose-300/60 pl-3">{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Final Summary</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">{data.final_summary}</p>
          </div>
        </section>

        <section className="mt-5 rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Skill Evidence</h2>
              <p className="mt-2 text-sm text-slate-400">Required and preferred skills scored from resume evidence.</p>
            </div>
            <div className="text-sm text-slate-400">
              Required: <span className="text-white">{requiredSkills.length}</span> | Preferred:{" "}
              <span className="text-white">{preferredSkills.length}</span>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="py-3 pr-4 font-medium">Skill</th>
                  <th className="py-3 pr-4 font-medium">Need</th>
                  <th className="py-3 pr-4 font-medium">Match</th>
                  <th className="py-3 pr-4 font-medium">Score</th>
                  <th className="py-3 pr-4 font-medium">Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.skills?.map((item) => (
                  <tr key={item.skill} className="align-top">
                    <td className="py-4 pr-4 font-medium text-white">{item.skill}</td>
                    <td className="py-4 pr-4 capitalize text-slate-300">{item.requirement}</td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ring-1 ${matchBadge(item.match)}`}>
                        {item.match}
                      </span>
                    </td>
                    <td className={`py-4 pr-4 font-semibold ${scoreTone(item.score)}`}>{item.score}%</td>
                    <td className="max-w-xl py-4 pr-4 leading-6 text-slate-300">{item.gap || "No major gap found."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Recommendations</h2>
            <div className="mt-4 space-y-4">
              {data.recommendations?.map((item) => (
                <article key={`${item.priority}-${item.area}`} className="rounded-md border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-base font-semibold text-white">{item.area}</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.12em] text-slate-300">
                      {item.priority}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.action}</p>
                  {item.suggested_project && (
                    <p className="mt-3 text-sm text-cyan-200">Suggested project: {item.suggested_project}</p>
                  )}
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Quick View</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Experience</dt>
                <dd className={scoreTone(data.experience?.score)}>{data.experience?.score || 0}%</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Projects</dt>
                <dd className={scoreTone(data.projects?.score)}>{data.projects?.score || 0}%</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Education</dt>
                <dd className={scoreTone(data.education?.score)}>{data.education?.score || 0}%</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-500">{data.disclaimer}</p>
          </aside>
        </section>
      </div>
    </main>
  );
}



