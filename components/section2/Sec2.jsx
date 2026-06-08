"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  {
    eyebrow: "Objective 01",
    title: "Improve your resume",
    text: "Find weak lines, unclear sections, formatting issues, and missing impact so your resume feels sharper before you send it.",
    image: "/i1.svg",
    alt: "Resume improvement preview",
  },
  {
    eyebrow: "Objective 02",
    title: "Test how compatible you are for the job",
    text: "Compare your resume with the job description and understand whether your skills, keywords, and experience match the role.",
    image: "/i2.svg",
    alt: "Job description compatibility preview",
  },
];

const Sec2 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".objective-heading > *", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
        },
      });

      gsap.utils.toArray(".objective-row").forEach((row) => {
        gsap.from(row.querySelector(".objective-image"), {
          y: 42,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
          },
        });

        gsap.from(row.querySelectorAll(".objective-copy > *"), {
          y: 26,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden border-y border-white/10 bg-[#080a0f] px-4 sm:px-6 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="objective-heading max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            What you can do
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Two simple ways to make your next application stronger.
          </h2>
        </div>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {objectives.map((objective, index) => (
            <div
              key={objective.title}
              className="objective-row grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <div
                className={`objective-image rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={objective.image}
                  alt={objective.alt}
                  width={720}
                  height={540}
                  className="mx-auto aspect-[4/3] w-full max-w-lg object-contain"
                />
              </div>

              <div className="objective-copy">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {objective.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                  {objective.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
                  {objective.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sec2;
