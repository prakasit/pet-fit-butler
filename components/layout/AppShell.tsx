"use client";

import type { ReactNode } from "react";

import { ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/BrandLogo";
import { BottomNav } from "@/components/layout/BottomNav";
import { SidebarNav } from "@/components/layout/SidebarNav";

interface AppShellProps {
  children: ReactNode;
}

const standaloneRoutes = ["/auth", "/offline"];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStandalone = standaloneRoutes.some((route) => pathname.startsWith(route));

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-soft-cream text-brand-navy">
      <div className="mx-auto flex w-full max-w-[1280px]">
        <SidebarNav />

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-line-soft bg-soft-cream/95 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between">
              <BrandLogo compact />
              <span className="inline-flex items-center gap-1 rounded-full bg-sage/30 px-3 py-1 text-xs font-semibold text-brand-navy">
                <ShieldCheck className="h-3.5 w-3.5" />
                Wellness Secure
              </span>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 pb-24 md:px-6 md:py-6 md:pb-8">{children}</main>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
