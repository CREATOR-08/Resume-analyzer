"use client"

import { useState } from "react"
import bridge from "./bridge"
import { useRouter } from "next/navigation";

export default function AnalysePage() {
const router = useRouter();
const [resumeFile, setResumeFile] = useState<File | null>(null)
const [role, setRole] = useState("")
const [jobDescription, setJobDescription] = useState("")
const [jdFile, setJdFile] = useState<File | null>(null)
const [loading, setLoading] = useState(false)

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

    const result = await bridge(
      resumeFile,
      jdFile,
      role,
      jobDescription
    );
    console.log("Analysis Result:", result);

    const saveResponse = await fetch("/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report: result?.report,
        role,
        resumeFileName: resumeFile.name,
      }),
    });

    if (!saveResponse.ok) {
      const data = await saveResponse.json().catch(() => null);
      throw new Error(data?.error || "Failed to save analysis");
    }

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

    <h1 className="text-5xl font-bold text-white">
      Optimize Your Resume
    </h1>

    <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
      Upload your resume and job description to receive ATS scoring,
      keyword matching, skill gap analysis and actionable improvements.
    </p>
  </div>

  <div className="grid lg:grid-cols-2 gap-6">

    {/* Resume Upload */}

    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur p-6 hover:border-blue-500/40 transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
          📄
        </div>

        <div>
          <h3 className="text-white font-semibold">
            Upload Resume
          </h3>

          <p className="text-zinc-500 text-sm">
            PDF, DOC, DOCX
          </p>
        </div>
      </div>

      <label className="cursor-pointer block">
        <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 text-center hover:border-blue-500 transition">

          <p className="text-white font-medium">
            Drag & Drop Resume
          </p>

          <p className="text-zinc-500 text-sm mt-2">
            or click to browse
          </p>

          {resumeFile && (
            <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-green-400">
              ✓ {resumeFile.name}
            </div>
          )}
        </div>

        <input
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setResumeFile(e.target.files[0])
            }
          }}
        />
      </label>
    </div>

    {/* JD Upload */}

    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur p-6 hover:border-purple-500/40 transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
          🎯
        </div>

        <div>
          <h3 className="text-white font-semibold">
            Job Description
          </h3>

          <p className="text-zinc-500 text-sm">
            Upload or Paste JD
          </p>
        </div>
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={8}
        placeholder="Paste job description here..."
        className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="mt-4">
        <input
          type="file"
          hidden
          id="jd-upload"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setJdFile(e.target.files[0])
            }
          }}
        />

        <label
          htmlFor="jd-upload"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-800 px-4 py-3 text-white hover:bg-zinc-700 transition"
        >
          Upload JD File
        </label>

        {jdFile && (
          <p className="mt-3 text-green-400">
            ✓ {jdFile.name}
          </p>
        )}
      </div>
    </div>

  </div>

  {/* Role */}

  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur p-6">
    <label className="block text-white font-semibold mb-3">
      Target Role
    </label>

    <input
      type="text"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      placeholder="AI Engineer"
      className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Analyze Button */}

  <div className="flex justify-center pt-4">
  <button
    type="submit"
    disabled={loading}
    className="min-w-[250px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-500 hover:scale-101 hover:shadow-purple-500/40 disabled:opacity-50"
    
  >
    {loading ? "Analyzing..." : "Analyze Resume"}
  </button>
</div>

</form>
  )
}
