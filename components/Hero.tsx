"use client";

import BendReadout from "./BendReadout";
import CTAButton from "./CTAButton";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]">
          <div className="flex items-end justify-center gap-[2px] h-full px-4">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-accent-emerald rounded-t-sm"
                style={{
                  height: `${30 + Math.sin(i * 0.3) * 40}%`,
                  animation: `audio-wave ${1.2 + (i % 5) * 0.2}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.04}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Copy — 7 cols, asymmetric */}
          <div className="lg:col-span-7 pt-2 lg:pt-10">
            <div className="hero-enter-1 flex items-center gap-3 mb-8">
              <span className="section-label" style={{ marginBottom: 0 }}>Pre-launch</span>
            </div>

            <h1 className="hero-enter-2 section-head hero">
              Hear whether
              <br />
              your bends are <span className="highlight">actually in tune.</span>
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
    </section>
  );
}