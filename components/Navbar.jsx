"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useAuthStore } from '@/store/logged';

/**
 * @typedef {{ id: string; name: string | null; email: string | null } | null} NavbarInitialUser
 */

/**
 * @param {{ initialUser?: NavbarInitialUser }} props
 */

const Navbar = ({ initialUser = null }) => {
  const pathname = usePathname();
  const storeLogged = useAuthStore((state) => state.logged);
  const setUser = useAuthStore((state) => state.setUser);
  const logged = storeLogged || Boolean(initialUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

    const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/analyse', label: 'Analyse' },
    { href: '/premium', label: 'Premium' },
    ...(!logged ? [{ href: '/signup', label: 'Sign Up' }] : []),
  ];

  const [open, setOpen] = useState(false);
  let visibleLinks = navLinks.filter(
  (link) => link.href !== pathname
);

if (pathname !== "/") {
  visibleLinks = [
    { href: "/", label: "Home" },
    ...visibleLinks,
  ];
}

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/50">
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
        <Link href="/" className='flex items-center gap-2 md:gap-3 hover:opacity-90 transition'>
          <img src='/logo.png' className='w-10 h-10 md:w-12 md:h-12' alt='Logo' />
          <div className='hidden md:block text-zinc-100'>
            <h5 className='text-sm font-bold'>resume-lens</h5>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 text-zinc-300 font-medium'>
          {visibleLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm transition-colors duration-200 hover:scale-101 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${pathname === link.href ? 'text-white' : 'hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={() => setOpen(!open)} 
            className='p-2 rounded-md text-zinc-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950'
            aria-label='Toggle menu'
          >
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {/* Mobile Menu */}
          {open && (
            <div className='absolute top-16 right-0 w-full bg-zinc-900 border-b border-zinc-800 shadow-lg py-2'>
              {visibleLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setOpen(false)} 
                  className='block px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950'
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
