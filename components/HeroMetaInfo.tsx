"use client";

export default function HeroMetaInfo() {
  return (
    <div className="hidden lg:grid lg:grid-cols-12 gap-4 max-w-xl">
      <div className="lg:col-span-4">
        <div className="text-text-secondary text-[10px] tracking-[0.22em] uppercase mb-1">Hole</div>
        <div className="text-text-primary font-mono text-base normal-case tracking-normal">4 Draw</div>
      </div>
      <div className="lg:col-span-4">
        <div className="text-text-secondary text-[10px] tracking-[0.22em] uppercase mb-1">Bend</div>
        <div className="text-text-primary font-mono text-base normal-case tracking-normal">−2 semitones</div>
      </div>
      <div className="lg:col-span-4">
        <div className="text-text-secondary text-[10px] tracking-[0.22em] uppercase mb-1">Status</div>
        <div className="text-accent-emerald font-mono text-base normal-case tracking-normal">Listening</div>
      </div>
    </div>
  );
}