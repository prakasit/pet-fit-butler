"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Activity,
  CalendarClock,
  Home,
  Radio,
  UserRound,
} from "lucide-react";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { stripLocalePrefix } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const cleanPathname = stripLocalePrefix(pathname || "/");
  const activePath = cleanPathname === "/" ? "/dashboard" : cleanPathname;

  const navItems = [
    { href: "/dashboard", label: tNav("home"), icon: Home },
    { href: "/booking", label: tNav("booking"), icon: CalendarClock },
    { href: "/health", label: tNav("activity"), icon: Activity },
    { href: "/tracking", label: tNav("live"), icon: Radio },
    { href: "/profile", label: tNav("profile"), icon: UserRound },
  ];

  const isActive = (href: string) => {
    if (href === "/health") {
      return ["/health", "/reports", "/pets", "/gallery"].some((path) =>
        activePath.startsWith(path),
      );
    }
    if (href === "/tracking") {
      return ["/tracking", "/live-cam"].some((path) => activePath.startsWith(path));
    }
    return activePath.startsWith(href);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[700px] -translate-x-1/2 rounded-3xl border border-surface/65 bg-surface/78 p-2 shadow-xl shadow-brand-navy/12 backdrop-blur-xl md:w-[calc(100%-2.5rem)] md:max-w-[640px] lg:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <LocaleLink
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition",
                  active ? "text-surface" : "text-text-muted hover:bg-soft-cream",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-active-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-2xl bg-sage shadow-lg shadow-brand-navy/20"
                  />
                )}
                <Icon className="relative z-10 h-4.5 w-4.5" />
                <span className="relative z-10">{item.label}</span>
              </LocaleLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
