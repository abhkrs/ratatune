"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface EarlyAccessCTAProps {
  onCtaClick: () => void;
}

export default function EarlyAccessCTA({ onCtaClick }: EarlyAccessCTAProps) {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-32 md:py-44 bg-bg-deep overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(52, 211, 153, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div
            className={`lg:col-span-3 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-label">Early access</span>
          </div>
          <div
            className={`lg:col-span-9 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="section-head mb-5 text-balance">
              Be among the first to
              <br />
              <span className="highlight">try bend accuracy.</span>
            </h2>
          <p className="section-body">
              Ratatune is currently in pre-launch development. Leave your email
              to get notified as soon as early access opens.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onCtaClick}
            className={`btn-magnetic text-base transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Get Early Access
            <span className="btn-icon-wrap">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}