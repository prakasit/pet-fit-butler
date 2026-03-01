import { StatusBadge } from "@/components/ui/StatusBadge";
import { toTitleCase } from "@/lib/format";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  label: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <li className="flex gap-3" key={item.id}>
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "mt-1 h-3.5 w-3.5 rounded-full border-2",
                item.completed && "border-sage bg-sage",
                !item.completed && !item.active && "border-brand-navy/20 bg-surface",
                item.active && "border-joy-peach bg-joy-peach",
              )}
            />
            {index !== items.length - 1 && (
              <span
                className={cn(
                  "mt-1 h-8 w-px",
                  item.completed ? "bg-sage/70" : "bg-brand-navy/15",
                )}
              />
            )}
          </div>
          <div className="flex min-h-8 flex-1 items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-brand-navy">{toTitleCase(item.label)}</p>
              <p className="text-xs text-text-muted">{item.timestamp}</p>
            </div>
            {item.active && <StatusBadge label="Current" tone="active" />}
          </div>
        </li>
      ))}
    </ol>
  );
}
