"use client";

import { useState, useEffect } from "react";

interface HeaderProps {
  onCtaClick: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#bend-accuracy", label: "The demo" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/85 backdrop-blur-xl border-b border-border-faint"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="relative w-7 h-7 flex items-center justify-center">
            <span className="absolute inset-0 border border-accent-emerald rotate-45 group-hover:rotate-[55deg] transition-transform duration-500" />
            <span className="measurement-font text-[10px] font-bold text-accent-emerald">R</span>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-text-primary">
            Ratatune
          </span>
          <span className="hidden sm:inline-block ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary border border-border-faint px-1.5 py-0.5 rounded-sm">
            beta
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <span className="font-mono text-[10px] text-text-tertiary group-hover:text-accent-emerald transition-colors">
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
          <button
            onClick={onCtaClick}
            className="ml-2 btn-primary text-[13px] py-2.5 px-4"
          >
            Get Early Access
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-border-faint ${
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#07090e]/95 backdrop-blur-xl`}
      >
        <div className="section-container py-6 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <span className="font-mono text-[10px] text-text-tertiary">0{i + 1}</span>
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onCtaClick();
            }}
            className="btn-primary text-sm w-full mt-2"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </header>
  );
}