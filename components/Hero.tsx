"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BendReadout from "./BendReadout";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-text-secondary">
                [01] / Hero
              </span>
              <span className="h-px w-12 bg-border-soft" />
              <span className="tag">Pre-launch</span>
            </motion.div>

            <motion.h1
              className="display-text text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.1] mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Hear whether
              <br />
              your bends are{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent-emerald">actually in tune.</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-2 bg-accent-emerald/20 -skew-x-6 -z-0"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-text-secondary leading-[1.65] mb-10 max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Ratatune listens through your microphone, isolates the bend you
              just played, and returns the exact pitch you reached — measured in
              cents against the target. No more guessing whether you landed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-5"
            >
              <button onClick={onCtaClick} className="btn-primary group">
                Get Early Access
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => {
                  document.getElementById("bend-accuracy")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-ghost font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
              >
                See it in action ↓
              </button>
            </motion.div>

          </div>

          {/* Right: Product UI — 5 cols, slightly raised */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <BendReadout animate={true} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}