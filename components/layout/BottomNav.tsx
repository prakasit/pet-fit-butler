"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Activity, CalendarClock, Home, Radio } from "lucide-react";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[72px] border-t border-line-soft/60 bg-surface/95 shadow-[0_-2px_12px_rgba(15,27,45,0.06)] backdrop-blur-xl lg:hidden">
      <ul className="flex h-full max-w-[100vw] items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.href} className="flex flex-1 shrink-0 basis-0 justify-center">
              <LocaleLink
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 rounded-2xl py-2 px-3 text-[12px] font-medium transition min-w-0",
                  active ? "text-sage" : "text-text-muted active:opacity-80",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-active-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-2xl bg-sage/15"
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 h-5 w-5 shrink-0",
                    active && "text-sage",
                  )}
                />
                <span className="relative z-10 truncate text-[12px]">{item.label}</span>
              </LocaleLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
