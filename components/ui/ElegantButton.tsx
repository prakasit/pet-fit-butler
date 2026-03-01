"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ElegantButtonVariant = "primary" | "secondary" | "ghost";

interface ElegantButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ElegantButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ElegantButtonVariant, string> = {
  primary:
    "bg-brand-navy text-soft-cream hover:-translate-y-0.5 hover:shadow-premium disabled:bg-brand-navy/60",
  secondary:
    "bg-sage text-brand-navy hover:-translate-y-0.5 hover:shadow-premium-sm disabled:bg-sage/60",
  ghost:
    "bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10 border border-line-soft disabled:bg-brand-navy/5",
};

export function ElegantButton({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ElegantButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold tracking-wide transition duration-300 focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:outline-none disabled:cursor-not-allowed",
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
