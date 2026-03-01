import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

import { LocaleHydrationSync } from "@/components/i18n/LocaleHydrationSync";
import { AppShell } from "@/components/layout/AppShell";
import { DEFAULT_LOCALE, type AppLocale, isLocale } from "@/lib/i18n";
import enMessages from "@/messages/en.json";
import thMessages from "@/messages/th.json";

import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const allMessages = {
  th: thMessages,
  en: enMessages,
} as const;

async function getRequestLocale(): Promise<AppLocale> {
  const headerStore = await headers();
  const requestLocale = headerStore.get("x-locale");
  return isLocale(requestLocale) ? requestLocale : DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const messages = allMessages[locale];

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/icons/icon-192.svg", type: "image/svg+xml" },
        { url: "/icons/icon-512.svg", type: "image/svg+xml" },
      ],
      apple: "/icons/icon-192.svg",
    },
    appleWebApp: {
      capable: true,
      title: messages.meta.appleTitle,
      statusBarStyle: "black-translucent",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4E6D6",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const messages = allMessages[locale];

  return (
    <html lang={locale}>
      <body className={`${notoSansThai.variable} ${notoSerifThai.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleHydrationSync locale={locale} />
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
