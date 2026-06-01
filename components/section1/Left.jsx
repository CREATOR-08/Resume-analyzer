"use client"
import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

const Left = () => {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
      console.log('Selected file:', file.name)
    }
  }

  return (
    <>
      <div className="flex flex-col w-auto items-center md:grid md:grid-rows-[0.1fr_0.3fr_0.5fr_0.1fr] h-auto mt-15 ml-3 mr-3 text-center">
        <div className="justify-self-center"> Free Resume Checker</div>
        <div className="text-xl md:text-3xl">Get expert feedback on your resume, instantly</div>
        <h2>
          Our <strong>free AI</strong>-powered resume checker scores your resume on key criteria 
          recruiters and hiring managers look for. Get actionable steps to revamp your resume and 
          <strong> land more interviews.</strong>
        </h2>
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <div
            role="button"
            tabIndex={0}
            onClick={handleButtonClick}
            onKeyDown={(event) => event.key === 'Enter' && handleButtonClick()}
            className="relative w-full max-w-[28rem] md:max-w-[34rem] h-72 rounded-3xl border-2 border-dashed border-white bg-cyan-950/10 p-6 mt-5 cursor-pointer hover:bg-cyan-950/20 transition"
          >
            <div className="flex h-full flex-col items-center justify-center text-white/80">
              <AiOutlineUpload className="text-5xl text-white mb-4" />
              <p className="text-base md:text-lg font-medium">
                {selectedFile
                  ? 'The file is uploaded ✅ move a step closer to make your resume perfect'
                  : 'Click here to upload your resume'}
              </p>
              <p className="mt-2 text-sm md:text-base">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-white">{selectedFile ? `Selected file: ${selectedFile}` : 'No file selected yet.'}</p>
          <button
            type="button"
            onClick={() => console.log('Send to analyse clicked')}
            disabled={!selectedFile}
            className={`mt-4 w-full max-w-[22rem] rounded-2xl py-4 text-lg font-semibold transition ${selectedFile ? 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg' : 'bg-cyan-950 text-white/60 cursor-not-allowed'}`}
          >
            Send to Analyse
          </button>
        </div>
        <div className='block md:hidden'>
          <img src='/mob.png' alt='Mobile preview' />
        </div>
      </div>
    </>
  )
}

export default Left
