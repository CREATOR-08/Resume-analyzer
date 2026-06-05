'use client'

import React, { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

type Project = {
  title: string
  description: string
}

const Analyse = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [resumeTitle, setResumeTitle] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [role, setRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [overallScore, setOverallScore] = useState('')
  const [atsScore, setAtsScore] = useState('')
  const [grammarScore, setGrammarScore] = useState('')
  const [keywordScore, setKeywordScore] = useState('')
  const [strengths, setStrengths] = useState([''])
  const [weaknesses, setWeaknesses] = useState([''])
  const [suggestions, setSuggestions] = useState([''])
  const [skills, setSkills] = useState([''])
  const [projects, setProjects] = useState<Project[]>([{ title: '', description: '' }])
  const roleInputRef = useRef<HTMLDivElement>(null)

  const roleSuggestions = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Product Manager',
    'UX/UI Designer',
    'DevOps Engineer',
    'Quality Assurance Engineer',
    'Business Analyst',
    'Project Manager',
    'Cloud Architect',
    'Mobile Developer',
    'AI/ML Engineer',
    'Security Engineer'
  ]

  const filteredSuggestions = roleSuggestions.filter((s) =>
    s.toLowerCase().includes(role.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleInputRef.current && !roleInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole)
    setShowSuggestions(false)
  }

  const handleJdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setJdFile(e.target.files[0])
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const updateListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setList((current) => current.map((item, idx) => (idx === index ? value : item)))
  }

  const updateProjectField = (index: number, field: keyof Project, value: string) => {
    setProjects((current) =>
      current.map((project, idx) => (idx === index ? { ...project, [field]: value } : project))
    )
  }

  const addListItem = (setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((current) => [...current, ''])
  }

  const removeListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setList(list.filter((_, idx) => idx !== index))
  }

  const addProject = () => {
    setProjects((current) => [...current, { title: '', description: '' }])
  }

  const removeProject = (index: number) => {
    setProjects((current) => current.filter((_, idx) => idx !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      alert('Please provide your email so we can link your analysis to your account.')
      return
    }

    if (!resumeTitle.trim()) {
      alert('Please provide a title for your resume.')
      return
    }

    if (!resumeFile) {
      alert('Please upload your resume file so we can store it in the database.')
      return
    }

    if (!role.trim()) {
      alert('Please enter or select a target role.')
      return
    }

    const formData = {
      user: {
        name: name.trim() || null,
        email: email.trim(),
        phone: phone.trim() || null
      },
      resume: {
        title: resumeTitle.trim(),
        fileName: resumeFile.name,
        fileUrl: 'TODO: upload and store file URL',
        uploadedAt: new Date().toISOString()
      },
      analysis: {
        overallScore: overallScore.trim() ? Number(overallScore) : null,
        atsScore: atsScore.trim() ? Number(atsScore) : null,
        grammarScore: grammarScore.trim() ? Number(grammarScore) : null,
        keywordScore: keywordScore.trim() ? Number(keywordScore) : null,
        strengths: strengths.filter((item) => item.trim()),
        weaknesses: weaknesses.filter((item) => item.trim()),
        suggestions: suggestions.filter((item) => item.trim()),
        extractedName: name.trim() || null,
        extractedEmail: email.trim() || null,
        extractedPhone: phone.trim() || null
      },
      skills: skills.filter((item) => item.trim()),
      projects: projects
        .filter((project) => project.title.trim() || project.description.trim())
        .map((project) => ({
          title: project.title.trim(),
          description: project.description.trim() || null
        })),
      jobTarget: {
        role: role.trim(),
        jobDescription: jobDescription.trim() || null,
        jdFileName: jdFile?.name || null
      }
    }

    console.log('Form Data:', formData)
    // TODO: Send to backend or next step
  }

  return (
    <div className='min-h-screen bg-zinc-950'>
      <Navbar />

      <div className='mx-auto max-w-5xl px-5 py-12 sm:px-6 md:px-8'>
        <Link href='/' className='mb-8 inline-flex items-center text-zinc-400 hover:text-white transition'>
          <svg className='h-5 w-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back to Home
        </Link>

        <div className='rounded-2xl bg-zinc-900 p-8 shadow-lg ring-1 ring-white/10 space-y-8'>
          <div>
            <h1 className='text-3xl font-semibold text-white mb-2'>Resume Analysis</h1>
            <p className='text-zinc-400'>Answer the questions below to capture all resume and analysis data that matches the Prisma schema.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            <section className='space-y-6'>
              <h2 className='text-xl font-semibold text-white'>Personal & Resume Details</h2>

              <div className='grid gap-6 md:grid-cols-2'>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Full Name</span>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your full name'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Email Address <span className='text-red-500'>*</span></span>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='you@example.com'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
              </div>

              <div className='grid gap-6 md:grid-cols-2'>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Phone</span>
                  <input
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='+1 (555) 123-4567'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Resume Title <span className='text-red-500'>*</span></span>
                  <input
                    type='text'
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    placeholder='Senior Product Designer Resume'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
              </div>

              <div>
                <span className='text-sm font-semibold text-white'>Upload Resume File <span className='text-red-500'>*</span></span>
                <input
                  type='file'
                  onChange={handleResumeUpload}
                  accept='.pdf,.doc,.docx,.txt'
                  className='hidden'
                  id='resume-upload-input'
                />
                <label htmlFor='resume-upload-input' className='mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition'>
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                  Choose Resume File
                </label>
                {resumeFile && (
                  <p className='mt-2 text-sm text-zinc-300'>Selected file: {resumeFile.name}</p>
                )}
              </div>
            </section>

            <section className='space-y-6'>
              <h2 className='text-xl font-semibold text-white'>Target Role & Job Description</h2>

              <div ref={roleInputRef} className='relative'>
                <label className='block text-sm font-semibold text-white mb-3'>
                  Target Role <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder='e.g. Product Manager, Cloud Architect'
                  className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
                    {filteredSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type='button'
                        onClick={() => handleRoleSelect(suggestion)}
                        className='w-full text-left px-4 py-3 text-zinc-300 hover:bg-zinc-700 hover:text-white transition border-b border-zinc-700 last:border-b-0'
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className='block text-sm font-semibold text-white mb-3'>
                  Job Description <span className='text-zinc-500'>(Optional)</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder='Paste the job description here...'
                  rows={5}
                  className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                />
                <p className='text-xs text-zinc-500 mt-2'>Max 5000 characters</p>
              </div>

              <div>
                <label className='block text-sm font-semibold text-white mb-3'>
                  Upload Job Description or Image <span className='text-zinc-500'>(Optional)</span>
                </label>
                <input
                  type='file'
                  onChange={handleJdUpload}
                  accept='.pdf,.doc,.docx,.txt,image/*'
                  className='hidden'
                  id='jd-upload-input'
                />
                <label htmlFor='jd-upload-input' className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition'>
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                  Upload JD File or Image
                </label>
                {jdFile && (
                  <p className='mt-2 text-sm text-zinc-300'>Selected file: {jdFile.name}</p>
                )}
              </div>
            </section>

            <section className='space-y-6'>
              <h2 className='text-xl font-semibold text-white'>Resume Analysis Values</h2>

              <div className='grid gap-6 md:grid-cols-2'>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Overall Score</span>
                  <input
                    type='number'
                    min={0}
                    max={100}
                    value={overallScore}
                    onChange={(e) => setOverallScore(e.target.value)}
                    placeholder='e.g. 85'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>ATS Score</span>
                  <input
                    type='number'
                    min={0}
                    max={100}
                    value={atsScore}
                    onChange={(e) => setAtsScore(e.target.value)}
                    placeholder='e.g. 72'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
              </div>

              <div className='grid gap-6 md:grid-cols-2'>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Grammar Score</span>
                  <input
                    type='number'
                    min={0}
                    max={100}
                    value={grammarScore}
                    onChange={(e) => setGrammarScore(e.target.value)}
                    placeholder='e.g. 88'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
                <label className='block'>
                  <span className='text-sm font-semibold text-white'>Keyword Score</span>
                  <input
                    type='number'
                    min={0}
                    max={100}
                    value={keywordScore}
                    onChange={(e) => setKeywordScore(e.target.value)}
                    placeholder='e.g. 79'
                    className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </label>
              </div>

              <div className='grid gap-6 md:grid-cols-3'>
                <div>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm font-semibold text-white'>Strengths</span>
                    <button
                      type='button'
                      onClick={() => addListItem(setStrengths)}
                      className='text-xs text-blue-400 hover:text-blue-300'
                    >
                      + Add
                    </button>
                  </div>
                  <div className='space-y-3'>
                    {strengths.map((item, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <input
                          type='text'
                          value={item}
                          onChange={(e) => updateListItem(strengths, setStrengths, index, e.target.value)}
                          placeholder={`Strength ${index + 1}`}
                          className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        {strengths.length > 1 && (
                          <button
                            type='button'
                            onClick={() => removeListItem(strengths, setStrengths, index)}
                            className='text-sm text-red-400 hover:text-red-300'
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm font-semibold text-white'>Weaknesses</span>
                    <button
                      type='button'
                      onClick={() => addListItem(setWeaknesses)}
                      className='text-xs text-blue-400 hover:text-blue-300'
                    >
                      + Add
                    </button>
                  </div>
                  <div className='space-y-3'>
                    {weaknesses.map((item, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <input
                          type='text'
                          value={item}
                          onChange={(e) => updateListItem(weaknesses, setWeaknesses, index, e.target.value)}
                          placeholder={`Weakness ${index + 1}`}
                          className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        {weaknesses.length > 1 && (
                          <button
                            type='button'
                            onClick={() => removeListItem(weaknesses, setWeaknesses, index)}
                            className='text-sm text-red-400 hover:text-red-300'
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm font-semibold text-white'>Suggestions</span>
                    <button
                      type='button'
                      onClick={() => addListItem(setSuggestions)}
                      className='text-xs text-blue-400 hover:text-blue-300'
                    >
                      + Add
                    </button>
                  </div>
                  <div className='space-y-3'>
                    {suggestions.map((item, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <input
                          type='text'
                          value={item}
                          onChange={(e) => updateListItem(suggestions, setSuggestions, index, e.target.value)}
                          placeholder={`Suggestion ${index + 1}`}
                          className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        {suggestions.length > 1 && (
                          <button
                            type='button'
                            onClick={() => removeListItem(suggestions, setSuggestions, index)}
                            className='text-sm text-red-400 hover:text-red-300'
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-white'>Skills & Projects</h2>
                <button
                  type='button'
                  onClick={() => addListItem(setSkills)}
                  className='text-sm text-blue-400 hover:text-blue-300'
                >
                  + Add Skill
                </button>
              </div>

              <div className='space-y-3'>
                {skills.map((skill, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <input
                      type='text'
                      value={skill}
                      onChange={(e) => updateListItem(skills, setSkills, index, e.target.value)}
                      placeholder={`Skill ${index + 1}`}
                      className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                    {skills.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeListItem(skills, setSkills, index)}
                        className='text-sm text-red-400 hover:text-red-300'
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className='space-y-4'>
                {projects.map((project, index) => (
                  <div key={index} className='rounded-2xl border border-zinc-700 bg-zinc-950 p-4'>
                    <div className='flex items-center justify-between gap-4 mb-4'>
                      <h3 className='text-sm font-semibold text-white'>Project {index + 1}</h3>
                      {projects.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeProject(index)}
                          className='text-sm text-red-400 hover:text-red-300'
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className='grid gap-6 md:grid-cols-2'>
                      <label className='block'>
                        <span className='text-sm font-semibold text-white'>Project Title</span>
                        <input
                          type='text'
                          value={project.title}
                          onChange={(e) => updateProjectField(index, 'title', e.target.value)}
                          placeholder='e.g. Resume AI parser'
                          className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                      </label>
                      <label className='block'>
                        <span className='text-sm font-semibold text-white'>Project Description</span>
                        <input
                          type='text'
                          value={project.description}
                          onChange={(e) => updateProjectField(index, 'description', e.target.value)}
                          placeholder='Describe your role or accomplishment'
                          className='mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                      </label>
                    </div>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={addProject}
                  className='inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300'
                >
                  + Add another project
                </button>
              </div>
            </section>

            <div className='flex gap-4'>
              <button
                type='submit'
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition'
              >
                Store Resume Data
              </button>
              <button
                type='reset'
                onClick={() => {
                  setName('')
                  setEmail('')
                  setPhone('')
                  setResumeTitle('')
                  setResumeFile(null)
                  setRole('')
                  setJobDescription('')
                  setJdFile(null)
                  setOverallScore('')
                  setAtsScore('')
                  setGrammarScore('')
                  setKeywordScore('')
                  setStrengths([''])
                  setWeaknesses([''])
                  setSuggestions([''])
                  setSkills([''])
                  setProjects([{ title: '', description: '' }])
                }}
                className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition'
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Analyse
