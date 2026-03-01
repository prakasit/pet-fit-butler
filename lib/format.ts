import { resolveLocale, type AppLocale } from "@/lib/i18n";

const localeMap: Record<AppLocale, string> = {
  th: "th-TH",
  en: "en-US",
};

const dateFormatterCache = new Map<AppLocale, Intl.DateTimeFormat>();
const timeFormatterCache = new Map<AppLocale, Intl.DateTimeFormat>();
const currencyFormatterCache = new Map<AppLocale, Intl.NumberFormat>();

const getDateFormatter = (locale: AppLocale) => {
  const cached = dateFormatterCache.get(locale);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  dateFormatterCache.set(locale, formatter);
  return formatter;
};

const getTimeFormatter = (locale: AppLocale) => {
  const cached = timeFormatterCache.get(locale);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat(localeMap[locale], {
    hour: "2-digit",
    minute: "2-digit",
  });
  timeFormatterCache.set(locale, formatter);
  return formatter;
};

const getCurrencyFormatter = (locale: AppLocale) => {
  const cached = currencyFormatterCache.get(locale);
  if (cached) return cached;
  const formatter = new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });
  currencyFormatterCache.set(locale, formatter);
  return formatter;
};

export const formatDate = (date: Date | string, locale: AppLocale | string = "th") =>
  getDateFormatter(resolveLocale(locale)).format(new Date(date));

export const formatTime = (date: Date | string, locale: AppLocale | string = "th") =>
  getTimeFormatter(resolveLocale(locale)).format(new Date(date));

export const formatCurrency = (amount: number, locale: AppLocale | string = "th") =>
  getCurrencyFormatter(resolveLocale(locale)).format(amount);

export const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
