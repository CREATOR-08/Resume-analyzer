"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-10 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 items-center">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-zinc-800 bg-zinc-900/95 p-10 shadow-2xl">
            <h1 className="text-4xl font-bold mb-6">Welcome back</h1>
            <p className="text-zinc-400 mb-8">
              Sign in to view your analysis, resume score, and guided next steps.
            </p>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="mt-2 w-full rounded-3xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-3xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20"
              />
            </label>
            <button
              type="button"
              className="mt-8 w-full rounded-3xl bg-white px-5 py-4 text-lg font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Sign In
            </button>
            <div className="mt-6 text-center text-zinc-400">
              <p>Don&apos;t have an account?</p>
              <Link href="/signup" className="mt-2 inline-block text-white font-semibold hover:text-zinc-200">
                Create one now
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="/img1.png"
              alt="Login illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
