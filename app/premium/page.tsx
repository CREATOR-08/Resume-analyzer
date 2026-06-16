'use client'
import premiumBridge from '@/lib/premiumbridge'
import React, { useEffect, useState } from 'react'
import Roles from '@/components/Roles'
import { useAuthStore } from '@/store/logged'

import { useRouter } from "next/navigation";
import {handleSubmit} from './handleSubmit'

import {
  Upload,
  Infinity,
  Building,
  Sparkles,
  History,
  FileText,
  ExternalLink,
  AlertCircle
} from 'lucide-react'

interface CompanyJob {
  id: string
  company_name: string
  role: string
  year: string // Year of the job description
  pdf_url: string // URL to the PDF job description
  jd_text: string // Full text of the job description
}

export default function PremiumPage () {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [jobs, setJobs] = useState<CompanyJob[]>([])
  const [selectedJob, setSelectedJob] = useState<CompanyJob | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const router=useRouter();

  const [loading, setLoading] = useState(false)
  const logged = useAuthStore((state) => state.logged)

  // Safe lookup with an explicit runtime fallback to avoid component crashes
  const displayJob = selectedJob || {
    id: '',
    company_name: 'Select Company',
    role: selectedRole || 'Select Role',
    year: '—',
    pdf_url: '',
    jd_text: ''
  }

  useEffect(() => {
    // If no role is selected yet, keep the initial fallback visualization
    if (!selectedRole) return

    const fetchJD = async () => {
      try {
        setErrorMessage('') // Reset error on new fetch
        const res = await fetch(`/api/job_descriptions?role=${selectedRole}`)
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          const fetchedJobs: CompanyJob[] = data
          setJobs(fetchedJobs)
          setSelectedJob(fetchedJobs[0]) // Auto-select the first job from the new data
        } else {
          // Handle empty response arrays
          setJobs([])
          setSelectedJob(null)
        }
      } catch (error) {
        console.error('Failed to fetch job descriptions:', error)
        setErrorMessage('Failed to load job profiles. Please try again.')
        setJobs([])
        setSelectedJob(null)
      }
    }

    fetchJD()
  }, [selectedRole])

  // Handle job item selection safely
  const handleJobSelect = (job: CompanyJob) => {
    if (!selectedRole) {
      setErrorMessage(
        'Please select a target role first to load matching job profiles.'
      )
      return
    }
    setErrorMessage('')
    setSelectedJob(job)
  }

  return (
    <div className='min-h-screen bg-[#040407] text-white font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200'>
      <div className='max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12'>
        {/* --- HERO SECTION --- */}
        <section className='text-center space-y-4 max-w-3xl mx-auto'>
          <div className='inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'>
            ✨ Premium
          </div>
          <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2'>
            Premium Resume Scan
          </h1>
          <p className='text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed'>
            Compare your resume with real job descriptions from leading
            companies and receive detailed recommendations.
          </p>
        </section>

        {/* --- MAIN INTERACTION AREA --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
          {/* Left Column: Selection & Upload */}
          <div className='space-y-8'>
            {/* COMPANY SELECTION CARD */}
            <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
              <h2 className='text-base font-semibold text-white'>
                Target Company
              </h2>
              <p className='text-xs text-slate-400 mt-1 mb-5'>
                Select a company profile to analyze your resume against.
              </p>

              <Roles
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
              />

              {/* Explicit runtime warning message when interacting inappropriately */}
              {errorMessage && (
                <div className='mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2'>
                  <AlertCircle className='h-4 w-4 shrink-0' />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Dynamic Job Selector Links */}
              <div className='mt-4 pt-4 border-t border-slate-800/60'>
                <p className='text-xs font-medium text-slate-500 mb-2'>
                  {selectedRole
                    ? `Matches found for "${selectedRole}"`
                    : 'Select a role'}
                </p>

                {jobs.length === 0 ? (
                  <p className='text-xs text-slate-500 italic'>
                    No matching job profiles found for this role.
                  </p>
                ) : (
                  <div className='flex flex-wrap gap-2'>
                    {jobs.map(job => (
                      <button
                        key={job.id}
                        type='button'
                        onClick={() => handleJobSelect(job)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          selectedJob?.id === job.id
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/40'
                            : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {job.company_name} • {job.role} ({job.year})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RESUME UPLOAD CARD */}
            <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl'>
              <div className='mb-4'>
                <h2 className='text-lg font-semibold text-white'>
                  Upload Resume
                </h2>
                <p className='text-sm text-slate-400'>
                  Upload your resume in PDF format.
                </p>
              </div>

              <div className='border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-8 text-center bg-slate-950/50 transition-colors group cursor-pointer'>
                <input
                  type='file'
                  accept='.pdf'
                  className='hidden'
                  id='resume-upload'
                  onChange={e => {
                    const file = e.target.files?.[0]

                    if (file) {
                      setResumeFile(file)

                      console.log(file)
                    }
                  }}
                />
                <label
                  htmlFor='resume-upload'
                  className='cursor-pointer flex flex-col items-center space-y-3'
                >
                  <div className='p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors'>
                    <Upload className='h-6 w-6' />
                  </div>
                  <div className='text-sm text-slate-300'>
                    <span className='font-semibold text-indigo-400 hover:text-indigo-300'>
                      Browse Files
                    </span>{' '}
                    or drag & drop
                  </div>
                  <p className='text-xs text-slate-500'>PDF only</p>
                  {resumeFile && (
                    <p className='text-xs text-emerald-400'>
                      {resumeFile.name}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className='h-full'>
            {/* SELECTED COMPANY PREVIEW CARD */}
            <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between'>
              <div>
                <div className='pb-4 border-b border-slate-800 mb-5'>
                  <h2 className='text-xs font-semibold text-indigo-400 uppercase tracking-wider'>
                    Target Benchmarking
                  </h2>
                  <p className='text-sm text-slate-400'>
                    Selected Job Description
                  </p>
                </div>

                <div className='flex items-start space-x-4 mb-6'>
                  <div className='p-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl shrink-0'>
                    <Building className='h-6 w-6' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      {displayJob.company_name}
                    </h3>
                    <p className='text-sm text-slate-400 font-medium'>
                      {displayJob.role}{' '}
                      <span className='text-slate-600 mx-1.5'>•</span> Class of{' '}
                      {displayJob.year}
                    </p>
                  </div>
                </div>

                <div className='bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 min-h-[140px] flex items-center justify-center'>
                  <p className='text-sm text-slate-400 italic text-center max-w-xs'>
                    "Job description data for{' '}
                    <span className='text-slate-200 not-italic font-medium'>
                      {displayJob.company_name} — {displayJob.role}
                    </span>{' '}
                    parsed and prepared dynamically for scan validation."
                  </p>
                </div>
              </div>

              <div className='mt-8 pt-4 border-t border-slate-800'>
                <button
                  type='button'
                  disabled={!selectedJob}
                  onClick={() => {
                    if (displayJob.pdf_url) {
                      window.open(displayJob.pdf_url, '_blank')
                    }
                  }}
                  className={`w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    !selectedJob
                      ? 'bg-slate-800 text-slate-500 border-slate-800 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700 cursor-pointer'
                  }`}
                >
                  <FileText className='h-4 w-4' />

                  <span>View Full Job Description</span>

                  <ExternalLink className='h-3.5 w-3.5 opacity-60' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM BENEFITS SECTION --- */}
      <section className='pt-8 space-y-6'>
        <div className='text-center md:text-left'>
          <h2 className='text-2xl font-bold text-white tracking-tight'>
            Premium Capabilities
          </h2>
          <p className='text-sm text-slate-400 mt-1'>
            Everything included in your high-tier diagnostic tier.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0'>
          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md'>
            <div className='p-2.5 bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 rounded-xl w-fit'>
              <Infinity className='h-5 w-5' />
            </div>
            <h3 className='text-base font-semibold text-white'>
              Unlimited Premium Scans
            </h3>
            <p className='text-xs text-slate-400 leading-relaxed'>
              Analyze your resume without restrictions or throttling.
            </p>
          </div>

          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md'>
            <div className='p-2.5 bg-purple-600/10 text-purple-400 border border-purple-500/10 rounded-xl w-fit'>
              <Building className='h-5 w-5' />
            </div>
            <h3 className='text-base font-semibold text-white'>
              Top Company JDs
            </h3>
            <p className='text-xs text-slate-400 leading-relaxed'>
              Compare your resume with job descriptions from leading companies.
            </p>
          </div>

          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md'>
            <div className='p-2.5 bg-amber-600/10 text-amber-400 border border-amber-500/10 rounded-xl w-fit'>
              <Sparkles className='h-5 w-5' />
            </div>
            <h3 className='text-base font-semibold text-white'>
              Detailed Recommendations
            </h3>
            <p className='text-xs text-slate-400 leading-relaxed'>
              Receive actionable suggestions to improve your resume score.
            </p>
          </div>

          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md'>
            <div className='p-2.5 bg-emerald-600/10 text-emerald-400 border border-emerald-500/10 rounded-xl w-fit'>
              <History className='h-5 w-5' />
            </div>
            <h3 className='text-base font-semibold text-white'>
              Resume History
            </h3>
            <p className='text-xs text-slate-400 leading-relaxed'>
              Access previously generated premium reports instantaneously.
            </p>
          </div>
        </div>
      </section>

      {/* --- MAIN ACTION BUTTON --- */}
      <section className='flex justify-center pt-8'>
        <button
          type='button'
          disabled={!logged}
          onClick={() => {
            if (!logged) {
              router.push('/login')
              return
            }
            handleSubmit(resumeFile, selectedJob, setLoading, router)
          }}
          className={`h-[56px] w-[260px] inline-flex items-center justify-center font-semibold text-white rounded-full transition-all duration-150 shadow-lg shadow-indigo-600/20 active:scale-[0.98] ${
            logged
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {logged ? 'Start Premium Scan' : 'Log in to scan'}
        </button>
      </section>
    </div>
  )
}
