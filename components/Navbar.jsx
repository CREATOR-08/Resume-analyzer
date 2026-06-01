import Link from 'next/link'
import React from 'react'
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className='bg-cyan-950 w-screen h-14 flex  justify-between  '>

      <div className='flex '>
        <img src='/logo.png' className='md:w-15 md:h-15'></img>
        <div className='hidden md:block'>
          <h5>RESUME</h5>
          <h5 className=''>ANALYSER</h5>
        </div>
      </div>

      <div className=' md:flex md:gap-6 text-stone-500 mr-5 font-semibold mt-3 hidden md:block'>
        <Link href={"localhost:3000/dashboard"}>Dashboard</Link>
        <Link href={"localhost:3000/contacts"}>Contacts</Link>
        <Link href={"localhost:3000/signin"}>Sign In</Link>
        
      </div>
      <div className='block md:hidden h-auto w-50  '>
        <HiMenu className='h-10 justify-self-end w-15 mr-3 mt-2' />
        
      </div>
      

      
    </div>
  )
}

export default Navbar
