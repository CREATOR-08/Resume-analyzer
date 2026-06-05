import React from 'react'
// credits section
const Sec3 = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 mt-10">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Resume Analyzer</h3>
            <p className="mt-1 text-sm text-zinc-400">A straightforward tool to help you improve resume clarity, formatting, and structure.</p>
          </div>

          <div className="flex flex-col items-center gap-2 md:items-end">
            <a href="mailto:himanshubhagat080104@gmail.com" className="text-sm hover:text-white transition">
              himanshubhagat080104@gmail.com
            </a>
            <a href="https://github.com/CREATOR-08" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition">
              github.com/CREATOR-08
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-800 pt-4 text-center text-xs text-zinc-500">
          © 2025 Resume Analyzer. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Sec3
