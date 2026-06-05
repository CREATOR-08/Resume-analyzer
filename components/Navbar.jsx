"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/contacts', label: 'Contacts' },
    { href: '/analyse', label: 'Analyse' },
    { href: '/signup', label: 'Sign Up' }
  ];

  return (
    <nav className='bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50 w-full'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
        <Link href="/" className='flex items-center gap-2 md:gap-3 hover:opacity-90 transition'>
          <img src='/logo.png' className='w-10 h-10 md:w-12 md:h-12' alt='Logo' />
          <div className='hidden md:block text-zinc-100'>
            <h5 className='text-sm font-bold'>ResumeLens</h5>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 text-zinc-300 font-medium'>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className='text-sm hover:text-white transition-colors duration-200'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={() => setOpen(!open)} 
            className='p-2 text-zinc-300 hover:text-white transition'
            aria-label='Toggle menu'
          >
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {/* Mobile Menu */}
          {open && (
            <div className='absolute top-16 right-0 w-full bg-zinc-900 border-b border-zinc-800 shadow-lg py-2'>
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setOpen(false)} 
                  className='block px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
