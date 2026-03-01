import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PremiumCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function PremiumCard({
  title,
  subtitle,
  action,
  footer,
  className,
  children,
}: PremiumCardProps) {
  return (
    <section
      className={cn(
        "animate-fade-in-up relative overflow-hidden rounded-2xl border border-line-soft/70 bg-surface/92 p-8 shadow-xl shadow-brand-navy/8 ring-1 ring-brand-navy/4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-navy/12 before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[15px] before:bg-gradient-to-b before:from-white/65 before:to-transparent before:opacity-70",
        className,
      )}
    >
      {(title || subtitle || action) && (
        <header className="relative z-10 mb-7 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            {title && (
              <h3 className="truncate text-[1.7rem] leading-tight text-brand-navy">{title}</h3>
            )}
            {subtitle && <p className="truncate text-sm text-text-muted">{subtitle}</p>}
          </div>
          {action != null && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className="relative z-10">{children}</div>
      {footer && <footer className="relative z-10 mt-6 border-t border-line-soft pt-6">{footer}</footer>}
    </section>
  );
}
