import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "active";
  className?: string;
}

const toneClass: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  neutral: "bg-brand-navy/10 text-brand-navy",
  success: "bg-sage/28 text-brand-navy",
  warning: "bg-joy-peach/45 text-brand-navy",
  danger: "bg-joy-peach/55 text-brand-navy",
  active: "status-pulse bg-sage/35 text-brand-navy",
};

export function StatusBadge({ label, tone = "neutral", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        toneClass[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
