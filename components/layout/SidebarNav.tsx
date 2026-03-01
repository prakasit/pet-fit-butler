"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/profile", label: "User Profile", icon: UserRound },
  { href: "/pets", label: "Pet Profile", icon: PawPrint },
  { href: "/health", label: "Health Dashboard", icon: Activity },
  { href: "/booking", label: "Booking System", icon: CalendarDays },
  { href: "/tracking", label: "Taxi Tracking", icon: MapPinned },
  { href: "/live-cam", label: "Live Cam", icon: Camera },
  { href: "/reports", label: "Daily Fit Report", icon: Activity },
  { href: "/gallery", label: "Gallery", icon: GalleryVerticalEnd },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[276px] shrink-0 border-r border-line-soft bg-surface/80 p-5 backdrop-blur lg:block">
      <BrandLogo />
      <nav className="mt-8">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-brand-navy text-soft-cream shadow-premium-sm"
                      : "text-text-muted hover:bg-brand-navy/8 hover:text-brand-navy",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
