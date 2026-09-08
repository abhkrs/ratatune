"use client";

import CTAButton from "./CTAButton";

interface FooterProps {
  onCtaClick: () => void;
}

export default function Footer({ onCtaClick }: FooterProps) {
  return (
    <footer className="relative py-12 bg-bg-deep border-t border-border-faint">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-text-primary">Ratatune</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
              Pre-launch
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-text-secondary text-center md:text-left">
            AI-powered music practice · Harmonica Bend Accuracy
          </p>

          {/* CTA */}
          <CTAButton onClick={onCtaClick} variant="ghost" size="sm">
            Get Early Access
          </CTAButton>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border-faint text-center">
          <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} Ratatune. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}