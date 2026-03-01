"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type AppLocale,
  resolveLocale,
  stripLocalePrefix,
  withLocalePrefix,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("language");
  const locale = resolveLocale(useLocale());
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const basePath = useMemo(() => stripLocalePrefix(pathname || "/"), [pathname]);
  const queryString = searchParams.toString();

  const onChangeLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;

    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    const localizedPath = withLocalePrefix(basePath, nextLocale);
    const nextHref = queryString ? `${localizedPath}?${queryString}` : localizedPath;
    router.replace(nextHref);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line-soft bg-soft-cream/80 p-1 shadow-premium-sm",
        className,
      )}
      role="group"
      aria-label={t("ariaLabel")}
    >
      <button
        type="button"
        onClick={() => onChangeLocale("th")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          locale === "th" ? "bg-brand-navy text-soft-cream" : "text-brand-navy hover:bg-brand-navy/8",
        )}
      >
        {t("thai")}
      </button>
      <button
        type="button"
        onClick={() => onChangeLocale("en")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          locale === "en" ? "bg-brand-navy text-soft-cream" : "text-brand-navy hover:bg-brand-navy/8",
        )}
      >
        {t("english")}
      </button>
    </div>
  );
}
