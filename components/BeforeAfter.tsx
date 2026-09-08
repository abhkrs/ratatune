"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BeforeAfter() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-32 md:py-44 bg-bg-deep overflow-hidden">
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
            <h2 className="display-text text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] text-text-primary mb-5 text-balance">
              From guesswork
              <br />
              to informed adjustment
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl">
              The value is not just in seeing a number. It is knowing what
              to change on the very next attempt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div
            className={`panel-card transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
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
                  Bend -2 st
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Target</span>
                  <span className="measurement-font text-lg font-bold text-text-primary">-2.00</span>
                  <span className="measurement-font text-base text-text-secondary">st</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Actual</span>
                  <span className="measurement-font text-lg font-bold text-accent-coral">-1.72</span>
                  <span className="measurement-font text-base text-accent-coral/70">st</span>
                </div>

                <div className="pt-4 border-t border-border-faint">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Error</span>
                    <span className="measurement-font text-lg font-bold text-accent-coral">+0.28</span>
                    <span className="measurement-font text-base text-accent-coral/70">st</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-sm overflow-hidden border border-border-faint">
                    <div className="h-full bg-accent-coral rounded-full" style={{ width: "28%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`panel-card transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "450ms" }}
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
                  Bend -2 st
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Target</span>
                  <span className="measurement-font text-lg font-bold text-text-primary">-2.00</span>
                  <span className="measurement-font text-base text-text-secondary">st</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Actual</span>
                  <span className="measurement-font text-lg font-bold text-text-primary">-1.98</span>
                  <span className="measurement-font text-base text-text-secondary">st</span>
                </div>

                <div className="pt-4 border-t border-border-faint">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">Error</span>
                    <span className="measurement-font text-lg font-bold text-text-primary">+0.02</span>
                    <span className="measurement-font text-base text-text-secondary">st</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-sm overflow-hidden border border-border-faint">
                    <div className="h-full bg-accent-emerald rounded-full" style={{ width: "2%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-text-tertiary font-mono tracking-wider">
          Visual demonstration - not actual user data
        </p>
      </div>
    </section>
  );
}