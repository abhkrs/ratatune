"use client";

import React from "react";

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  fullwidth?: boolean;
}

const sizes = {
  sm: "text-xs py-2.5 px-5 gap-2",
  md: "text-sm py-3 px-6 gap-2.5",
  lg: "text-base py-4 px-8 gap-3",
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="cta-arrow" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CTAButton({
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  style,
  fullwidth = false,
}: CTAButtonProps) {
  const content = React.Children.toArray(children).filter(Boolean);
  const hasArrow = content.some(child => React.isValidElement(child) && child.type === 'svg');

  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        className={`btn-ghost ${sizes[size]} ${className}`}
        style={style}
      >
        {children}
        {!hasArrow && <ArrowIcon />}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`btn-magnetic ${sizes[size]} ${fullwidth ? "w-full" : ""} ${className}`}
      style={style}
    >
      {children}
      {!hasArrow && <ArrowIcon />}
    </button>
  );
}

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  fullwidth?: boolean;
}