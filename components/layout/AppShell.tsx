"use client";

import type { ReactNode } from "react";

import { CalendarDays } from "lucide-react";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/BrandLogo";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";
import { currentUserProfile, pets } from "@/mock";

interface AppShellProps {
  children: ReactNode;
}

const standaloneRoutes = ["/auth", "/offline"];
const pageTitles: Record<string, string> = {
  "/dashboard": "Home",
  "/booking": "Booking",
  "/health": "Activity",
  "/tracking": "Live",
  "/profile": "Profile",
  "/reports": "Activity",
  "/pets": "Activity",
  "/live-cam": "Live",
  "/gallery": "Activity",
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStandalone = standaloneRoutes.some((route) => pathname.startsWith(route));
  const firstName = currentUserProfile.name.split(" ")[0];
  const featuredPet = pets[0]?.name ?? "your pet";
  const title = pageTitles[pathname] ?? "Pet Fit Butler";
  const isBooking = pathname.startsWith("/booking");
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-soft-cream text-brand-navy lg:px-6 lg:py-5">
      <div className="mx-auto min-h-screen w-full bg-soft-cream md:max-w-[640px] md:border-x md:border-line-soft/60 md:shadow-premium-sm lg:max-w-[720px] lg:overflow-hidden lg:rounded-[34px]">
        <header className="sticky top-0 z-30 border-b border-line-soft/80 bg-soft-cream/95 px-5 pt-5 pb-4 backdrop-blur md:px-6 md:pt-6 md:pb-5">
          <div className="mb-4 flex items-center justify-between">
            <BrandLogo compact />
            <span className="inline-flex items-center gap-1 rounded-full bg-sage/30 px-3 py-1 text-xs font-semibold text-brand-navy">
              <CalendarDays className="h-3.5 w-3.5" />
              {today}
            </span>
          </div>
          <div className="space-y-2 rounded-[24px] border border-line-soft/60 bg-gradient-to-br from-beige/35 via-soft-cream/70 to-surface/75 p-5 shadow-premium-sm">
            <p className="text-xs tracking-[0.06em] text-text-muted">
              Good to see you, {firstName}
            </p>
            <h1
              className={cn(
                "leading-tight text-brand-navy",
                isBooking ? "text-[2.35rem] md:text-[2.65rem]" : "text-4xl md:text-[2.5rem]",
              )}
            >
              {title}
            </h1>
            <p className="text-sm text-text-muted">
              {featuredPet} is ready for a premium wellness day.
            </p>
          </div>
        </header>

        <main className="px-4 pt-6 pb-28 md:px-6 md:pt-7">{children}</main>
      </div>

      <BottomNav />
    </div>
  );
}
