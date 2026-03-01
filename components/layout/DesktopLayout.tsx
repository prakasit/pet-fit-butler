"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { BrandLogo } from "@/components/BrandLogo";
import { stripLocalePrefix } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface DesktopLayoutProps {
  children: ReactNode;
  pathname: string;
}

export function DesktopLayout({ children, pathname }: DesktopLayoutProps) {
  const tNav = useTranslations("nav");
  const tLayout = useTranslations("layout");
  const cleanPathname = stripLocalePrefix(pathname);
  const activePath = cleanPathname === "/" ? "/dashboard" : cleanPathname;

  const navItems = [
    { href: "/dashboard", label: tNav("home") },
    { href: "/booking", label: tNav("booking") },
    { href: "/upcoming", label: tNav("upcoming") },
    { href: "/health", label: tNav("activity") },
    { href: "/tracking", label: tNav("live") },
    { href: "/profile", label: tNav("profile") },
  ];

  const isActive = (href: string) => {
    if (href === "/health") {
      return ["/health", "/reports", "/pets", "/gallery"].some((route) =>
        activePath.startsWith(route),
      );
    }
    if (href === "/tracking") {
      return ["/tracking", "/live-cam"].some((route) => activePath.startsWith(route));
    }
    return activePath.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-soft-cream text-brand-navy">
      <header className="sticky top-0 z-40 border-b border-line-soft bg-surface/88 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-8 py-4">
          <BrandLogo href="/dashboard" />
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition",
                  isActive(item.href)
                    ? "bg-sage !text-white shadow-premium-sm"
                    : "text-text-muted hover:bg-soft-cream hover:text-brand-navy",
                )}
              >
                {item.label}
              </LocaleLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <LocaleLink
              href="/booking"
              className="rounded-xl bg-sage px-4 py-2 text-sm font-semibold !text-white shadow-premium-sm transition hover:-translate-y-0.5"
            >
              {tLayout("desktopBookButton")}
            </LocaleLink>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-8 py-10">{children}</main>
    </div>
  );
}
