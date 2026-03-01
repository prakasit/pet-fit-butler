"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarClock,
  Home,
  Radio,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/booking", label: "Booking", icon: CalendarClock },
  { href: "/health", label: "Activity", icon: Activity },
  { href: "/tracking", label: "Live", icon: Radio },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/health") {
      return ["/health", "/reports", "/pets", "/gallery"].some((path) => pathname.startsWith(path));
    }
    if (href === "/tracking") {
      return ["/tracking", "/live-cam"].some((path) => pathname.startsWith(path));
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[450px] -translate-x-1/2 rounded-3xl border border-line-soft bg-surface/95 p-2 shadow-premium backdrop-blur">
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition",
                  active
                    ? "bg-brand-navy text-soft-cream shadow-premium-sm"
                    : "text-text-muted hover:bg-brand-navy/8",
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
