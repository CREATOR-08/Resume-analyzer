"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bridge from "./bridge";

export default function AnalyseForm() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    if (!role.trim()) {
      alert("Please enter target role");
      return;
    }

    try {
      setLoading(true);

      const result = await bridge(resumeFile, jdFile, role, jobDescription);

      await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          report: result.report,
          role,
          resumeFileName: resumeFile.name,
        }),
      }).then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || "Failed to save analysis");
        }
      });

      router.push("/summary");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          AI Powered Resume Analysis
        </div>

        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Optimize Your Resume
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Upload your resume and job description to receive ATS scoring, keyword
          matching, skill gap analysis, and actionable improvements.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur transition hover:border-blue-500/40">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-200">
              CV
            </div>

            <div>
              <h3 className="font-semibold text-white">Upload Resume</h3>
              <p className="text-sm text-zinc-500">PDF, DOC, DOCX</p>
            </div>
          </div>

          <label className="block cursor-pointer">
            <div className="rounded-lg border-2 border-dashed border-zinc-700 p-10 text-center transition hover:border-blue-500">
              <p className="font-medium text-white">Drag and drop resume</p>
              <p className="mt-2 text-sm text-zinc-500">or click to browse</p>

              {resumeFile && (
                <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-green-400">
                  Selected: {resumeFile.name}
                </div>
              )}
            </div>

            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setResumeFile(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>

        <div className="group rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur transition hover:border-purple-500/40">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-semibold text-purple-200">
              JD
            </div>

            <div>
              <h3 className="font-semibold text-white">Job Description</h3>
              <p className="text-sm text-zinc-500">Upload or paste JD</p>
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            placeholder="Paste job description here..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="mt-4">
            <input
              type="file"
              hidden
              id="jd-upload"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setJdFile(e.target.files[0]);
                }
              }}
            />

            <label
              htmlFor="jd-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-zinc-800 px-4 py-3 text-white transition hover:bg-zinc-700"
            >
              Upload JD File
            </label>

            {jdFile && <p className="mt-3 text-green-400">Selected: {jdFile.name}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
        <label className="mb-3 block font-semibold text-white">Target Role</label>

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="AI Engineer"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="min-w-[250px] rounded-lg bg-white px-8 py-4 text-lg font-semibold text-zinc-950 shadow-lg transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </form>
  );
}
