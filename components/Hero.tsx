"use client";

import { useEffect, useRef } from "react";
import BendReadout from "./BendReadout";
import CTAButton from "./CTAButton";

const BAR_COUNT = 120;

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Each bar has its own phase offset and speed — like separate frequency bands
    const phases  = Array.from({ length: BAR_COUNT }, () => Math.random() * Math.PI * 2);
    const speeds  = Array.from({ length: BAR_COUNT }, () => 0.012 + Math.random() * 0.025);
    // Amplitude envelope: taller in the middle, shorter at edges
    const amps    = Array.from({ length: BAR_COUNT }, (_, i) => {
      const x = i / (BAR_COUNT - 1);
      // bell curve envelope so edges are quiet
      return 0.15 + 0.85 * Math.exp(-Math.pow((x - 0.5) * 2.6, 2));
    });

    let raf: number;

    function tick() {
      for (let i = 0; i < BAR_COUNT; i++) {
        phases[i] += speeds[i];

        // Each bar: blend of 3 harmonics at that bar's phase
        const h1 = Math.sin(phases[i]);
        const h2 = Math.sin(phases[i] * 2.3 + 1.1) * 0.5;
        const h3 = Math.sin(phases[i] * 0.5 + 2.7) * 0.3;
        const raw = (h1 + h2 + h3) / 1.8; // -1 → +1

        // Map to height with amplitude envelope
        const height = 6 + amps[i] * ((raw + 1) / 2) * 88;

        const el = barsRef.current[i];
        if (el) el.style.height = `${height}%`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center section overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 0%, rgba(52, 211, 153, 0.10) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(245, 158, 11, 0.06) 0%, transparent 55%)",
        }}
      />

      {/* Faint musical staff lines, decorative only */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 28px, #f0f4f8 28px, #f0f4f8 29px)",
        }}
      />

      {/* Audio wave visualization - subtle background decoration */}
      

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Copy — 7 cols, asymmetric */}
          <div className="lg:col-span-7 pt-2 lg:pt-10">
            <div className="hero-enter-1 flex items-center gap-3 mb-8">
              <span className="section-label" style={{ marginBottom: 0 }}>Pre-launch</span>
            </div>

            <h1 className="hero-enter-2 section-head hero">
              Hear whether your bends are <span className="highlight">actually in tune.</span>
            </h1>

            <p className="hero-enter-3 section-body hero">
              Ratatune listens through your microphone, isolates the bend you
              just played, and returns the exact pitch you reached - measured in
              cents against the target. No more guessing whether you landed.
            </p>

            <div className="hero-enter-3 flex flex-wrap items-center gap-5">
              <CTAButton onClick={onCtaClick} size="lg">
                Get Early Access
              </CTAButton>
              <CTAButton
                variant="ghost"
                onClick={() => {
                  document.getElementById("bend-accuracy")?.scrollIntoView({ behavior: "smooth" });
                }}
                size="sm"
              >
                See it in action
              </CTAButton>
            </div>

          </div>

          {/* Right: Product UI — 5 cols, slightly raised */}
          <div className="hero-enter-4 lg:col-span-5 lg:sticky lg:top-24">
            <BendReadout />
          </div>
        </div>
      </div>

      {/* Natural sound wave visualization - bar style */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 lg:h-32 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex items-end" style={{ gap: "2px" }}>
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={el => { barsRef.current[i] = el; }}
              className="bg-accent-emerald rounded-t-[1px]"
              style={{ height: "20%", opacity: 0.28, width: "1px", flexShrink: 0, flexGrow: 1, minWidth: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}