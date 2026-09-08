import { Target, Ruler, RefreshCw } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Stop guessing",
    description: "Know whether you landed above or below the target.",
    accent: "emerald",
    iconColor: "#34d399",
  },
  {
    icon: Ruler,
    title: "See the difference",
    description: "Turn an audible feeling into a measurable pitch difference.",
    accent: "coral",
    iconColor: "#ff7a5b",
  },
  {
    icon: RefreshCw,
    title: "Practice with feedback",
    description: "Use the result immediately while the mistake is still fresh.",
    accent: "emerald",
    iconColor: "#34d399",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-28 md:py-36 bg-bg-elev-1 border-y border-border-faint">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-text-secondary inline-flex items-center gap-3">
            <span className="w-6 h-px bg-accent-emerald" />
            [06] Value
          </span>
          <h2 className="display-text text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.02] text-text-primary mb-6">
            Know what to adjust
            <br />
            <span className="italic font-display font-medium text-accent-emerald">
              on the next bend.
            </span>
          </h2>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="relative"
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className="stripe-top" style={{ "--stripe-color": benefit.accent === "emerald" ? "#34d399" : "#ff7a5b" } as React.CSSProperties}>
                    <div className="panel-ticked p-6 md:p-8">
                      {/* Icon */}
                      <div className="flex h-10 w-10 items-center justify-center mb-6">
                        <div className={`h-8 w-8 rounded-[6px] bg-${benefit.accent}/10 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${benefit.accent}`} />
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-base text-text-secondary leading-[1.6]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}