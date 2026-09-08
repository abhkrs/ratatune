"use client";

import { useEffect, useState, useRef } from "react";

export default function BendReadout() {
  const [animationPhase, setAnimationPhase] = useState<"idle" | "listening" | "detected">("idle");
  const [detectedPitch, setDetectedPitch] = useState(-1.97);
  const [confidence, setConfidence] = useState(97);
  const cycleRef = useRef<number | null>(null);

  useEffect(() => {
    const runCycle = () => {
      setAnimationPhase("listening");
      setConfidence(0);
      let conf = 0;
      const confInterval = setInterval(() => {
        conf = Math.min(100, Math.floor(conf + Math.random() * 15 + 5));
        setConfidence(conf);
      }, 120);

      setTimeout(() => {
        clearInterval(confInterval);
        const target = -2.0;
        const variance = (Math.random() - 0.5) * 0.12;
        const finalPitch = parseFloat((target + variance).toFixed(2));
        setDetectedPitch(finalPitch);
        setConfidence(97);
        setAnimationPhase("detected");
      }, 2800);

      setTimeout(() => {
        setAnimationPhase("idle");
      }, 5800);
    };

    runCycle();
    cycleRef.current = window.setInterval(runCycle, 8500);
    return () => {
      if (cycleRef.current) window.clearInterval(cycleRef.current);
    };
  }, []);

  const cents = Math.round((detectedPitch + 2) * 100);
  const pitchHz = 440 * Math.pow(2, detectedPitch / 12);
  const isFlat = cents < 0;

  return (
    <div className={`panel-card p-5 md:p-7 relative overflow-hidden`}>
      {/* Animated background glow when listening */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 ${
          animationPhase === "listening" ? "opacity-100" : ""
        }`}
        style={{
          background: "radial-gradient(ellipse at center, rgba(52, 211, 153, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-faint relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75 transition-all duration-300 ${
                animationPhase === "listening"
                  ? "animate-[pulse-ring_1.2s_ease-out_infinite] scale-150"
                  : animationPhase === "detected"
                  ? "animate-[pulse-ring_2s_ease-out_infinite] scale-100"
                  : "scale-0"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 transition-all duration-300 ${
                animationPhase === "listening"
                  ? "bg-accent-emerald animate-pulse-dot"
                  : animationPhase === "detected"
                  ? "bg-accent-emerald"
                  : "bg-text-tertiary"
              }`}
            />
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-secondary">
            {animationPhase === "listening" ? "Listening..." : animationPhase === "detected" ? "Detected" : "Standby"}
          </span>
        </div>
        <div
          className={`flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] transition-colors duration-300 ${
            animationPhase === "listening"
              ? "text-accent-emerald"
              : animationPhase === "detected"
              ? "text-accent-coral"
              : "text-text-tertiary"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={`absolute inset-0 rounded-full animate-pulse ${
                animationPhase === "listening"
                  ? "bg-accent-emerald"
                  : animationPhase === "detected"
                  ? "bg-accent-coral"
                  : "bg-text-tertiary"
              }`}
/>
          </span>
          MIC
        </div>
      </div>

      {/* Main reading block */}
      <div className="space-y-1 mb-7 relative z-10">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-secondary mb-3">
          Your bend
        </div>
        <div className="flex items-baseline gap-3">
          <div className="measurement-font text-6xl md:text-7xl font-bold text-text-primary leading-none transition-all duration-700 ease-out">
            {detectedPitch < 0 ? "−" : "+"}{Math.abs(detectedPitch).toFixed(2)}
          </div>
          <div className="measurement-font text-base text-text-secondary pb-2">st</div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">Target</span>
          <span className="measurement-font text-sm text-text-secondary">−2.00 st</span>
          <span
            className={`ml-auto measurement-font text-xs transition-all duration-500 ${
              isFlat ? "text-accent-coral" : "text-accent-emerald"
            }`}
          >
            {Math.abs(cents)}¢ {isFlat ? "flat" : "sharp"}
          </span>
        </div>
      </div>

      {/* Animated pitch meter */}
      <div className="relative h-16 mb-5 rounded-sm overflow-hidden border border-border-faint bg-bg-base relative z-10">
        {/* horizontal grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 9px, rgba(240, 244, 248, 0.06) 9px, rgba(240, 244, 248, 0.06) 10px)",
          }}
        />
        {/* target zone - animated when listening */}
        <div
          className={`absolute top-2 bottom-2 left-[46%] w-[8%] bg-accent-emerald/15 border-x border-accent-emerald/40 transition-all duration-500 ${
            animationPhase === "listening" ? "bg-accent-emerald/25 border-accent-emerald/60" : ""
          }`}
        />
        {/* animated waveform bars */}
        <div className="absolute inset-0 flex items-center justify-around px-3">
          {[18, 26, 34, 48, 62, 78, 64, 52, 70, 88, 74, 58, 44, 36, 28, 22, 18, 24, 32, 42, 54, 68, 82, 70, 56, 44, 34, 26, 22, 18, 14].map(
            (h, i) => (
              <span
                key={i}
                className={`w-[2px] rounded-full transition-all duration-300 ease-out ${
                  animationPhase === "listening"
                    ? "bg-accent-emerald/60 animate-[wave-pulse_1.5s_ease-in-out_infinite]"
                    : animationPhase === "detected"
                    ? "bg-accent-emerald/40"
                    : "bg-accent-emerald/30"
                }`}
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 30}ms`,
                }}
              />
            )
          )}
        </div>
        {/* detected marker - animated */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            animationPhase === "detected" ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `${50 + (detectedPitch + 2) * 2.5}%` }}
        >
          <div className="w-3 h-3 rounded-full bg-accent-coral shadow-[0_0_0_4px_rgba(255,122,91,0.18)] animate-[marker-pop_0.4s_ease-out]" />
          <div className="absolute top-3 w-px h-3 bg-accent-coral" />
          <span className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 font-mono text-[9px] text-accent-coral text-center whitespace-nowrap">
            {cents > 0 ? "+" : ""}{cents}¢
          </span>
        </div>
        {/* target marker */}
        <div className="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2">
          <div className="w-px h-6 bg-accent-emerald/70" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-emerald rotate-45" />
        </div>
        {/* Listening sweep line */}
        {animationPhase === "listening" && (
          <div className="absolute top-2 bottom-2 w-px bg-accent-emerald/60 animate-[sweep_2.8s_linear_infinite]" style={{ left: "10%" }} />
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-border-faint rounded-sm overflow-hidden relative z-10">
        <div className="bg-bg-elev-1 p-3 text-center">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Cents
          </div>
          <div className="measurement-font text-sm font-bold text-accent-coral transition-all duration-500">
            {cents > 0 ? "+" : ""}{cents}
          </div>
        </div>
        <div className="bg-bg-elev-1 p-3 text-center">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Hz
          </div>
          <div className="measurement-font text-sm font-bold text-text-primary transition-all duration-500">
            {pitchHz.toFixed(1)}
          </div>
        </div>
        <div className="bg-bg-elev-1 p-3 text-center">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Conf.
          </div>
          <div className="measurement-font text-sm font-bold text-accent-emerald transition-all duration-500">
            {confidence}%
          </div>
        </div>
      </div>

      {/* Footer micro-note */}
      <div className="mt-5 pt-4 border-t border-border-faint flex items-center justify-between relative z-10">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary">
          Hole 4 Draw · Full Bend
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary">
          A4 = 440 Hz
        </span>
      </div>

      <style jsx>{`
        @keyframes wave-pulse {
          0%, 100% { height: var(--h, 50%); opacity: 0.4; }
          50% { height: calc(var(--h, 50%) * 1.3); opacity: 1; }
        }
        @keyframes marker-pop {
          0% { transform: scale(0) translateY(4px); opacity: 0; }
          60% { transform: scale(1.2) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes sweep {
          0% { left: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 95%; opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.45); }
          100% { box-shadow: 0 0 0 14px rgba(52, 211, 153, 0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}