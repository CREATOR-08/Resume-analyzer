"use client";

import React from 'react'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Sec2 = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // LEFT → comes from extreme left
    gsap.from(leftRef.current, {
      x: "-100vw",
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 85%",
        end: "top 45%",
        scrub: false,
      },
    });

    // RIGHT → comes from extreme right
    gsap.from(rightRef.current, {
      x: "100vw",
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rightRef.current,
        start: "top 85%",
        end: "top 45%",
        scrub: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className='w-full py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-zinc-900/30'>
      <div className='w-full flex flex-col text-zinc-300 gap-16 md:gap-24'>
        <div className='mx-auto w-full max-w-7xl flex flex-col gap-6 md:gap-8 items-center md:grid md:grid-cols-2'>
          <img src='/img1.png' className='w-full max-w-xs md:max-w-sm object-contain' alt='Resume illustration' />
          <div ref={rightRef} className='w-full'>
            <h1 className='text-2xl md:text-3xl text-white text-center md:text-left font-semibold leading-tight'>A clear and honest resume review</h1>
            <p className='mt-4 text-center md:text-left text-zinc-300 leading-relaxed'>This tool helps you identify common resume issues such as inconsistent formatting, unclear job descriptions, and weak bullet-point impact. It is built to support your own editing process, not replace a professional review.</p>
          </div>
        </div>
        <div className='mx-auto w-full max-w-7xl flex flex-col gap-6 md:gap-8 items-center md:grid md:grid-cols-2'>
          <div ref={leftRef} className='w-full md:order-2'>
            <h1 className='text-2xl md:text-3xl text-white text-center md:text-left font-semibold leading-tight'>Focus on practical improvements</h1>
            <p className='mt-4 text-center md:text-left text-zinc-300 leading-relaxed'>The feedback is designed to help you tighten your wording, make your achievements easier to scan, and reduce resume clutter. It is a starting point for revision, with the goal of making your resume more consistent and readable.</p>
          </div>
          <img src='/img1.png' className='w-full max-w-xs md:max-w-sm object-contain md:order-1' alt='Resume illustration' />
        </div>
      </div>
    </section>
  )
}

export default Sec2
