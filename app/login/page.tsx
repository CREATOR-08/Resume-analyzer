"use client"

import { useAuthStore } from '@/store/logged';
import Link from 'next/link'
import ResumeLoading from '@/components/ResumeLoading';

import { useRouter } from "next/navigation";
import { useState } from 'react'



export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setLogged = useAuthStore((state) => state.setLogged);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/sign-in/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'OAuth login failed')
        return
      }

      if (data.url) {
        window.location.href = data.url
        return
      }

      setError('Unexpected OAuth response')
    } catch (err) {
      console.error(err)
      setError('Unexpected error during OAuth login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        email,
        password,
      };

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Login failed");
        setLoading(false);
        return;
      }

      setLoading(false);
      setLogged(true);
      setUser(data.user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoading(false);
    }
  };

  if (loading) {
    return <ResumeLoading hideStatusBar />
  }

  return (
    <main className="min-h-screen bg-[#040407] text-white px-4 py-10 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 items-center">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-zinc-800 bg-zinc-900/95 p-10 shadow-2xl">
            <h1 className="text-4xl font-bold mb-6">Welcome back</h1>
            <p className="text-zinc-400 mb-8">
              Sign in to view your analysis, resume score, and guided next steps.
            </p>
            <div className="space-y-3 mb-8">
              <button
                type="button"
                className="w-full rounded-3xl border border-zinc-700 bg-zinc-950/90 px-5 py-3 text-left text-white transition hover:border-white"
                onClick={() => handleOAuth('google')}
                disabled={loading}
              >
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full rounded-3xl border border-zinc-700 bg-zinc-950/90 px-5 py-3 text-left text-white transition hover:border-white"
                onClick={() => handleOAuth('github')}
                disabled={loading}
              >
                Continue with GitHub
              </button>
              <div className="flex items-center gap-3 text-zinc-500">
                <span className="h-px flex-1 bg-zinc-700"></span>
                <span>or</span>
                <span className="h-px flex-1 bg-zinc-700"></span>
              </div>
            </div>
            {error ? (
              <div className="mb-6 rounded-3xl border border-red-600/40 bg-red-600/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your email"
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
              className="mt-8 w-full rounded-3xl bg-white px-5 py-4 text-lg font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleLogin}
              disabled={!email || !password || loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
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
              src="/login/loginimg.png"
              alt="Login illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
