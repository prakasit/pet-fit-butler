"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Activity,
  CalendarDays,
  Camera,
  Gauge,
  GalleryVerticalEnd,
  MapPinned,
  PawPrint,
  UserRound,
} from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { stripLocalePrefix } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const tNav = useTranslations("nav");
  const tRoutes = useTranslations("routeTitles");
  const pathname = usePathname();
  const cleanPathname = stripLocalePrefix(pathname || "/");
  const activePath = cleanPathname === "/" ? "/dashboard" : cleanPathname;

  const navigation = [
    { href: "/dashboard", label: tNav("home"), icon: Gauge },
    { href: "/profile", label: tNav("profile"), icon: UserRound },
    { href: "/pets", label: tRoutes("pets"), icon: PawPrint },
    { href: "/health", label: tNav("activity"), icon: Activity },
    { href: "/booking", label: tNav("booking"), icon: CalendarDays },
    { href: "/tracking", label: tRoutes("tracking"), icon: MapPinned },
    { href: "/live-cam", label: tRoutes("liveCam"), icon: Camera },
    { href: "/reports", label: tRoutes("reports"), icon: Activity },
    { href: "/gallery", label: tRoutes("gallery"), icon: GalleryVerticalEnd },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-[276px] shrink-0 border-r border-line-soft bg-surface/80 p-5 backdrop-blur lg:block">
      <BrandLogo />
      <nav className="mt-8">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = activePath.startsWith(item.href);

            return (
              <li key={item.href}>
                <LocaleLink
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-sage text-white shadow-premium-sm"
                      : "text-text-muted hover:bg-soft-cream hover:text-brand-navy",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </LocaleLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
