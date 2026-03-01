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
    "bg-sage text-surface hover:-translate-y-0.5 hover:bg-sage/90 hover:shadow-premium disabled:bg-sage/60",
  secondary:
    "bg-beige text-brand-navy hover:-translate-y-0.5 hover:bg-beige/90 hover:shadow-premium-sm disabled:bg-beige/60",
  ghost:
    "border border-line-soft bg-surface text-brand-navy hover:bg-soft-cream/85 disabled:bg-surface",
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
        "inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:ring-2 focus-visible:ring-beige/70 focus-visible:outline-none disabled:cursor-not-allowed",
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
