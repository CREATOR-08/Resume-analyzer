"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type HeroProps = {
  resumeImage: string;
  scoreImage: string;
  recommendationImage: string;
  skillsImage: string;
  summaryImage: string;
};

export default function ResumeLensHero({
  resumeImage,
  scoreImage,
  recommendationImage,
  skillsImage,
  summaryImage,
}: HeroProps) {
  // Config for the 4 orbiting cards
  const orbitCards = [
    { id: "score", img: scoreImage, alt: "ATS Score Card", initialAngle: 0 },
    { id: "rec", img: recommendationImage, alt: "Recommendation Card", initialAngle: 90 },
    { id: "skills", img: skillsImage, alt: "Skills Gap Card", initialAngle: 180 },
    { id: "summary", img: summaryImage, alt: "Resume Summary Card", initialAngle: 270 },
  ];

  return (
    <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] px-4 py-20 text-white">
      
      {/* 1. Dark Theme Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft center radial gradient */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
        {/* Secondary subtle glow */}
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center">
        
        {/* Hero Copy (Optional but standard for SaaS Landing page layouts) */}
        <div className="z-10 mb-16 text-center max-w-3xl">
          <h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Resume Lens
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Scan, analyze, and optimize your resume through the eyes of industry-leading AI models.
          </p>
        </div>

        {/* Animation Container Box */}
        <div className="relative flex h-[550px] w-full items-center justify-center">
          
          {/* 3 & 6. Smooth Orbit Ring Container */}
          <motion.div
            className="absolute z-0 flex h-[480px] w-[480px] items-center justify-center rounded-full border border-white/[0.04]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ transformOrigin: "center center" }}
          >
            {orbitCards.map((card) => {
              // Calculate positioning radius on the orbit circle (~240px offset)
              const radius = 240;
              const angleRad = (card.initialAngle * Math.PI) / 180;
              const x = radius * Math.cos(angleRad);
              const y = radius * Math.sin(angleRad);

              return (
                <motion.div
                  key={card.id}
                  className="absolute w-[220px] select-none"
                  style={{
                    x: `calc(-50% + ${x}px)`,
                    y: `calc(-50% + ${y}px)`,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Counter-rotation to keep card perfectly upright + hover scale */}
                  <motion.div
                    className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-2 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    animate={{ rotate: -360 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      rotate: {
                        duration: 25,
                        ease: "linear",
                        repeat: Infinity,
                      },
                      scale: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#121214]">
                      <Image
                        src={card.img}
                        alt={card.alt}
                        fill
                        sizes="220px"
                        priority
                        className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* 2. Central 3D Laptop Mockup */}
          <motion.div
            className="z-10 w-full max-w-[90%] sm:max-w-[45%] md:max-w-[40%] px-4"
            style={{ perspective: "1200px" }}
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {/* Laptop Screen Body with slight 3D angle tilt */}
            <div 
              className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl border border-white/[0.15] bg-[#16161a] p-2 shadow-2xl shadow-indigo-500/5"
              style={{ transform: "rotateX(6deg) translateZ(0)" }}
            >
              {/* Inner Display Gloss Glass Effect */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />
              
              {/* Screen Mock Image */}
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#0e0e10]">
                <Image
                  src={resumeImage}
                  alt="Resume Analysis Lens Interface"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Laptop Base (Creates the tangible 3D laptop feel) */}
            <div 
              className="relative h-3 w-full rounded-b-xl bg-gradient-to-b from-[#2d2d34] to-[#1c1c21] border-t border-white/[0.2] shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              style={{ transform: "rotateX(20deg) translateY(-2px)", transformOrigin: "top center" }}
            >
              {/* Center thumb notch */}
              <div className="absolute left-1/2 top-0 h-[3px] w-12 -translate-x-1/2 rounded-b-sm bg-[#121215]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}