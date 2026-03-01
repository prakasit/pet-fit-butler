import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import enMessages from "@/messages/en.json";
import thMessages from "@/messages/th.json";

const allMessages = {
  th: thMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async () => {
  const headerStore = await headers();
  const requestedLocale = headerStore.get("x-locale");
  const locale = isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;

  return {
    locale,
    messages: allMessages[locale],
  };
});
