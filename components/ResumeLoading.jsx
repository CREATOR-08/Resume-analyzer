import { useState, useEffect } from "react";

const quotes = [
  { text: "Your resume is your first impression — make it one they cannot ignore.", author: "Career Wisdom" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Success is not final; failure is not fatal. It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
];

const slides = ["💼", "🎯", "🚀", "📊", "🌟", "🏆", "✨"];

const statusLabels = [
  "Parsing sections…",
  "Scoring keywords…",
  "Checking formatting…",
  "Matching roles…",
  "Finalizing insights…",
];

export default function ResumeLoading({ hideStatusBar = false }) {
  const [current, setCurrent] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [statusIdx, setStatusIdx] = useState(0);

  // Rotate quote + icon every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Cycle status label every 2s
  useEffect(() => {
    if (hideStatusBar) return;
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statusLabels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [hideStatusBar]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .rl-root {
          min-height: 100vh;
          width: 100%;
          background: #0c0d12;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .rl-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .rl-glow-top {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,179,237,0.10) 0%, transparent 65%);
          top: 0; left: 50%;
          transform: translateX(-50%) translateY(-30%);
          pointer-events: none;
        }

        .rl-glow-bottom {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%);
          bottom: 0; right: 20%;
          transform: translateY(40%);
          pointer-events: none;
        }

        .rl-card {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 48px 52px;
          max-width: 500px;
          width: 90%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          backdrop-filter: blur(8px);
        }

        /* Logo */
        .rl-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 44px;
        }

        .rl-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #63b3ed 0%, #4facfe 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rl-logo-text {
          font-size: 19px;
          font-weight: 500;
          color: #e2e8f0;
          letter-spacing: 0.01em;
        }

        .rl-badge {
          font-size: 10px;
          font-weight: 500;
          color: #63b3ed;
          background: rgba(99,179,237,0.12);
          border: 1px solid rgba(99,179,237,0.22);
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.07em;
        }

        /* Icon rotator */
        .rl-rotator-wrap {
          position: relative;
          margin-bottom: 28px;
        }

        .rl-icon-circle {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          border: 2px solid rgba(99,179,237,0.35);
          background: rgba(99,179,237,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          position: relative;
          overflow: hidden;
          transition: font-size 0.2s;
        }

        .rl-ring-spin {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1.5px dashed rgba(99,179,237,0.22);
          animation: rl-spin 14s linear infinite;
        }

        .rl-ring-spin-reverse {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 1px dashed rgba(167,139,250,0.15);
          animation: rl-spin 20s linear infinite reverse;
        }

        @keyframes rl-spin {
          to { transform: rotate(360deg); }
        }

        /* Dots */
        .rl-dots {
          display: flex;
          gap: 7px;
          margin-bottom: 36px;
        }

        .rl-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.13);
          transition: background 0.4s ease, transform 0.4s ease;
        }

        .rl-dot.active {
          background: #63b3ed;
          transform: scale(1.35);
        }

        /* Quote */
        .rl-quote-area {
          text-align: center;
          min-height: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .rl-quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          line-height: 0.8;
          color: rgba(99,179,237,0.28);
          align-self: flex-start;
          margin-left: 4px;
        }

        .rl-quote-text {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          line-height: 1.7;
          color: #e2e8f0;
          font-style: italic;
          transition: opacity 0.4s ease, transform 0.4s ease;
          margin: 0;
        }

        .rl-quote-text.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .rl-quote-text.hidden {
          opacity: 0;
          transform: translateY(8px);
        }

        .rl-quote-author {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #63b3ed;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          transition: opacity 0.4s ease 0.15s;
        }

        .rl-quote-author.visible { opacity: 1; }
        .rl-quote-author.hidden { opacity: 0; }

        /* Status */
        .rl-status {
          margin-top: 40px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rl-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #63b3ed;
          animation: rl-pulse 1.4s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes rl-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .rl-status-text {
          font-size: 13px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.04em;
          transition: opacity 0.3s;
        }
      `}</style>

      <div className="rl-root">
        <div className="rl-bg-grid" />
        <div className="rl-glow-top" />
        <div className="rl-glow-bottom" />

        <div className="rl-card">
          {/* Logo */}
          <div className="rl-logo-row">
            <div className="rl-logo-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="2" width="16" height="18" rx="2.5" stroke="white" strokeWidth="1.6" />
                <line x1="7" y1="7" x2="15" y2="7" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="7" y1="10.5" x2="15" y2="10.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="7" y1="14" x2="11" y2="14" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="16" cy="15.5" r="3" fill="#4facfe" stroke="#0c0d12" strokeWidth="0.8" />
                <path d="M14.8 15.5l.9.9 1.5-1.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="rl-logo-text">ResumeIQ</span>
            <span className="rl-badge">AI</span>
          </div>

          {/* Icon rotator */}
          <div className="rl-rotator-wrap">
            <div className="rl-ring-spin-reverse" />
            <div className="rl-ring-spin" />
            <div className="rl-icon-circle">
              {slides[current % slides.length]}
            </div>
          </div>

          {/* Dots */}
          <div className="rl-dots">
            {quotes.map((_, i) => (
              <div key={i} className={`rl-dot${i === current % quotes.length ? " active" : ""}`} />
            ))}
          </div>

          {/* Quote */}
          <div className="rl-quote-area">
            <div className="rl-quote-mark">"</div>
            <p className={`rl-quote-text ${quoteVisible ? "visible" : "hidden"}`}>
              {quotes[current % quotes.length].text}
            </p>
            <span className={`rl-quote-author ${quoteVisible ? "visible" : "hidden"}`}>
              — {quotes[current % quotes.length].author}
            </span>
          </div>

          {!hideStatusBar && (
            <div className="rl-status">
              <div className="rl-pulse-dot" />
              <span className="rl-status-text">{statusLabels[statusIdx]}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}