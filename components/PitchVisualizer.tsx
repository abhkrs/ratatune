"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BendTarget {
  label: string;
  target: number;
  detected: number;
  difference: number;
  centsReading: string;
}

const bendTargets: BendTarget[] = [
  {
    label: "Hole 4 / −1st",
    target: -1,
    detected: -0.95,
    difference: 0.05,
    centsReading: "5¢ sharp",
  },
  {
    label: "Hole 4 / −2st",
    target: -2,
    detected: -1.97,
    difference: 0.03,
    centsReading: "3¢ flat",
  },
  {
    label: "Hole 3 / −3st",
    target: -3,
    detected: -2.7,
    difference: 0.3,
    centsReading: "4.1¢ flat",
  },
];

export default function PitchVisualizer() {
  const { isVisible } = useScrollAnimation(0.2);
  const [selectedTarget, setSelectedTarget] = useState(1);

  const current = bendTargets[selectedTarget];
  const targetPos = 50;
  const detectedPos = targetPos + current.difference * 8;

  return (
    <div className="panel-card p-6 md:p-10">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border-faint">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-secondary">
            Pitch analysis · Interactive
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary">
          A4 = 440 Hz
        </span>
      </div>

      {/* Target Selector */}
      <div className="mb-10">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary mb-3">
          Select a bend
        </div>
        <div className="flex flex-wrap gap-2">
          {bendTargets.map((target, index) => (
            <button
              key={target.label}
              onClick={() => setSelectedTarget(index)}
              className={`group relative px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] transition-all duration-200 ${selectedTarget === index
                  ? "bg-accent-emerald text-[#04130c]"
                  : "bg-bg-elev-1 text-text-secondary hover:text-text-primary border border-border-faint hover:border-border-soft"
                }`}
              aria-pressed={selectedTarget === index}
            >
              {target.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main visualization area */}
      <div className="grid lg:grid-cols-3 gap-px bg-border-faint border border-border-faint">
        <div className="bg-bg-elev-1 p-6">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary mb-3">
            Target pitch
          </div>
          <div className="flex items-baseline gap-2">
            <div className="measurement-font text-5xl font-bold text-text-primary leading-none">
              {current.target}
            </div>
            <div className="measurement-font text-base text-text-secondary pb-2">st</div>
          </div>
          <div className="mt-3 font-mono text-xs text-text-secondary">
            100 cents = 1 semitone
          </div>
        </div>
        <div className="bg-bg-elev-1 p-6">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary mb-3">
            Detected pitch
          </div>
          <div className="flex items-baseline gap-2">
            <div className="measurement-font text-5xl font-bold text-accent-coral leading-none transition-all duration-500">
              {current.detected}
            </div>
            <div className="measurement-font text-base text-accent-coral/70 pb-2">st</div>
          </div>
          <div className="mt-3 font-mono text-xs text-text-secondary">
            From your last bend
          </div>
        </div>
        <div className="bg-bg-elev-1 p-6">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary mb-3">
            Difference
          </div>
          <div className="flex items-baseline gap-2">
            <div className="measurement-font text-5xl font-bold text-accent-coral leading-none transition-all duration-500">
              {current.difference > 0 ? "+" : ""}
              {current.difference.toFixed(2)}
            </div>
            <div className="measurement-font text-base text-accent-coral/70 pb-2">st</div>
          </div>
          <div className="mt-3 font-mono text-xs text-accent-coral">
            {current.centsReading}
          </div>
        </div>
      </div>

      {/* Pitch Line Visualization */}
      <div className="mt-10">
        <div className="flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary mb-4">
          <span>−3 st</span>
          <span>−2 st</span>
          <span>−1 st</span>
          <span>0</span>
        </div>

        <div className="relative h-24 border-y border-border-faint">
          {/* Background graduated line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border-soft -translate-y-1/2" />
          {[0, 16.66, 33.33, 50, 66.66, 83.33, 100].map((pos) => (
            <div
              key={pos}
              className="absolute top-1/2 h-3 w-px bg-border-faint -translate-y-1/2"
              style={{ left: `${pos}%` }}
            />
          ))}

          {/* Target zone */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-12 bg-accent-emerald/[0.08] border-l border-r border-accent-emerald/30"
            style={{ left: `${targetPos - 2}%`, width: "4%" }}
          />

          {/* Target marker */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            style={{ left: `${targetPos}%` }}
          >
            <div className="relative -translate-x-1/2">
              <div className="w-3 h-3 bg-text-primary rotate-45" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-primary bg-bg-elev-1 px-2 py-1 border border-border-faint">
                  Target
                </span>
              </div>
            </div>
          </div>

          {/* Detected marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-700"
            style={{ left: `${detectedPos}%` }}
          >
            <div className="relative -translate-x-1/2">
              <div className="w-4 h-4 bg-accent-coral rotate-45 animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent-coral bg-bg-elev-1 px-2 py-1 border border-accent-coral/40">
                  Your note
                </span>
              </div>
            </div>
          </div>

          {/* Difference bracket */}
          <div
            className="absolute top-1/2 translate-y-6 transition-all duration-500"
            style={{
              left: `${Math.min(targetPos, detectedPos)}%`,
              width: `${Math.abs(detectedPos - targetPos)}%`,
            }}
          >
            <div className="border-t border-l border-r border-accent-coral/40 h-3" />
            <div className="text-center mt-1">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent-coral">
                {current.centsReading}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}