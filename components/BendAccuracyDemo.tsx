"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PitchVisualizer from "./PitchVisualizer";

export default function BendAccuracyDemo() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="bend-accuracy" className="relative py-32 md:py-44 bg-bg-deep overflow-hidden">
      <div className="section-container relative z-10" ref={ref}>
        {/* Tag + text in one row, matching HowItWorks pattern */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div
            className={`lg:col-span-3 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-label">Bend Accuracy Demo</span>
          </div>
          <div
            className={`lg:col-span-9 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="section-head mb-6 text-balance">
              See the bend. <span className="highlight">Not just the score.</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl">
              A bend isn&apos;t simply right or wrong. Ratatune shows you how
              the note landed compared with the target pitch.
            </p>
          </div>
        </div>

        {/* Infographic in next row, centered */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`panel-card transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"
            }`}
          >
            <PitchVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}