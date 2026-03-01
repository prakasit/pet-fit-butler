export const APP_LOCALES = ["th", "en"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "th";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_STORAGE_KEY = "petfit.locale";

export function isLocale(value: string | null | undefined): value is AppLocale {
  return value === "th" || value === "en";
}

export function resolveLocale(value: string | null | undefined): AppLocale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getLocaleFromPathname(pathname: string): AppLocale | null {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}

export function stripLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname || "/";
  const stripped = pathname.replace(new RegExp(`^/${locale}`), "");
  return stripped.length > 0 ? stripped : "/";
}

export function withLocalePrefix(pathname: string, locale: AppLocale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const noPrefix = stripLocalePrefix(normalized);
  return noPrefix === "/" ? `/${locale}` : `/${locale}${noPrefix}`;
}

export function isInternalPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}
