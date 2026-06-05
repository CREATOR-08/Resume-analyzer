"use client"
import Link from 'next/link'

const Left = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 p-8 md:p-10 shadow-2xl border border-zinc-800">
        <p className="text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-4 font-medium">Resume Analysis</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">Login to unlock your resume analysis</h2>
        <div className="space-y-3 text-left mb-8">
          <div className="rounded-2xl border border-zinc-700 bg-slate-900/50 p-4 md:p-5 hover:bg-slate-800/50 transition-colors">
            <p className="text-base md:text-lg font-semibold text-white">✓ Get your resume scored based on role</p>
          </div>
          <div className="rounded-2xl border border-zinc-700 bg-slate-900/50 p-4 md:p-5 hover:bg-slate-800/50 transition-colors">
            <p className="text-base md:text-lg font-semibold text-white">✓ Get your resume scored based on JD</p>
          </div>
          <div className="rounded-2xl border border-zinc-700 bg-slate-900/50 p-4 md:p-5 hover:bg-slate-800/50 transition-colors">
            <p className="text-base md:text-lg font-semibold text-white">✓ Get future tasks vision</p>
          </div>
          
        </div>
        <p className="mb-8 text-zinc-400 text-sm md:text-base leading-relaxed">Sign in to see your personalized resume score, JD match, and next-step suggestions.</p>
        <Link
          href="/login"
          className="block text-center rounded-xl bg-white px-7 py-3 md:py-4 text-base md:text-lg font-semibold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all duration-200 font-sans"
        >
          Log in to get started
        </Link>
      </div>
    </div>
  )
}

export default Left
