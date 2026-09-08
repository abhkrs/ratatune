"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PitchVisualizer from "./PitchVisualizer";

const sectionLabel = () => (
  <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent-emerald inline-flex items-center gap-3">
    <span className="w-6 h-px bg-accent-emerald" />
    [04] Bend Accuracy Demo
  </span>
);

export default function BendAccuracyDemo() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="bend-accuracy" className="relative py-28 md:py-36 bg-bg-deep border-y border-border-faint overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(160,70%,50%,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <div
          className={`max-w-3xl mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {sectionLabel()}
          <h2 className="display-text text-[clamp(1.5rem,4vw,2.75rem)] text-text-primary mt-4 mb-4">
            See the bend.{" "}
            <span className="text-text-secondary">Not just the score.</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
            A bend isn&apos;t simply right or wrong. Ratatune shows you how
            the note landed compared with the target pitch.
          </p>
        </div>

        {/* Main Pitch Visualizer */}
        <div className="relative">
          {/* Glow behind */}
          <div className="absolute -inset-6 bg-gradient-to-b from-accent-emerald/5 via-transparent to-accent-coral/5 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative">
            <PitchVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}