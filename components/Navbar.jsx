"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/contacts', label: 'Contacts' },
    { href: '/analyse', label: 'Analyse' },
    { href: '/signup', label: 'Sign Up' }
  ];

  return (

    <div className='bg-zinc-950 w-full h-14'>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6'>
        <div className='flex items-center gap-3'>
          <img src='/logo.png' className='md:w-12 md:h-12 w-10 h-10' alt='Logo' />
          <div className='hidden md:block text-zinc-100'>
            <h5 className='text-sm font-semibold'>ResumeLens</h5>
          </div>
        </div>

        <div className='hidden md:flex md:gap-6 text-zinc-300 font-semibold'>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className='hover:text-white transition'>
              {link.label}
            </Link>
          ))}
        </div>

        <div className='block md:hidden relative'>
          <HiMenu onClick={() => setOpen(!open)} className='h-6 w-6 text-zinc-300 cursor-pointer' aria-label='Toggle menu' />

          {open && (
            <div className='absolute right-0 mt-2 w-40 bg-zinc-900 rounded-md shadow-lg py-2 z-50'>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className='block w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white'>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
