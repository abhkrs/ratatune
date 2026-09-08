"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleSubmit = () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md glass-card p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-emerald/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">You&apos;re on the list.</h2>
            <p className="text-text-secondary leading-relaxed">We&apos;ll keep you posted as Ratatune gets closer to launch.</p>
            <button
              onClick={onClose}
              className="mt-6 text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-2xl font-bold text-text-primary mb-2">Get Early Access</h2>
            <p id="modal-description" className="text-text-secondary mb-6 text-sm leading-relaxed">
              Ratatune is currently in pre-launch. Leave your email and we&apos;ll keep you posted.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-text-secondary mb-1.5">
                  Email address <span className="text-accent-coral" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border bg-bg-elev-1 text-text-primary placeholder:text-text-secondary/40 text-sm outline-none transition-all ${
                    emailError ? "border-accent-coral focus:border-accent-coral" : "border-border-faint focus:border-accent-emerald/50"
                  } bg-bg-elev-1 text-text-primary placeholder:text-text-secondary/40 text-sm outline-none`}
                />
                {emailError && (
                  <p id="email-error" className="mt-1.5 text-xs text-accent-coral" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="experience" className="block text-xs font-semibold tracking-wider uppercase text-text-secondary mb-1.5">
                  How long have you been playing harmonica?{" "}
                  <span className="text-text-tertiary normal-case tracking-normal font-normal">
                    (optional)
                  </span>
                </label>
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border-faint bg-bg-elev-1 text-text-primary text-sm outline-none transition-all focus:border-accent-emerald/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238a95a8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="">Select...</option>
                  <option value="<1">Less than 1 year</option>
                  <option value="1-3">1–3 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div className="flex justify-center mt-2">
                <CTAButton onClick={handleSubmit}>
                  Request Early Access
                </CTAButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}