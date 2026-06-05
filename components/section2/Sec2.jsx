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
// </div>
//       <div className='flex flex-col gap-3 items-center md:grid md:grid-col-2 mt-10'>
//         <img src='/green.png ' className='h-50 w-50'></img>
//         <div>
//           <h1 className='text-2xl text-white'>Designed by hiring managers</h1>
//           <h5>Our online resume grader provides better resume feedback than most so-called 'professional' reviewers out there, who often give outdated, wrong or non-actionable advice and charge hundreds of dollars.

// The feedback in your resume review has been curated by current hiring managers and recruiters at companies like Google, McKinsey and Goldman Sachs.

// We know this works.</h5>
//         </div>
        
//       </div>
//       <div className='flex flex-col gap-3 items-center md:grid md:grid-col-2 mt-10'>
//         <img src='/green.png ' className='h-50 w-50'></img>
//         <div>
//           <h1 className='text-2xl text-white'>Smart resume suggestions and examples from top resumes</h1>
//           <h5>We recognise how tough it can be to put your experiences into concise, effective lines.

// This is why we even give you handpicked resume lines and metrics that top candidates have used on their resumes.

// Stuck on how to describe your experiences? Our AI features transform your old lines into polished, professional bullet points. It's like having a resume expert by your side, guiding you on how to best present your skills and achievements.

// Use these tools as inspiration or let the AI do the heavy lifting when you're unsure how to phrase your accomplishments.</h5>
//         </div>
        
//       </div>
//       <div className='flex flex-col gap-3 items-center md:grid md:grid-col-2 mt-10'>
//         <img src='/green.png ' className='h-50 w-50'></img>
//         <div>
//           <h1 className='text-2xl text-white'>Improve your resume's score</h1>
//           <h5>We use Artificial Intelligence to analyze and benchmark your resume and generate a detailed assessment and score based on key evaluation criteria such as Impact, Brevity and Style. Our criteria are based on key checks recruiters look for.

// Incorporate the feedback we give you to improve your resume's score and your chances of getting that interview.</h5>
//         </div>
      
//     </div>
//     <div className='flex flex-col gap-3 items-center md:grid md:grid-col-2 mt-10'>
//         <img src='/green.png ' className='h-50 w-50'></img>
//         <div>
//           <h1 className='text-2xl text-white'>What our resume checker looks for</h1>
//           <h5>Here are some of the things the checker examines your resume for:

// - ATS resume compatibility: Score My Resume analyzes your resume's template and checks whether it is compatible with ATS (resume scanners).
// - Resume and bullet point length: Brevity is key when it comes to a resume.
// - Resume action verbs: Recruiters and resume reviewers are looking for evidence of impact on your resume. Score My Resume checks to make sure that you've used strong action verbs as well as other indicators of a strong impact-oriented resume.
// - Plus over 25 additional free resume checks. See our resume checklist for examples of additional checks recruiters look for.</h5>
//         </div>
      
//     </div>
//     <div className='flex flex-col gap-3 items-center md:grid md:grid-col-2 mt-10'>
//         <img src='/green.png ' className='h-50 w-50'></img>
//         <div>
//           <h1 className='text-2xl text-white'>Personalized, actionable advice</h1>
//           <h5>Most advice online is terribly generic and unhelpful, saying, “Be impactful!” or “Don’t be vague” (how ironic). These are statements that only become helpful when they are explained in context of your resume.

// Unlike any other tool, our resume checker identifies gaps on your resume and gives you a detailed assessment of your resume, which contains tailored advice on how to improve it, backed up with insights from recruiters and examples from other candidates. Plus, you'll also get rewritten lines that you can use on your resume.</h5>
//         </div>
      
//     </div>
//     <div className='flex flex-col gap-3 items-center md:grid md:grid-col-2 mt-10'>
//         <img src='/green.png ' className='h-50 w-50'></img>
//         <div>
//           <h1 className='text-2xl text-white'>How does our resume checker work?</h1>
//           <h5>To create this product, we spent thousands of hours speaking with recruiters and hiring managers at top companies like Google and McKinsey. We've found out exactly what they look for when they review resumes. We then spent the next two years working with data scientists and software engineers to create this resume checker.
// It uses machine learning and artificial intelligence to scan your resume for the most important elements resume reviewers and hiring managers specifically keep an eye out for.</h5>
//         </div>