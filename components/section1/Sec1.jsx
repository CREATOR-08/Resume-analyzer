import React from 'react'

import Left from './Left';
import Laptop from './Laptop';
import Hero from './Hero';
import ResumeLensHero from '../ResumeLensHero';

/**
 * @typedef {{ id: string; name: string | null; email: string | null } | null} SectionInitialUser
 */

/**
 * @param {{ initialUser?: SectionInitialUser }} props
 */
const Sec1 = ({ initialUser = null }) => {
  return (
    <>
      <div className='w-full px-4 sm:px-6 md:px-8'>
        <div className='mx-auto max-w-7xl'>
          <Hero />
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-20">
        <div className='mx-auto max-w-7xl'>
          <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center min-h-[600px] md:min-h-[700px]">
            {/* LEFT SIDE */}
            <div className='flex justify-center md:justify-start'>
              <Left initialUser={initialUser} />
            </div>

            {/* RIGHT SIDE: laptop */}
            <div className='hidden md:flex items-center justify-center'>
              <ResumeLensHero

                resumeImage="/resume.jfif"

                scoreImage="/score.jfif"

                recommendationImage="/recommendation.jfif"

                skillsImage="/skills.jfif"

                summaryImage="/summary.jfif"

              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sec1
