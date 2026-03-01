"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { pageTitleThai } from "@/lib/thai";
import { currentUserProfile, pets } from "@/mock";

interface AppShellProps {
  children: ReactNode;
}

const standaloneRoutes = ["/auth", "/offline"];
export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStandalone = standaloneRoutes.some((route) => pathname.startsWith(route));
  const firstName = currentUserProfile.name.split(" ")[0];
  const featuredPet = pets[0]?.name ?? "ลูกรัก";
  const title = pageTitleThai[pathname] ?? "เพ็ท ฟิต บัตเลอร์";
  const today = new Intl.DateTimeFormat("th-TH", {
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
        <DesktopLayout pathname={pathname}>{children}</DesktopLayout>
      </div>
    </>
  );
}
