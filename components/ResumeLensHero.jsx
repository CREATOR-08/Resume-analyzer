"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import Left from "./section1/Left";
import Hero from "./section1/Hero";

export default function ResumeLensHero({
  resumeImage,
  scoreImage,
  recommendationImage,
  skillsImage,
  summaryImage,
}) {
  return (
    <section
      style={{ backgroundColor: '#040407' }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#040407] px-6 py-24 text-white lg:px-12"
    >
      {/* BACKGROUND CANVAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <Hero />
        
        {/* Faint Cyber Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), 
                              linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="relative z-10 grid mx-auto w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
        
        {/* Left Side Content Column */}
        <div className="flex flex-col text-center lg:col-span-5 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Left />
          </motion.div>
        </div>

        {/* Right Side Workspace Column with Contrained Glows */}
        <div className="relative flex h-[500px] w-full items-center justify-center sm:h-[600px] lg:col-span-7">
          
          {/* ACCENT GLOWS: Increased opacity and targeted sizing for a stronger, localized pop */}
<div className="absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[80px] pointer-events-none mix-blend-screen" />
<div className="absolute top-1/2 left-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/35 blur-[50px] pointer-events-none mix-blend-screen" />
          
          {/* CENTRAL MOCKUP LAPTOP */}
          <motion.div
            className="relative z-20 w-full max-w-[360px] sm:max-w-[460px] px-4"
            style={{ perspective: "1500px" }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {/* Laptop Display Chassis */}
            <div 
              className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl border border-white/[0.12] bg-[#0d0d11] p-2.5 shadow-2xl"
              style={{ transform: "rotateX(8deg) translateZ(0)" }}
            >
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04]" />
              
              {/* Screen Dashboard Asset */}
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#070709]">
                <Image
                  src={resumeImage}
                  alt="ResumeLens Core Dashboard"
                  fill
                  sizes="460px"
                  priority
                  className="object-cover object-top select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Laptop Aluminum Base Platform */}
            <div 
              className="relative h-3 w-full rounded-b-xl bg-gradient-to-b from-[#2a2a30] via-[#1a1a1f] to-[#0f0f12] border-t border-white/[0.25] shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
              style={{ transform: "rotateX(24deg) translateY(-2px)", transformOrigin: "top center" }}
            >
              <div className="absolute left-1/2 top-0 h-[3px] w-14 -translate-x-1/2 rounded-b-sm bg-[#09090b]" />
            </div>
          </motion.div>

          {/* DYNAMIC ELLIPTICAL ORBIT CARD ENGINE */}
          <EllipticalOrbitSystem 
            cards={[
              { id: "score", src: scoreImage, alt: "ATS Score Analytics", phase: 0 },
              { id: "gap", src: skillsImage, alt: "Skill Gap Matrix", phase: Math.PI / 2 },
              { id: "rec", src: recommendationImage, alt: "AI Recommendation Deck", phase: Math.PI },
              { id: "pdf", src: summaryImage, alt: "Resume Parsing Engine", phase: (3 * Math.PI) / 2 },
            ]}
          />

        </div>
      </div>
    </section>
  );
}

/* --- ORBITAL CALCULATIONS SUB-COMPONENT --- */
function EllipticalOrbitSystem({ cards }) {
  const time = useMotionValue(0);
  const [, setTick] = useState(0);

  const HORIZONTAL_RADIUS = 280;
  const VERTICAL_RADIUS = 75;
  const LOOP_DURATION = 22000;

  useEffect(() => {
    let startTime = performance.now();
    let frameId;

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = ((elapsed % LOOP_DURATION) / LOOP_DURATION) * Math.PI * 2;
      time.set(progress);
      
      setTick((prev) => prev + 1);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [time]);

  return (
    <div className="absolute inset-0 items-center justify-center pointer-events-none flex">
      {cards.map((card) => {
        const currentAngle = time.get() + card.phase;
        
        const x = Math.cos(currentAngle) * HORIZONTAL_RADIUS;
        const y = Math.sin(currentAngle) * VERTICAL_RADIUS;

        const depthFactor = Math.sin(currentAngle); 
        const isBehind = depthFactor < 0;

        const scale = isBehind 
          ? 0.78 + ((depthFactor + 1) * 0.12)
          : 0.90 + (depthFactor * 0.15);

        const opacity = isBehind 
          ? 0.35 + ((depthFactor + 1) * 0.45)
          : 0.80 + (depthFactor * 0.20);

        const zIndex = isBehind ? 10 : 30;
        const rotationDirection = Math.cos(currentAngle) * -7; 

        return (
          <div
            key={card.id}
            className="absolute w-[150px] sm:w-[190px] pointer-events-auto transition-shadow duration-300 select-none"
            style={{
              transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale}) rotateY(${rotationDirection}deg) rotateZ(${rotationDirection * 0.3}deg)`,
              opacity: opacity,
              zIndex: zIndex,
              transformOrigin: "center center",
            }}
          >
            <div className="relative rounded-xl border border-white/[0.07] bg-[#0c0c0e]/70 p-1.5 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-zinc-700 transition-all duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#141418]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="190px"
                  className="object-cover opacity-90 transition-opacity hover:opacity-100"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}