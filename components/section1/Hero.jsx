"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="absolute top-8 left-0 right-0 z-0 pointer-events-none select-none text-center hidden sm:block">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center"
      >
        {/* Cinematic, ultra-clean branding header */}
        <h1 className="text-2xl font-bold tracking-[0.4em] uppercase text-zinc-500/50 flex items-center gap-3">
          <span>Resume</span>
          <span className="h-1 w-1 rounded-full bg-indigo-500/40" />
          <span className="bg-gradient-to-r from-blue-400/60 to-zinc-500/30 bg-clip-text text-transparent">Lens</span>
        </h1>
        
        {/* Subtle separator glow line */}
        <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent" />
      </motion.div>
    </div>
  );
}