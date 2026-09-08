"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ProblemSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative bg-bg-base overflow-hidden section">
      <div className="section-container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className={`lg:col-span-3 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="section-label">The problem</span>
          </div>
          <div className={`lg:col-span-9 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="section-head mb-5 text-balance">
              You can hear the bend, but can you tell
              <br />
              <span className="highlight">exactly where it landed?</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl">
              Bending is changing the pitch of a note through breath and mouth
              shape - not a hole or button. The hard part is quantifying how
              far the note moved.
            </p>
            <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl mt-4">
              When you are practicing, &ldquo;that sounds a little off&rdquo;
              is not enough. You need the precise distance between your
              note and the target.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`panel-card p-6 md:p-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-faint">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary">Pitch trace</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">1200 ms</span>
            </div>

            <div className="relative h-48">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-text-secondary/25" />
              <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-2">
                <span className="w-2 h-2 bg-text-primary" />
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-secondary">Target -2 st</span>
              </div>

              <div className="absolute inset-y-0 left-0 right-0 flex justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-px h-full bg-border-faint" />
                ))}
              </div>

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="bendGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff7a5b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ff7a5b" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5 35 L 18 42 L 32 48 L 46 58 L 60 64 L 74 72 L 88 78 L 96 80"
                  fill="none"
                  stroke="url(#bendGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className={`transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                />
              </svg>

              <div className={`absolute top-[80%] right-[2%] -translate-y-1/2 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 bg-accent-coral rotate-45" />
                </div>
                <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.16em] uppercase text-accent-coral whitespace-nowrap">Your bend</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-faint grid grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary mb-2">Detected</div>
                <div className="measurement-font text-2xl font-bold text-text-primary">-1.97<span className="text-sm text-text-secondary ml-1">st</span></div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary mb-2">Difference</div>
                <div className="measurement-font text-2xl font-bold text-accent-coral">+0.03<span className="text-sm text-accent-coral/70 ml-1">st</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}