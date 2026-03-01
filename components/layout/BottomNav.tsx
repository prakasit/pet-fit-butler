"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarRange,
  FileHeart,
  Gauge,
  Image as ImageIcon,
  PawPrint,
  Radar,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Gauge },
  { href: "/pets", label: "Pets", icon: PawPrint },
  { href: "/booking", label: "Booking", icon: CalendarRange },
  { href: "/tracking", label: "Tracking", icon: Radar },
  { href: "/reports", label: "Reports", icon: FileHeart },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-line-soft bg-soft-cream/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-2xl grid-cols-7 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] transition",
                  active
                    ? "bg-brand-navy text-soft-cream shadow-premium-sm"
                    : "text-text-muted hover:bg-brand-navy/10",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
