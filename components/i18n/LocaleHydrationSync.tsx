"use client";

import { useEffect } from "react";

import type { AppLocale } from "@/lib/i18n";
import { LOCALE_COOKIE, LOCALE_STORAGE_KEY } from "@/lib/i18n";

interface LocaleHydrationSyncProps {
  locale: AppLocale;
}

export function LocaleHydrationSync({ locale }: LocaleHydrationSyncProps) {
  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [locale]);

  return null;
}
