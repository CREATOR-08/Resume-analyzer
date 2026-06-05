
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [created, setCreated] = useState(false)

  const handleOAuth = (provider: 'google' | 'github') => {
    // Redirect to better-auth authorize endpoint handled by server
    window.location.href = `/api/auth/authorize/${provider}`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || 'Signup failed')
        setLoading(false)
        return
      }

      setSuccess('Account created — redirecting to homepage...')
      setCreated(true)
      setLoading(false)
      setTimeout(() => router.push('/'), 900)
    } catch (err) {
      console.error(err)
      setError('Unexpected error — check console')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto w-16 h-16" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-zinc-400">Sign up to analyze resumes and save your results.</p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg ring-1 ring-white/6">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-800 hover:bg-zinc-800/90 text-white font-medium"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.5 20H24v8.5h11.9C34.3 33.3 30 37 24 37c-8 0-14.5-6.5-14.5-14.5S16 8 24 8c3.9 0 7.3 1.4 10 3.7l6.5-6.5C37 2.4 30.9 0 24 0 10.8 0 0 10.8 0 24S10.8 48 24 48c13.2 0 24-10.8 24-24 0-1.6-.1-3.1-.5-4.5z" fill="#fff"/>
              </svg>
              Sign up with Google
            </button>

            <button
              type="button"
              onClick={() => handleOAuth('github')}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-zinc-800 bg-transparent hover:bg-zinc-900 text-white font-medium"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.8 1.6.8.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2A11.8 11.8 0 0 1 12 6.8c1 .0 2.1.1 3.1.3 2.4-1.6 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.8 1.2 3.1 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2v3c0 .3.2.6.8.5C20.7 21.4 24 17.1 24 12 24 5.6 18.9.5 12 .5z"/>
              </svg>
              Sign up with GitHub
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white">
                Full name
              </label>
              <input id="name" name="name" type="text" required className="mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white">
                Email address
              </label>
              <input id="email" name="email" type="email" required className="mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white">
                Password
              </label>
              <input id="password" name="password" type="password" required minLength={6} className="mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Create a password" />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-green-400">{success}</p>}

            <div>
              <button disabled={loading} type="submit" className="w-full inline-flex justify-center items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-500">
            By creating an account, you agree to our <a className="text-blue-400 hover:underline" href="#">Terms</a> and <a className="text-blue-400 hover:underline" href="#">Privacy Policy</a>.
          </p>
        </div>

        {!created && (
          <p className="text-center text-sm text-zinc-400">
            Already have an account? <a href="/login" className="text-white font-medium hover:underline">Sign in</a>
          </p>
        )}
      </div>
    </div>
  )
}