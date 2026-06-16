import React from 'react'

const Sec3 = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">resume-lens</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">A straightforward tool to help you improve resume clarity, formatting, and structure.</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <div className="space-y-2 text-sm text-center md:text-left">
              <a href="mailto:himanshubhagat080104@gmail.com" className="block hover:text-white transition">
                himanshubhagat080104@gmail.com
              </a>
              <a href="https://github.com/CREATOR-08" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">
                github.com/CREATOR-08
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-white mb-2">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/dashboard" className="block hover:text-white transition">Dashboard</a>
              <a href="/analyse" className="block hover:text-white transition">Analyse</a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-2 md:pt-4 text-center text-xs text-zinc-500">
        <p>© 2025 resume-lens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Sec3
