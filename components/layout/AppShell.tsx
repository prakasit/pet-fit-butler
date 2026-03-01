"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { stripLocalePrefix } from "@/lib/i18n";
import { useMockData } from "@/mock/useMockData";

interface AppShellProps {
  children: ReactNode;
}

const standaloneRoutes = ["/auth", "/offline"];
export function AppShell({ children }: AppShellProps) {
  const tRoute = useTranslations("routeTitles");
  const tAppShell = useTranslations("appShell");
  const locale = useLocale();
  const pathname = usePathname();
  const cleanPathname = stripLocalePrefix(pathname || "/");
  const { currentUserProfile, pets } = useMockData();
  const isStandalone = standaloneRoutes.some((route) => cleanPathname.startsWith(route));
  const firstName = currentUserProfile.name.split(" ")[0] ?? currentUserProfile.name;
  const featuredPet = pets[0]?.name ?? tAppShell("featuredPetFallback");

  const routeKeyMap: Record<string, string> = {
    "/": "dashboard",
    "/dashboard": "dashboard",
    "/booking": "booking",
    "/health": "health",
    "/tracking": "tracking",
    "/profile": "profile",
    "/reports": "reports",
    "/pets": "pets",
    "/live-cam": "liveCam",
    "/gallery": "gallery",
  };

  const titleKey = routeKeyMap[cleanPathname] ?? "fallback";
  const title = tRoute(titleKey);
  const localeCode = locale === "en" ? "en-US" : "th-TH";
  const today = new Intl.DateTimeFormat(localeCode, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="lg:hidden">
        <MobileLayout title={title} firstName={firstName} featuredPet={featuredPet} today={today}>
          {children}
        </MobileLayout>
      </div>
      <div className="hidden lg:block">
        <DesktopLayout pathname={cleanPathname}>{children}</DesktopLayout>
      </div>
    </>
  );
}
