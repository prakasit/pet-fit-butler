"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandLogo } from "@/components/BrandLogo";
import { BottomNav } from "@/components/layout/BottomNav";
import { LocaleLink } from "@/components/i18n/LocaleLink";

const DEFAULT_AVATAR_URL = "https://i.pravatar.cc/150?u=owner";

interface MobileLayoutProps {
  children: ReactNode;
  title: string;
  firstName: string;
  featuredPet: string;
  today: string;
  /** Optional avatar URL for profile button. Mobile only. */
  avatarUrl?: string;
}

export function MobileLayout({
  children,
  title,
  firstName,
  featuredPet,
  today,
  avatarUrl = DEFAULT_AVATAR_URL,
}: MobileLayoutProps) {
  const t = useTranslations("appShell");
  const tNav = useTranslations("nav");

  return (
    <div className="min-h-screen bg-soft-cream text-brand-navy">
      <header className="sticky top-0 z-30 border-b border-line-soft/70 bg-soft-cream/96 backdrop-blur max-md:px-4 max-md:pt-3 max-md:pb-3 md:px-4 md:pt-4 md:pb-4">
        <div className="mb-3 flex items-center justify-between gap-2 max-md:mb-2">
          <BrandLogo compact />
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-sage/30 px-3 py-1 text-xs font-semibold text-brand-navy"
              suppressHydrationWarning
            >
              <CalendarDays className="h-3.5 w-3.5" />
              {today}
            </span>
            <LocaleLink
              href="/profile"
              className="rounded-full border border-beige/80 bg-surface/90 shadow-[0_1px_3px_rgba(15,27,45,0.08)] transition active:opacity-90"
              aria-label={tNav("profile")}
            >
              <Image
                src={avatarUrl}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            </LocaleLink>
          </div>
        </div>
        <div className="space-y-1 rounded-2xl border border-line-soft/50 bg-surface/85 shadow-premium-sm max-md:space-y-0.5 max-md:rounded-2xl max-md:px-3 max-md:py-2.5 md:px-4 md:py-3">
          <p className="text-xs tracking-[0.05em] text-text-muted">
            {t("greeting", { name: firstName })}
          </p>
          <h1 className="text-3xl leading-tight text-brand-navy max-md:text-2xl">{title}</h1>
          <p className="text-sm text-text-muted max-md:text-xs">{t("readyLine", { petName: featuredPet })}</p>
        </div>
      </header>

      <main className="px-4 pt-5 pb-28 max-md:pt-4 md:pt-5">{children}</main>
      <BottomNav />
    </div>
  );
}
