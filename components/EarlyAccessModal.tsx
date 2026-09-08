"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success";

export default function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [emailError, setEmailError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus trap within modal
  const focusableElements = useCallback(() => {
    const el = modalRef.current;
    if (!el) return [];
    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(el.querySelectorAll(selectors)).filter(
      (el): el is HTMLElement => (el as HTMLElement).offsetParent !== null
    );
  }, []);

  // Set initial focus
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
    return () => {
      emailInputRef.current?.blur();
    };
  }, [isOpen]);

  // ESC key handler and focus trap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== "Tab") return;

      const focusable = focusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, focusableElements]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setFormState("submitting");

    // Simulate submission (no backend)
    setTimeout(() => {
      setFormState("success");
    }, 800);
  };

  const handleClose = () => {
    onClose();
    // Reset form after animation
    setTimeout(() => {
      setEmail("");
      setExperience("");
      setFormState("idle");
      setEmailError("");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md glass-card p-8 animate-[fade-in-up_0.3s_var(--ease-out-expo)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {formState === "success" ? (
          /* ======== Success State ======== */
          <div className="text-center py-4 animate-[fade-in-up_0.4s_var(--ease-out-expo)]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-primary/15 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-accent-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-text-primary mb-3">
              You&apos;re on the list.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We&apos;ll keep you posted as Ratatune gets closer to launch.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4"
              autoFocus
            >
              Close
            </button>
          </div>
        ) : (
          /* ======== Form State ======== */
          <>
            <h2
              id="modal-title"
              className="text-2xl font-bold font-[var(--font-heading)] text-text-primary mb-2"
            >
              Get Early Access
            </h2>
            <p
              id="modal-description"
              className="text-text-secondary mb-6 text-sm leading-relaxed"
            >
              Ratatune is currently in pre-launch. Leave your email and
              we&apos;ll keep you posted.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold tracking-wider uppercase text-text-secondary mb-1.5"
                >
                  Email address <span className="text-accent-red" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  ref={emailInputRef}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg bg-bg-dark border text-text-primary placeholder:text-text-secondary/50 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-primary/40 ${
                    emailError ? "border-accent-red" : "border-border-subtle"
                  }`}
                />
                {emailError && (
                  <p id="email-error" className="mt-1.5 text-xs text-accent-red" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Experience (optional) */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-xs font-semibold tracking-wider uppercase text-text-secondary mb-1.5"
                >
                  How long have you been playing harmonica?{" "}
                  <span className="text-text-secondary/60 normal-case tracking-normal font-normal">
                    (optional)
                  </span>
                </label>
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-bg-dark border border-border-subtle text-text-primary text-sm outline-none transition-all focus:ring-2 focus:ring-accent-primary/40 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a3a3a3' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
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

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {formState === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        className="opacity-75"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Request Early Access"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
