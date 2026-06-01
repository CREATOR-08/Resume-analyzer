import React from 'react'
import { LiaStarSolid } from "react-icons/lia";
const Lower = () => {
  return (
    <div className='text-white'>
          <h6 className='md:text-start ml-17'>Trusted by over <strong className='font-bold'> 1M+</strong> job seekers globally.</h6>
          <div className='flex md:text-start ml-17 mt-10 gap-0.5'>
            <h6 className=''>Excellent: </h6>
            <LiaStarSolid className='h-auto w-auto' />
            <LiaStarSolid className='h-auto w-auto' />
            <LiaStarSolid className='h-auto w-auto' />
            <LiaStarSolid className='h-auto w-auto' />
            <LiaStarSolid className='h-auto w-auto' />
          </div>
          <h6 className='font-extralight text-start ml-17'>Rated 4.9 out of 5 based on 1000+ reviews on <strong>TrustPilot</strong> </h6>
          
          </div>
  )
}

export default Lower
