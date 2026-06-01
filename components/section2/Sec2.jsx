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
      x: "-100vw",          // extreme left
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 80%",   // when element enters viewport
        end: "top 40%",
        scrub: false,       // smooth but not tied to scroll speed
      },
    });

    // RIGHT → comes from extreme right
    gsap.from(rightRef.current, {
      x: "100vw",           // extreme right
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rightRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: false,
      },
    });
  }, []);
  return (
    <div className=' min-h-screen w-full flex flex-col text-stone-400 mt-20 gap-30'>
      <div className='flex flex-col gap-3 items-center md:grid md:grid-cols-2 md:h-70  '>
          <img src='/img1.png' className='h-100 w-150 justify-self-center'></img>

        <div className='justify-self-center  ' ref={rightRef}>
          <h1 className='text-2xl text-white'>The most advanced resume checker, powered by AI</h1>
          <h5 className='text-start p-3 md:p-5'>Score My Resume goes beyond basic spell checking and uses leading Artificial Intelligence technology to grade your resume on 20+ resume checks that recruiters and hiring managers pay attention to. Specifically, the platform analyzes your resume impact by evaluating the strength of your word choice, and also checks your resume style and brevity.

<br/><br/>Similarly, it also scores each of the bullet points on your resume and checks for key elements such as inconsistencies, length, word choice, filler words, keywords and buzzwords.</h5>
        </div>
        
      
      
    </div>
    <div className='flex flex-col gap-3 items-center md:grid md:grid-cols-2 md:h-70 ml-10  '>
        
        <div className='justify-self-center '>
          <h1 className='text-2xl text-white'>The most advanced resume checker, powered by AI</h1>
          <h5 className='text-start p-3 md:p-5' ref={leftRef}>Score My Resume goes beyond basic spell checking and uses leading Artificial Intelligence technology to grade your resume on 20+ resume checks that recruiters and hiring managers pay attention to. Specifically, the platform analyzes your resume impact by evaluating the strength of your word choice, and also checks your resume style and brevity.

<br/><br/>Similarly, it also scores each of the bullet points on your resume and checks for key elements such as inconsistencies, length, word choice, filler words, keywords and buzzwords.</h5>
        </div>
        <img src='/img1.png ' className='h-100 w-150 justify-self-center'></img>
      
      
    </div>
    </div>
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