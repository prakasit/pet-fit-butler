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
        "animate-fade-in-up rounded-2xl border border-line-soft bg-surface/90 p-5 shadow-premium-sm backdrop-blur",
        className,
      )}
    >
      {(title || subtitle || action) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div className="space-y-1">
            {title && <h3 className="text-xl text-brand-navy">{title}</h3>}
            {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer className="mt-4 border-t border-line-soft pt-4">{footer}</footer>}
    </section>
  );
}
