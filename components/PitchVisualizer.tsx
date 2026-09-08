"use client";

import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BendTarget {
  label: string;
  target: number;
  detected: number;
  difference: number;
  centsReading: string;
  color: "coral" | "emerald" | "amber";
}

const bendTargets: BendTarget[] = [
  {
    label: "Hole 4 Draw · −1st",
    target: -1,
    detected: -0.92,
    difference: 0.08,
    centsReading: "8¢ sharp",
    color: "amber",
  },
  {
    label: "Hole 4 Draw · −2st (Full)",
    target: -2,
    detected: -1.97,
    difference: 0.03,
    centsReading: "3¢ flat",
    color: "emerald",
  },
  {
    label: "Hole 3 Draw · −3st",
    target: -3,
    detected: -2.72,
    difference: 0.28,
    centsReading: "28¢ flat",
    color: "coral",
  },
];

const colorMap = {
  coral: { bg: "bg-accent-coral", text: "text-accent-coral", border: "border-accent-coral", glow: "rgba(255, 122, 91" },
  emerald: { bg: "bg-accent-emerald", text: "text-accent-emerald", border: "border-accent-emerald", glow: "rgba(52, 211, 153" },
  amber: { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500", glow: "rgba(245, 158, 11" },
};

export default function PitchVisualizer() {
  const { isVisible } = useScrollAnimation(0.15);
  const [selectedTarget, setSelectedTarget] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [liveDetected, setLiveDetected] = useState<number | null>(null);
  const [liveConfidence, setLiveConfidence] = useState(0);
  const intervalRef = useRef<number>(0);
  const timeoutRef = useRef<number>(0);
  const pitchIntervalRef = useRef<number>(0);
  const simulationRunning = useRef(false);

  const current = bendTargets[selectedTarget];
  const colors = colorMap[current.color];
  const displayDetected = liveDetected !== null ? liveDetected : current.detected;
  const displayDifference = liveDetected !== null ? displayDetected - current.target : current.difference;
  const cents = Math.round(displayDifference * 100);
  const isFlat = cents < 0;

  // Map semitone range (-3.5 to 0) to percentage (5% to 95%)
  const stToPos = (st: number) => ((st + 3.5) / 3.5) * 90 + 5;
  const targetPos = stToPos(current.target);
  const detectedPos = stToPos(displayDetected);

  // Use callback refs to avoid stale closures
  const setIsAnimatingRef = useRef(setIsAnimating);
  const setLiveConfidenceRef = useRef(setLiveConfidence);
  const setLiveDetectedRef = useRef(setLiveDetected);
  
  useEffect(() => {
    setIsAnimatingRef.current = setIsAnimating;
  });
  useEffect(() => {
    setLiveConfidenceRef.current = setLiveConfidence;
  });
  useEffect(() => {
    setLiveDetectedRef.current = setLiveDetected;
  });

  const runSimulation = () => {
    if (simulationRunning.current) return;
    simulationRunning.current = true;
    
    setIsAnimatingRef.current(true);
    setLiveConfidenceRef.current(0);
    setLiveDetectedRef.current(current.target + (Math.random() - 0.5) * 0.8);

    let conf = 0;
    intervalRef.current = window.setInterval(() => {
      conf = Math.min(95, Math.floor(conf + Math.random() * 12 + 3));
      setLiveConfidenceRef.current(conf);
    }, 100);

    let pitch = current.target + (Math.random() - 0.5) * 0.8;
    pitchIntervalRef.current = window.setInterval(() => {
      pitch += (Math.random() - 0.5) * 0.08;
      setLiveDetectedRef.current(Math.max(current.target - 0.5, Math.min(current.target + 0.5, pitch)));
    }, 80);

    timeoutRef.current = window.setTimeout(() => {
      clearInterval(intervalRef.current);
      clearInterval(pitchIntervalRef.current);
      setLiveDetectedRef.current(current.detected);
      setLiveConfidenceRef.current(97);
      setIsAnimatingRef.current(false);
      setLiveDetectedRef.current(null);
      simulationRunning.current = false;
    }, 2200);
  };

  // Set up interval when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const mainInterval = window.setInterval(runSimulation, 7000);
    return () => {
      clearInterval(mainInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pitchIntervalRef.current) clearInterval(pitchIntervalRef.current);
    };
  }, [isVisible]);

  // Run on selection change
  useEffect(() => {
    runSimulation();
  }, [selectedTarget]);

  const handleSelect = (index: number) => {
    setSelectedTarget(index);
  };

  return (
    <div className="panel-card p-6 md:p-10 relative overflow-hidden">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border-faint relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${colors.bg}/70 opacity-75 transition-all duration-300 ${
                isAnimating ? "animate-[pulse-ring_1s_ease-out_infinite] scale-150" : "animate-[pulse-ring_2s_ease-out_infinite] scale-100"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-1.5 w-1.5 transition-all duration-300 ${
                isAnimating ? `${colors.bg} animate-pulse-dot` : `${colors.bg}`
              }`}
            />
          </span>
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-secondary">
            {isAnimating ? "Analyzing..." : "Live · Pitch analysis"}
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[9px] tracking-[0.18em] text-text-tertiary">
          <span className={`relative flex h-1.2 w-1.2 ${isAnimating ? colors.bg : ""}`}>
            <span className="absolute inset-0 rounded-full animate-pulse" />
          </span>
          MIC
        </div>
      </div>

      {/* Target Selector */}
      <div className="mb-4 relative z-10">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-2">
          Select a bend
        </div>
        <div className="flex flex-wrap gap-1">
          {bendTargets.map((target, index) => (
            <button
              key={target.label}
              onClick={() => handleSelect(index)}
              className={`group relative px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-all duration-200 ${
                selectedTarget === index
                  ? `${colors.bg} text-[#04130c] shadow-[0_0_0_1px_${colors.glow},0.3)_inset]`
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
      <div className="flex flex-col gap-3 mb-6 relative z-10 md:grid md:grid-cols-3 md:gap-px md:bg-border-faint md:border md:border-border-faint md:mb-6">
        <div className="bg-bg-elev-1 p-3 md:p-4 text-center">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Target pitch
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <div className="measurement-font text-3xl md:text-4xl font-bold text-text-primary leading-none">
              {current.target}
            </div>
            <div className="measurement-font text-base text-text-secondary pb-0.5">st</div>
          </div>
          <div className="mt-1 font-mono text-[8px] text-text-secondary">
            100 cents = 1 semitone
          </div>
        </div>
        <div className="bg-bg-elev-1 p-3 md:p-4 text-center relative">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Detected pitch
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <div className="measurement-font text-3xl md:text-4xl font-bold transition-all duration-500" style={{ color: colors.text }}>
              {displayDetected.toFixed(2)}
            </div>
            <div className="measurement-font text-base pb-0.5" style={{ color: `${colors.text}/70` }}>st</div>
          </div>
          <div className="mt-1 font-mono text-[8px] text-text-secondary">
            {isAnimating ? `Confidence: ${liveConfidence}%` : "From your last bend"}
          </div>
          {isAnimating && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.18em] uppercase text-text-tertiary animate-pulse">
              Processing audio...
            </div>
          )}
        </div>
        <div className="bg-bg-elev-1 p-3 md:p-4 text-center relative">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Difference
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <div className="measurement-font text-3xl md:text-4xl font-bold text-accent-coral leading-none transition-all duration-500">
              {cents !== 0 ? (cents > 0 ? "+" : "") + Math.abs(cents) : "0"}
            </div>
            <div className="measurement-font text-base pb-0.5 text-accent-coral/70">¢</div>
          </div>
          <div className="mt-1 font-mono text-[8px] transition-all duration-300" style={{ color: colors.text }}>
            {cents !== 0 ? `${cents > 0 ? "Sharp" : "Flat"}` : "On target"}
          </div>
        </div>
      </div>

      {/* Pitch Line Visualization */}
      <div className="relative z-10">
        <div className="flex justify-between font-mono text-[8px] tracking-[0.16em] uppercase text-text-tertiary mb-2 px-1 md:hidden">
          <span>−3.5 st</span>
          <span>−2.5 st</span>
          <span>−1.5 st</span>
          <span>−0.5 st</span>
        </div>
        
        <div className="flex justify-between font-mono text-[9px] tracking-[0.18em] uppercase text-text-tertiary mb-3 px-2 hidden md:flex">
          <span>−3.5</span>
          <span>−3</span>
          <span>−2</span>
          <span>−1</span>
          <span>0</span>
        </div>

        <div className="relative h-24 border border-border-faint bg-bg-base/50 rounded-sm overflow-hidden">
          <div className="absolute top-1/2 left-2 right-2 h-px bg-border-soft -translate-y-1/2" />
          
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pos) => (
            <div
              key={pos}
              className="absolute top-1/2 h-2 w-px bg-border-faint -translate-y-1/2 hidden md:block"
              style={{ left: `${pos}%` }}
            />
          ))}

          <div className="absolute top-1/2 -translate-y-1/2 h-14 bg-accent-emerald/[0.06] border-l border-r border-accent-emerald/20 transition-all duration-500"
            style={{ left: `${targetPos - 1.5}%`, width: "3%" }}
          />

          <div
            className={`absolute top-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
            style={{ left: `${targetPos}%` }}
          >
            <div className="relative -translate-x-1/2 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-text-primary" />
              <div className="mt-1 font-mono text-[9px] tracking-[0.14em] uppercase text-text-primary bg-bg-base px-2 py-1 border border-border-faint shadow-sm whitespace-nowrap">
                Target
              </div>
            </div>
          </div>

          <div
            className={`absolute top-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ left: `${detectedPos}%` }}
          >
            <div className="relative -translate-x-1/2 flex flex-col items-center">
              <div className="mb-1 font-mono text-[9px] tracking-[0.14em] uppercase bg-bg-base px-2 py-1 border border-border-faint whitespace-nowrap" style={{ color: colors.text, borderColor: `${colors.glow}/30)` }}>
                Your note
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-accent-coral" />
            </div>
          </div>

          {Math.abs(detectedPos - targetPos) > 5 && (
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ left: `${(targetPos + detectedPos) / 2}%` }}
            >
              <div
                className="px-2 py-1 rounded-full border shadow-sm backdrop-blur-sm font-mono text-[9px] font-bold whitespace-nowrap"
                style={{
                  color: colors.text,
                  borderColor: `${colors.glow}/30`,
                  backgroundColor: `${colors.glow}/10`,
                }}
              >
                {cents !== 0 ? `${cents > 0 ? "+" : ""}${Math.abs(cents)}¢ ${isFlat ? "flat" : "sharp"}` : "On target"}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[8px] font-medium transition-all duration-500 ${
              Math.abs(cents) <= 5
                ? "bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald"
                : Math.abs(cents) <= 15
                ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                : "bg-accent-coral/10 border-accent-coral/30 text-accent-coral"
            }`}
          >
            <span className="relative flex h-1 w-1">
              <span className={`absolute inset-0 rounded-full animate-pulse ${Math.abs(cents) <= 5 ? "bg-accent-emerald" : Math.abs(cents) <= 15 ? "bg-amber-500" : "bg-accent-coral"}`} />
            </span>
            {Math.abs(cents) <= 5
              ? "Excellent"
              : Math.abs(cents) <= 15
                ? "Close"
                : "Off target"}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 currentColor; }
          100% { box-shadow: 0 0 0 14px transparent; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
