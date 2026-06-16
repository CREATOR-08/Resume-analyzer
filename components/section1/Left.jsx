"use client";

import React from 'react';
import { useAuthStore } from '@/store/logged';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * @typedef {{ id: string; name: string | null; email: string | null } | null} SectionInitialUser
 */

/**
 * @param {{ initialUser?: SectionInitialUser }} props
 */
const Left = ({ initialUser = null }) => {
  const storeLogged = useAuthStore((state) => state.logged);
  const logged = storeLogged || Boolean(initialUser);

  // Animation variants for staggered, buttery entries (Linear/Stripe style)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center lg:items-start justify-center w-full text-center lg:text-left z-10 px-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 1. Kicker Badge */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs font-medium tracking-widest uppercase text-zinc-400 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        Resume Analysis
      </motion.div>

      {/* 2. Premium Headings using dynamic gradients */}
      <motion.h2 
        variants={itemVariants} 
        className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]"
      >
        {logged ? (
          <>
            Start your next <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              resume analysis.
            </span>
          </>
        ) : (
          <>
            Login to unlock <br />
            <span className="bg-gradient-to-r from-neutral-200 via-zinc-400 to-neutral-500 bg-clip-text text-transparent">
              your insights.
            </span>
          </>
        )}
      </motion.h2>

      {/* 3. Immersive Description */}
      <motion.p 
        variants={itemVariants} 
        className="mt-6 text-base text-zinc-400 sm:text-lg max-w-lg leading-relaxed font-normal"
      >
        {logged
          ? "Run a fresh resume scan and instantly save the deep-dive mapping metrics directly to your engineering workspace."
          : "Sign in to see your personalized resume score, absolute job description matching thresholds, and career path suggestions."}
      </motion.p>

      {/* 4. Redesigned Transparent/Glass Feature List */}
      <motion.div variants={itemVariants} className="mt-8 w-full max-w-md space-y-2.5">
        {[
          "Get your resume scored based on role",
          "Get your resume scored based on JD",
          "Get future tasks vision"
        ].map((text, idx) => (
          <div 
            key={idx}
            className="group flex items-center gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] p-3.5 backdrop-blur-[2px] transition-all duration-300 hover:border-zinc-800 hover:bg-white/[0.03]"
          >
            {/* Minimal glowing check indicator */}
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 group-hover:border-blue-500/40 group-hover:text-blue-400 transition-colors">
              ✓
            </div>
            <p className="text-sm md:text-base font-medium text-zinc-300 group-hover:text-white transition-colors">
              {text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* 5. Call To Action Button Block */}
      <motion.div variants={itemVariants} className="mt-10 w-full max-w-md">
        <Link
          href={logged ? "/analyse" : "/login"}
          className="relative group block w-full text-center rounded-xl bg-white py-3.5 text-base font-semibold text-zinc-950 shadow-md shadow-white/5 transition-all duration-300 hover:bg-zinc-100 hover:scale-[1.01] active:scale-[0.99]"
        >
          {logged ? "Analyze" : "Log in to get started"}
          
          {/* Subtle perimeter border glow effect on hover */}
          <div className="absolute -inset-px rounded-xl border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Left;