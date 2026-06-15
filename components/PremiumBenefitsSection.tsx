"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PremiumFeature = {
  title: string;
  description: string;
  icon: "infinity" | "building" | "sparkles" | "history" | "rocket" | "star";
};

const features: PremiumFeature[] = [
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

function FeatureIcon({ icon }: { icon: PremiumFeature["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeShineRef = useRef<HTMLSpanElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

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
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-950 px-4 py-20 text-slate-100 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.12)_0%,_rgba(15,23,42,0)_68%)]" />
        <div className="absolute bottom-0 right-0 h-[20rem] w-[20rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(148,163,184,0.08)_0%,_rgba(15,23,42,0)_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-12" data-premium-copy>
          <h2 className="bg-gradient-to-r from-white via-slate-200 to-cyan-200 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Unlock Premium
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Take your resume analysis experience to the next level.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/50 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="absolute right-5 top-5 sm:right-6 sm:top-6">
            <div className="relative overflow-hidden rounded-full border border-amber-300/30 bg-gradient-to-r from-amber-400/90 via-yellow-300/90 to-amber-500/90 px-4 py-2 text-[11px] font-semibold tracking-[0.32em] text-slate-950 shadow-[0_10px_30px_rgba(251,191,36,0.12)]">
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
                  className="group rounded-2xl border border-slate-800 bg-slate-900 px-5 py-6 shadow-[0_12px_35px_rgba(2,6,23,0.28)] transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-950 text-slate-100 transition-colors duration-300 group-hover:border-slate-600 group-hover:text-white">
                    <FeatureIcon icon={feature.icon} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center sm:mt-12">
              <button
                ref={ctaRef}
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.24)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
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