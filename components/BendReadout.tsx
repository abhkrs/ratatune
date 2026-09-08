"use client";

export default function BendReadout() {
  return (
    <div className={`panel-card p-5 md:p-7`}>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-faint">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-secondary">
            Live · Bend analysis
          </span>
        </div>
      </div>

      {/* Main reading block */}
      <div className="space-y-1 mb-7">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-secondary mb-3">
          Your bend
        </div>
        <div className="flex items-baseline gap-3">
          <div className="measurement-font text-6xl md:text-7xl font-bold text-text-primary leading-none">
            −1.97
          </div>
          <div className="measurement-font text-base text-text-secondary pb-2">st</div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">Target</span>
          <span className="measurement-font text-sm text-text-secondary">−2.00 st</span>
          <span className="ml-auto measurement-font text-xs text-accent-coral">3.0¢ flat</span>
        </div>
      </div>

      {/* Mini spectrum */}
      <div className="relative h-14 mb-5 rounded-sm overflow-hidden border border-border-faint bg-bg-base">
        {/* horizontal grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 9px, rgba(240, 244, 248, 0.06) 9px, rgba(240, 244, 248, 0.06) 10px)",
          }}
        />
        {/* target zone */}
        <div className="absolute top-2 bottom-2 left-[46%] w-[8%] bg-accent-emerald/15 border-x border-accent-emerald/40" />
        {/* waveform bars (decorative) */}
        <div className="absolute inset-0 flex items-center justify-around px-3">
          {[18, 26, 34, 48, 62, 78, 64, 52, 70, 88, 74, 58, 44, 36, 28, 22, 18, 24, 32, 42, 54, 68, 82, 70, 56, 44, 34, 26, 22, 18, 14].map(
            (h, i) => (
              <span
                key={i}
                className="w-[2px] bg-accent-emerald/40 rounded-full"
                style={{ height: `${h}%` }}
              />
            )
          )}
        </div>
        {/* detected marker */}
        <div className="absolute top-1/2 left-[49%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-accent-coral shadow-[0_0_0_4px_rgba(255,122,91,0.18)]" />
          <div className="absolute top-3 w-px h-3 bg-accent-coral" />
        </div>
        {/* target marker */}
        <div className="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2">
          <div className="w-px h-6 bg-accent-emerald/70" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-emerald rotate-45" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-border-faint rounded-sm overflow-hidden">
        <div className="bg-bg-elev-1 p-3">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Cents
          </div>
          <div className="measurement-font text-sm font-bold text-accent-coral">
            −3.0
          </div>
        </div>
        <div className="bg-bg-elev-1 p-3">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Hz
          </div>
          <div className="measurement-font text-sm font-bold text-text-primary">
            466.2
          </div>
        </div>
        <div className="bg-bg-elev-1 p-3">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-text-tertiary mb-1">
            Conf.
          </div>
          <div className="measurement-font text-sm font-bold text-accent-emerald">
            97%
          </div>
        </div>
      </div>

      {/* Footer micro-note */}
      <div className="mt-5 pt-4 border-t border-border-faint flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary">
          Hole 4 Draw · Bend
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary">
          A4 = 440 Hz
        </span>
      </div>
    </div>
  );
}