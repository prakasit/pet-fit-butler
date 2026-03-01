"use client";

import type { ReactNode } from "react";

import { CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandLogo } from "@/components/BrandLogo";
import { BottomNav } from "@/components/layout/BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  title: string;
  firstName: string;
  featuredPet: string;
  today: string;
}

export function MobileLayout({
  children,
  title,
  firstName,
  featuredPet,
  today,
}: MobileLayoutProps) {
  const t = useTranslations("appShell");

  return (
    <div className="min-h-screen bg-soft-cream text-brand-navy">
      <header className="sticky top-0 z-30 border-b border-line-soft/70 bg-soft-cream/96 px-4 pt-4 pb-4 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <BrandLogo compact />
          <span className="inline-flex items-center gap-1 rounded-full bg-sage/30 px-3 py-1 text-xs font-semibold text-brand-navy">
            <CalendarDays className="h-3.5 w-3.5" />
            {today}
          </span>
        </div>
        <div className="space-y-1 rounded-2xl border border-line-soft/50 bg-surface/85 px-4 py-3 shadow-premium-sm">
          <p className="text-xs tracking-[0.05em] text-text-muted">
            {t("greeting", { name: firstName })}
          </p>
          <h1 className="text-3xl leading-tight text-brand-navy">{title}</h1>
          <p className="text-sm text-text-muted">{t("readyLine", { petName: featuredPet })}</p>
        </div>
      </header>

      <main className="px-4 pt-5 pb-28">{children}</main>
      <BottomNav />
    </div>
  );
}
