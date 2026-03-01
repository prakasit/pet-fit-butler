"use client";

import { useEffect, useMemo, useRef, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const pendingLocaleRef = useRef<AppLocale | null>(null);
  const pendingHrefRef = useRef<string>("");
  const fallbackTimerRef = useRef<number | null>(null);

  const basePath = useMemo(() => stripLocalePrefix(pathname || "/"), [pathname]);
  const queryString = searchParams.toString();

  useEffect(() => {
    if (pendingLocaleRef.current && locale === pendingLocaleRef.current) {
      pendingLocaleRef.current = null;
      pendingHrefRef.current = "";
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    }
  }, [locale]);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const onChangeLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale || isPending || pendingLocaleRef.current === nextLocale) return;

    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    const localizedPath = withLocalePrefix(basePath, nextLocale);
    const nextHref = queryString ? `${localizedPath}?${queryString}` : localizedPath;
    pendingLocaleRef.current = nextLocale;
    pendingHrefRef.current = nextHref;

    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    // Middleware-based locale routing can occasionally stall on client transitions.
    // Fallback to a hard navigation only if the locale does not update quickly.
    fallbackTimerRef.current = window.setTimeout(() => {
      if (pendingLocaleRef.current === nextLocale && pendingHrefRef.current) {
        window.location.replace(pendingHrefRef.current);
      }
    }, 900);

    startTransition(() => {
      router.replace(nextHref, { scroll: false });
      router.refresh();
    });
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
          locale === "th" ? "bg-sage text-surface" : "text-brand-navy hover:bg-soft-cream",
        )}
      >
        {t("thai")}
      </button>
      <button
        type="button"
        onClick={() => onChangeLocale("en")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          locale === "en" ? "bg-sage text-surface" : "text-brand-navy hover:bg-soft-cream",
        )}
      >
        {t("english")}
      </button>
    </div>
  );
}
