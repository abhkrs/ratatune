"use client";

import BendReadout from "./BendReadout";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 pb-24 overflow-hidden">
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

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Copy — 7 cols, asymmetric */}
          <div className="lg:col-span-7 pt-2 lg:pt-10">
            <div className="hero-enter-1 flex items-center gap-3 mb-8">
              <span className="section-label" style={{ marginBottom: 0 }}>Pre-launch</span>
            </div>

            <h1 className="hero-enter-2 section-head" style={{ marginBottom: "2rem", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Hear whether
              <br />
              your bends are <span className="highlight">actually in tune.</span>
            </h1>

            <p className="hero-enter-3 section-body" style={{ fontSize: "1.125rem", marginBottom: "2.5rem" }}>
              Ratatune listens through your microphone, isolates the bend you
              just played, and returns the exact pitch you reached - measured in
              cents against the target. No more guessing whether you landed.
            </p>

            <div className="hero-enter-3 flex flex-wrap items-center gap-5">
              <button onClick={onCtaClick} className="btn-primary group">
                Get Early Access
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => {
                  document.getElementById("bend-accuracy")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-ghost font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
              >
                See it in action ↓
              </button>
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
