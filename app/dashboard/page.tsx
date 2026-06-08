import Link from "next/link";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { HiClock, HiDocumentText, HiMagnifyingGlass, HiPlus } from "react-icons/hi2";

function scoreTone(score = 0) {
  if (score >= 85) return "text-emerald-300";
  if (score >= 65) return "text-sky-300";
  if (score >= 45) return "text-amber-300";
  return "text-rose-300";
}

function formatDate(date?: Date) {
  if (!date) {
    return "No analysis yet";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function Dashboard() {
  const user = await getCurrentUser();
  const latestAnalysis = user
    ? await prisma.analysis.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : null;

  const displayName = user?.name || user?.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-[#07090d] px-4 py-8 text-zinc-100 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
              ResumeLens Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Welcome, {displayName}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
              {latestAnalysis
                ? `Your latest analysis PDF was saved on ${formatDate(latestAnalysis.createdAt)}.`
                : "You have not analysed a resume yet. Run an analysis to generate and save your PDF."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/analyse"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              <HiPlus className="h-5 w-5" />
              New analysis
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
              View site
            </Link>
          </div>
        </header>

        {!latestAnalysis && (
          <section className="py-10">
            <div className="rounded-lg border border-white/10 bg-zinc-950 p-8 text-center">
              <HiDocumentText className="mx-auto h-10 w-10 text-zinc-500" />
              <h2 className="mt-4 text-xl font-semibold text-white">No analysis saved yet</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                Your generated PDF link and score will appear here after your first resume analysis.
              </p>
              <Link
                href="/analyse"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                Analyze
              </Link>
            </div>
          </section>
        )}

        {latestAnalysis && (
          <section className="grid gap-6 py-8 lg:grid-cols-[320px_1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-zinc-400">Latest score</p>
              <p className={`mt-4 text-5xl font-semibold tracking-tight ${scoreTone(latestAnalysis.score)}`}>
                {latestAnalysis.score}
              </p>
              <p className="mt-3 text-sm text-zinc-500">Generated from the latest resume analysis.</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Saved analysis PDF</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                    <HiClock className="h-4 w-4" />
                    {formatDate(latestAnalysis.createdAt)}
                  </p>
                </div>
                <HiDocumentText className="h-6 w-6 text-zinc-500" />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={latestAnalysis.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                >
                  Open PDF
                </a>
                <Link
                  href="/analyse"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
                >
                  Generate another
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
