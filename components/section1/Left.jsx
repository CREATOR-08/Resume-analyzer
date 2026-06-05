"use client"
import Link from 'next/link'

const Left = () => {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem]  bg-gray-950 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-4">Resume Analysis</p>
        <h2 className="text-4xl font-bold text-white leading-tight mb-6">Login to unlock your resume analysis</h2>
        <div className="space-y-4 text-left">
          <div className="rounded-3xl border border-zinc-800 bg-slate-900 p-5">
            <p className="text-lg font-semibold text-white">Get your resume scored based on role</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-slate-900 p-5">
            <p className="text-lg font-semibold text-white">Get your resume scored based on JD</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-slate-900 p-5">
            <p className="text-lg font-semibold text-white">Get future tasks vision</p>
          </div>
          
        </div>
        <p className="mt-6 text-zinc-400">Sign in to see your personalized resume score, JD match, and next-step suggestions.</p>
        <Link
          href="/login"
          className="mt-8 inline-flex w-full max-w-sm items-center justify-center rounded-2xl bg-white px-7 py-4 text-lg font-semibold text-zinc-950 shadow-lg transition hover:bg-zinc-200"
        >
          Log in to get started
        </Link>
      </div>
    </div>
  )
}

export default Left
