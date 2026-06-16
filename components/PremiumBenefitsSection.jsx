"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Unlimited Resume Analyses",
    description: "Analyze your resume as many times as you want without restrictions.",
    icon: "infinity",
  },
  {
    title: "Top Company Job Descriptions",
    description: "Compare your resume with job descriptions from leading companies.",
    icon: "building",
  },
  {
    title: "Detailed Recommendations",
    description: "Get actionable suggestions to improve your resume.",
    icon: "sparkles",
  },
  {
    title: "Resume History",
    description: "Access previously generated reports anytime.",
    icon: "history",
  },
  {
    title: "Priority Access",
    description: "Enjoy premium features and a smoother experience.",
    icon: "rocket",
  },
  {
    title: "Early Access Features",
    description: "Try upcoming Resume Lens features before everyone else.",
    icon: "star",
  },
];

function FeatureIcon({ icon }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    "aria-hidden": true,
  };

  switch (icon) {
    case "infinity":
      return (
        <svg {...common}>
          <path d="M18.5 8.5c-2.8 0-4.6 3-6.5 5s-3.7 5-6.5 5a4.5 4.5 0 1 1 0-9c2.8 0 4.6 3 6.5 5s3.7 5 6.5 5a4.5 4.5 0 1 0 0-9Z" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V6.8a1 1 0 0 1 .63-.93l7-2.8a1 1 0 0 1 1.37.93V21" />
          <path d="M12 8h6a2 2 0 0 1 2 2v11" />
          <path d="M8 9h.01M8 12h.01M8 15h.01M8 18h.01M14 13h.01M14 16h.01M18 13h.01M18 16h.01" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3l1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2L6.5 8.5l4.2-1.3L12 3Z" />
          <path d="M19 12l.7 2.1L22 15l-2.3.9L19 18l-.7-2.1L16 15l2.3-.9L19 12Z" />
          <path d="M5 14l.8 2.5L8 17.2l-2.2.7L5 20l-.8-2.1L2 17.2l2.2-.7L5 14Z" />
        </svg>
      );
    case "history":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M14 4c2.8 0 5 2.2 5 5 0 3.5-2.2 6.9-6.1 9.2l-2.4 1.4-.9-2.6-2.6-.9 1.4-2.4C10.1 6.2 13.5 4 17 4c0 0-1.2 3.4-3 5.2" />
          <path d="M6.5 17.5 3 21l3.5-1 1-3.5" />
          <path d="M15.5 9.5h0" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.5 14.8 9l6.1.9-4.4 4.3 1 6.1-5.5-2.9-5.5 2.9 1-6.1-4.4-4.3 6.1-.9L12 3.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PremiumBenefitsSection() {
  const sectionRef = useRef(null);
  const badgeShineRef = useRef(null);
  const ctaRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(section, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      gsap.from(section.querySelectorAll("[data-premium-copy] > *"), {
        opacity: 0,
        y: 22,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      gsap.from(section.querySelectorAll("[data-premium-card]"), {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
        },
      });

      if (badgeShineRef.current) {
        gsap.to(badgeShineRef.current, {
          xPercent: 320,
          opacity: 0.9,
          duration: 1.15,
          repeat: -1,
          repeatDelay: 3.75,
          ease: "power2.inOut",
        });
      }

      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          scale: 1.02,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center center",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden px-4 py-20 text-slate-100 sm:px-6 lg:px-8 lg:py-24 bg-[#040407]"
      style={{ backgroundColor: '#040407' }}
    >
      {/* TIGHT AMBIENT BACKDROP: Matches the exact glow logic used behind your laptop graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-[50px] mix-blend-screen" />
        
        {/* Subtle texture layout overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), 
                              linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* SECTION HEADER BLOCK */}
        <div className="mb-14 text-center sm:mb-16" data-premium-copy>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.02] px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 backdrop-blur-sm">
            Exclusive System Tiers
          </div>
          <h2 className="mt-6 bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl leading-[1.15]">
            Unlock Premium
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg">
            Take your resume analysis experience to the next level.
          </p>
        </div>

        {/* CONTAINER SHELL DYNAMICS */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.04] bg-[#0c0c0e]/40 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Premium Metallic Token Badge */}
          <div className="absolute right-5 top-5 sm:right-6 sm:top-6">
            <div className="relative overflow-hidden rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-slate-950 shadow-[0_10px_30px_rgba(251,191,36,0.15)]">
              <span ref={badgeShineRef} className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0" />
              <span className="relative">PREMIUM</span>
            </div>
          </div>

          <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  data-premium-card
                  className="group rounded-2xl border border-white/[0.04] bg-[#111115]/80 px-5 py-6 shadow-[0_12px_35px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-700/50 hover:bg-[#141419]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#070709] text-zinc-300 transition-colors duration-300 group-hover:border-zinc-600 group-hover:text-white">
                    <FeatureIcon icon={feature.icon} />
                  </div>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                ref={ctaRef}
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_18px_40px_rgba(79,70,229,0.25)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                Upgrade Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}