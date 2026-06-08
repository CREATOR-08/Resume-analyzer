import React from 'react'

import Left from './Left';
import Laptop from './Laptop';
import Hero from './Hero';

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
              <Laptop />
            </div>
          </div>
        </div>
      </div>

      {/* LOWER TEXT */}
      <div className='w-full px-4 sm:px-6 md:px-8 py-12 bg-zinc-900/30'>
        <div className='mx-auto max-w-7xl'>
          
        </div>
      </div>
    </>
  )
}

export default Sec1
