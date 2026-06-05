import React from 'react'

import Left from './Left';
import Lower from './Lower';
import Laptop from './Laptop';
import Hero from './Hero';
const Sec1 = () => {
  return (
    <>
    <Hero className="mt-20"></Hero>
      <div className="text-center md:grid  min-h-screen md:grid-cols-[0.6fr_0.4fr] flex flex-col text-white w-full px-4 sm:px-6 md:px-8 gap-10">
        
        
        {/* LEFT SIDE */}
        <div className='mx-auto w-full max-w-7xl'>
          <Left />
        </div>

        {/* RIGHT SIDE: laptop */}
        <div className='hidden md:flex items-start justify-center height-auto w-full max-w-7xl relative'>
          <Laptop />
        </div>
      </div>

      {/* LOWER TEXT */}
      <div className='w-full px-4 sm:px-6 md:px-8 mt-10'>
        <Lower />
      </div>
    </>
  )
}

export default Sec1
