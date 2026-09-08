"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BeforeAfter() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [progress, setProgress] = useState({ before: 0, after: 0 });

  useEffect(() => {
    if (!isVisible) return;
    
    // Animate before bar to 28%
    const beforeInterval = setInterval(() => {
      setProgress(prev => {
        if (prev.before >= 28) return prev;
        return { ...prev, before: prev.before + 1 };
      });
    }, 30);

    // Animate after bar to 2% (delayed)
    const afterTimeout = setTimeout(() => {
      const afterInterval = setInterval(() => {
        setProgress(prev => {
          if (prev.after >= 2) return prev;
          return { ...prev, after: prev.after + 1 };
        });
      }, 30);
      return () => clearInterval(afterInterval);
    }, 800);

    return () => {
      clearTimeout(afterTimeout);
      clearInterval(beforeInterval);
    };
  }, [isVisible]);

  return (
    <section id="before-after" className="relative bg-bg-deep overflow-hidden section">
      <div className="section-container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div
            className={`lg:col-span-3 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-label">Practice progression</span>
          </div>
          <div
            className={`lg:col-span-9 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="section-head mb-5 text-balance">
              From guesswork to <span className="highlight">informed adjustment.</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl">
              The value is not just in seeing a number. It is knowing what
              to change on the very next attempt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Before card */}
          <div
            className={`panel-card transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-faint">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-coral/30 opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-coral" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral">
                    First attempt
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
                  Bend −2 st
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Target</span>
                  <span className="measurement-font text-lg font-bold text-text-primary">−2.00</span>
                  <span className="measurement-font text-base text-text-secondary">st</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Actual</span>
                  <span className="measurement-font text-lg font-bold text-accent-coral">−1.72</span>
                  <span className="measurement-font text-base text-accent-coral/70">st</span>
                </div>

                <div className="pt-4 border-t border-border-faint">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Error</span>
                    <span className="measurement-font text-lg font-bold text-accent-coral">+28¢</span>
                    <span className="measurement-font text-base text-accent-coral/70">flat</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full overflow-hidden bg-bg-base border border-border-faint">
                    <div 
                      className="h-full bg-accent-coral rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress.before}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] font-mono text-text-tertiary uppercase tracking-wider">
                    <span>0¢</span>
                    <span>100¢</span>
                    <span>200¢</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow between cards */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className={`w-10 h-10 rounded-full bg-bg-elev-1 border border-border-faint flex items-center justify-center transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-180"
            }`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-secondary">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* After card */}
          <div
            className={`panel-card transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] md:mt-0 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-faint">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald/30 opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-emerald">
                    After adjustment
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
                  Bend −2 st
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Target</span>
                  <span className="measurement-font text-lg font-bold text-text-primary">−2.00</span>
                  <span className="measurement-font text-base text-text-secondary">st</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Actual</span>
                  <span className="measurement-font text-lg font-bold text-text-primary">−1.98</span>
                  <span className="measurement-font text-base text-text-secondary">st</span>
                </div>

                <div className="pt-4 border-t border-border-faint">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Error</span>
                    <span className="measurement-font text-lg font-bold text-accent-emerald">+2¢</span>
                    <span className="measurement-font text-base text-accent-emerald/70">sharp</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full overflow-hidden bg-bg-base border border-border-faint">
                    <div 
                      className="h-full bg-accent-emerald rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress.after}%`, transitionDelay: "800ms" }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] font-mono text-text-tertiary uppercase tracking-wider">
                    <span>0¢</span>
                    <span>100¢</span>
                    <span>200¢</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-text-tertiary font-mono tracking-wider">
          Visual demonstration — not actual user data
        </p>
      </div>
    </section>
  );
}