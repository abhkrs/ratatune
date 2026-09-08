"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mic, Radio, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Mic,
    label: "Play",
    description: "Play the bend as you normally would.",
  },
  {
    number: "02",
    icon: Radio,
    label: "Capture",
    description: "Ratatune isolates the note and reads its pitch.",
  },
  {
    number: "03",
    icon: BarChart3,
    label: "Compare",
    description: "See the difference from target, in cents.",
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="how-it-works" className="relative py-28 md:py-36 bg-bg-deep overflow-hidden">
      {/* Background detail */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f0f4f8 0px, #f0f4f8 1px, transparent 1px, transparent 14px)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header — asymmetric */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div
            className={`lg:col-span-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <span className="tag" >
              The Process
            </span>
          </div>
          <div
            className={`lg:col-span-9 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2 className="display-text text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.02] text-text-primary mb-6">
              Ratatune tells you where
              <br />
              your bend{" "}
              <span className="italic font-display font-medium text-accent-emerald">
                actually landed.
              </span>
            </h2>
            <p className="text-lg text-text-secondary leading-[1.7] max-w-2xl">
              No special microphone. No instrument-specific tuning. Just play
              the bend, and within a moment you&apos;ll know the precise pitch
              you reached compared to where it should have been.
            </p>
          </div>
        </div>

        {/* 3-Step Flow — connected by a horizontal thread */}
        <div className="relative">
          {/* Connecting thread */}
          <div className="hidden lg:block absolute top-[44px] left-[16%] right-[16%] h-px z-0">
            <div
              className={`h-full bg-gradient-to-r from-transparent via-border-soft to-transparent transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${200 + i * 180}ms` }}
                >
                  <div className="flex items-start gap-5">
                    {/* Number + icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-[88px] h-[88px] border border-border-faint bg-bg-elev-1 flex items-center justify-center relative">
                        <Icon className="w-7 h-7 text-accent-emerald stroke-[1.5]" strokeWidth={1.5} />
                        <span className="absolute -top-3 -left-3 font-mono text-xs font-bold bg-accent-emerald text-[#04130c] px-2 py-1 tracking-wider">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-2 flex-1">
                      <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                        {step.label}
                      </h3>
                      <p className="text-base text-text-secondary leading-[1.6]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}