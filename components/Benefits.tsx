export default function Benefits() {
  return (
    <section className="relative py-32 md:py-44 bg-bg-elev-1 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-3">
            <span className="section-label">Value</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display-text text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] text-text-primary mb-5 text-balance">
              Know what to adjust
              <br />
              <span className="italic font-display font-medium text-accent-emerald">
                on the next bend.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Stop guessing",
              description: "Know whether you landed above or below the target.",
            },
            {
              title: "See the difference",
              description: "Turn an audible feeling into a measurable pitch difference.",
            },
            {
              title: "Practice with feedback",
              description: "Use the result immediately while the mistake is still fresh.",
            },
          ].map((benefit, i) => (
            <div key={benefit.title} className="panel-card p-7 md:p-9">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald/30 opacity-75 animate-[pulse-ring_1.8s_ease-out_infinite]" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-2 text-balance">
                {benefit.title}
              </h3>
              <p className="text-sm text-text-secondary leading-[1.65]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}