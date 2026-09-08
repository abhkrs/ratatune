"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BeforeAfter() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-28 md:py-36 bg-bg-base border-y border-border-faint">
      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <div
          className={`max-w-3xl mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="tag">
            Practice progression
          </span>
          <h2 className="display-text text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.02] text-text-primary mb-6">
            From guesswork
            <br />
            to informed adjustment
          </h2>
          <p className="text-lg text-text-secondary leading-[1.7] max-w-2xl">
            The value isn&apos;t just in seeing a number &mdash; it&apos;s knowing what
            to change on the very next attempt.
          </p>
        </div>

        {/* Before/After cards - full width grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="relative overflow-hidden">
            <div className="stripe-top" style={{ "--stripe-color": "#ff7a5b" } as React.CSSProperties}>
              <div className="panel-ticked p-6 md:p-8 h-full">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-faint">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-coral/30 opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-coral" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent-coral">
                      First attempt
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                    Bend −2 st
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                      Target
                    </span>
                    <span className="measurement-font text-lg font-bold text-text-primary">
                      −2.00
                    </span>
                    <span className="measurement-font text-base text-text-secondary">st</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-5">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                      Actual
                    </span>
                    <span className="measurement-font text-lg font-bold text-accent-coral">
                      −1.72
                    </span>
                    <span className="measurement-font text-base text-accent-coral/70">st</span>
                  </div>

                  <div className="pt-4 border-t border-border-faint">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                        Error
                      </span>
                      <span className="measurement-font text-lg font-bold text-accent-coral">
                        +0.28
                      </span>
                      <span className="measurement-font text-base text-accent-coral/70">st</span>
                    </div>

                    {/* Visual error bar */}
                    <div className="mt-3 h-1.5 rounded-sm overflow-hidden border border-border-faint">
                      <div
                        className="h-full bg-gradient-to-r from-accent-coral to-ff7a5b rounded-full"
                        style={{ width: "28%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="relative overflow-hidden">
            <div className="stripe-top" style={{ "--stripe-color": "#34d399" } as React.CSSProperties}>
              <div className="panel-ticked p-6 md:p-8 h-full">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-faint">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald/30 opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent-emerald">
                      After adjustment
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                    Bend −2 st
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                      Target
                    </span>
                    <span className="measurement-font text-lg font-bold text-text-primary">
                      −2.00
                    </span>
                    <span className="measurement-font text-base text-text-secondary">st</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-5">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                      Actual
                    </span>
                    <span className="measurement-font text-lg font-bold text-text-primary">
                      −1.98
                    </span>
                    <span className="measurement-font text-base text-text-secondary">st</span>
                  </div>

                  <div className="pt-4 border-t border-border-faint">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
                        Error
                      </span>
                      <span className="measurement-font text-lg font-bold text-text-primary">
                        +0.02
                      </span>
                      <span className="measurement-font text-base text-text-secondary">st</span>
                    </div>

                    {/* Visual error bar */}
                    <div className="mt-3 h-1.5 rounded-sm overflow-hidden border border-border-faint">
                      <div
                        className="h-full bg-gradient-to-r from-text-primary to-accent-emerald rounded-full"
                        style={{ width: "2%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <p className="mt-10 text-center text-xs text-text-tertiary">
          Visual demonstration — not actual user data
        </p>
      </div>
    </section>
  );
}