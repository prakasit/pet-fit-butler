"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import { navLabelThai } from "@/lib/thai";
import { cn } from "@/lib/utils";

interface DesktopLayoutProps {
  children: ReactNode;
  pathname: string;
}

const navItems = [
  { href: "/dashboard", label: navLabelThai.home },
  { href: "/booking", label: navLabelThai.booking },
  { href: "/health", label: navLabelThai.activity },
  { href: "/tracking", label: navLabelThai.live },
  { href: "/profile", label: navLabelThai.profile },
];

export function DesktopLayout({ children, pathname }: DesktopLayoutProps) {
  const isActive = (href: string) => {
    if (href === "/health") {
      return ["/health", "/reports", "/pets", "/gallery"].some((route) => pathname.startsWith(route));
    }
    if (href === "/tracking") {
      return ["/tracking", "/live-cam"].some((route) => pathname.startsWith(route));
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-soft-cream text-brand-navy">
      <header className="sticky top-0 z-40 border-b border-line-soft bg-surface/88 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-8 py-4">
          <BrandLogo href="/dashboard" />
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition",
                  isActive(item.href)
                    ? "bg-brand-navy text-soft-cream shadow-premium-sm"
                    : "text-text-muted hover:bg-brand-navy/8 hover:text-brand-navy",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/booking"
            className="rounded-xl bg-sage px-4 py-2 text-sm font-semibold text-brand-navy shadow-premium-sm transition hover:-translate-y-0.5"
          >
            จองเลย
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-8 py-10">{children}</main>
    </div>
  );
}
