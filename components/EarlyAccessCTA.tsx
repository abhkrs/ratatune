"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";

interface EarlyAccessCTAProps {
  onCtaClick: () => void;
}

export default function EarlyAccessCTA({ onCtaClick }: EarlyAccessCTAProps) {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-28 md:py-36 bg-bg-deep overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52, 211, 153, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="tag mb-6 inline-flex">Pre-launch access</span>
          <h2 className="display-text text-[clamp(1.5rem,4vw,2.75rem)] leading-[0.98] text-text-primary mb-6">
            Be among the first
            <br />
            <span className="italic font-display font-medium text-accent-emerald">
              to try bend accuracy.
            </span>
          </h2>
          <p className="text-lg text-text-secondary leading-[1.65] mb-10 max-w-xl mx-auto">
            Ratatune is currently in pre-launch development. Leave your email
            to get notified as soon as early access opens.
          </p>
          <button onClick={onCtaClick} className="btn-primary group text-base">
            Get Early Access
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}