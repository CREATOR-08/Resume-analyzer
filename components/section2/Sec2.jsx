"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  {
    eyebrow: "Core Optimization",
    title: "Improve your resume",
    text: "Find weak lines, unclear sections, formatting issues, and missing impact metrics so your resume feels noticeably sharper before you hit send.",
    image: "/target/img1.png",
    alt: "Resume improvement preview",
  },
  {
    eyebrow: "Targeted Matching",
    title: "Test your job compatibility",
    text: "Cross-reference your document with target job descriptions instantly. Clear the air on whether your engineering skills, core keywords, and past execution layers match the role requirements.",
    image: "/target/img2.png",
    alt: "Job description compatibility preview",
  },
];

const Sec2 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title-animate", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.utils.toArray(".objective-row").forEach((row) => {
        gsap.from(row.querySelector(".objective-image"), {
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
          },
        });

        gsap.from(row.querySelectorAll(".objective-copy > *"), {
          y: 20,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden px-6 py-24 sm:px-12 md:pb-36 md:pt-32 text-white bg-[#040407]"
      style={{ backgroundColor: '#040407' }} 
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* SECTION HEADER BLOCK */}
        <div className="section-title-animate flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20">
          
          <h2 className="mt-6 bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-5xl leading-[1.15]">
            Make your first impression stand out.
          </h2>
        </div>

        {/* FEATURE OBJECTIVE GRID DYNAMICS */}
        <div className="space-y-24 md:space-y-36">
          {objectives.map((objective, index) => (
            <div
              key={objective.title}
              className="objective-row grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
            >
              {/* IMAGE PANEL COLUMN - Expanded column weight to give widescreen 16:9 breathing room */}
              <div
                className={`objective-image lg:col-span-7 relative group rounded-2xl border border-white/[0.03] bg-white/[0.01] p-3 sm:p-4 backdrop-blur-[2px] transition-all duration-500 hover:border-zinc-700/50 hover:bg-white/[0.02] shadow-[0_24px_60px_rgba(0,0,0,0.5)] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none" />
                
                {/* Fixed to aspect-video (16:9 dimension ratio matrix) */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#09090b] border border-white/[0.02]">
                  <Image
                    src={objective.image}
                    alt={objective.alt}
                    fill
                    sizes="(max-w: 1024px) 100vw, 720px"
                    className="mx-auto h-full w-full object-contain p-2 opacity-90 transition-all duration-500 group-hover:scale-[1.01] group-hover:opacity-100"
                  />
                </div>
              </div>

              {/* TEXT DESCRIPTION COLUMN */}
              <div className="objective-copy lg:col-span-5 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                  {objective.eyebrow}
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {objective.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base md:leading-relaxed max-w-xl">
                  {objective.text}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer group">
                  
                  <span className="transform translate-x-0 transition-transform group-hover:translate-x-1 duration-200">→</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sec2;