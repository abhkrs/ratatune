"use client";

import { useState, useEffect, useRef } from "react";
import CTAButton from "./CTAButton";

interface HeaderProps {
  onCtaClick: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ponytail: use IntersectionObserver instead of window scroll listener
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#the-problem", label: "The problem" },
    { href: "#how-it-works", label: "The Process" },
    { href: "#bend-accuracy", label: "The demo" },
    { href: "#before-after", label: "Before / After" },
    { href: "#the-value", label: "The Value" },
  ];

  return (
    <>
      {/* Scroll sentinel */}
      <div ref={sentinelRef} className="absolute top-0" aria-hidden="true" />

      {/* Full-width fixed header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#fff9f5]/85 backdrop-blur-2xl border-b border-[#f0ddd0]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={(e) => e.preventDefault()}
            >
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute inset-0 border border-accent-emerald/70 rotate-45 group-hover:rotate-[52deg] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="measurement-font text-[9px] font-bold text-accent-emerald">R</span>
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-text-primary">
                Ratatune
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <CTAButton onClick={onCtaClick} size="sm">
                Get Early Access
              </CTAButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`block w-5 h-px bg-text-primary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-text-primary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-5 h-px bg-text-primary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "bg-[#fff9f5]/95 backdrop-blur-3xl opacity-100 pointer-events-auto"
            : "bg-[#fff9f5]/95 backdrop-blur-3xl opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link-reveal text-2xl font-display font-bold text-text-primary hover:text-accent-emerald transition-colors duration-300 ${
                mobileMenuOpen ? "" : "opacity-0"
              }`}
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
          <CTAButton
            onClick={() => {
              setMobileMenuOpen(false);
              onCtaClick();
            }}
            size="md"
            className={mobileMenuOpen ? "nav-link-reveal" : "opacity-0"}
          >
            Get Early Access
          </CTAButton>
        </div>
      </div>
    </>
  );
}