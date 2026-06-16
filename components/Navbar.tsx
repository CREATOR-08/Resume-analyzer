"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useAuthStore } from '@/store/logged';
type User = {
  id: string;
  name: string | null;
  email: string;
};
type NavbarProps = {
  initialUser?: User | null;
};

const Navbar = ({ initialUser = null }:NavbarProps) => {
  const pathname = usePathname();
  const storeLogged = useAuthStore((state) => state.logged);
  const setUser = useAuthStore((state) => state.setUser);
  const logged = storeLogged || Boolean(initialUser);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Listen to scroll events to toggle background opacity states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  let visibleLinks = navLinks.filter((link) => link.href !== pathname);

  if (pathname !== "/") {
    visibleLinks = [
      { href: "/", label: "Home" },
      ...visibleLinks,
    ];
  }

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md text-xl border-b ${
        scrolled 
          ? 'bg-[#040407]/70 border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-[#040407] border-transparent'
      }`}
    >
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
        <Link href="/" className='flex items-center gap-2 md:gap-3 hover:opacity-90 transition'>
          <img src='/logo.png' className='w-10 h-10 md:w-12 md:h-12' alt='Logo' />
          <div className='hidden md:block text-zinc-100'>
            <h5 className='font-bold'>RESUME LENS</h5>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 text-zinc-300 font-medium'>
          {visibleLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`transition-colors duration-200 hover:scale-101 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${pathname === link.href ? 'text-white' : 'hover:text-white'}`}
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
            <div className='absolute top-16 right-0 w-full bg-[#040407] border-b border-zinc-800 shadow-lg py-2'>
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
  );
};

export default Navbar;