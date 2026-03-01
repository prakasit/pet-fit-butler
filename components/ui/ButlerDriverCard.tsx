import Image from "next/image";
import { CarFront, Phone, Star } from "lucide-react";

import type { ButlerDriver } from "@/lib/types";

import { PremiumCard } from "./PremiumCard";
import { StatusBadge } from "./StatusBadge";

interface ButlerDriverCardProps {
  driver: ButlerDriver;
  etaMinutes: number;
}

export function ButlerDriverCard({ driver, etaMinutes }: ButlerDriverCardProps) {
  return (
    <PremiumCard
      title="Butler Driver"
      subtitle="Premium pet transfer in progress"
      action={<StatusBadge label={`${etaMinutes} min ETA`} tone="active" />}
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-line-soft bg-soft-cream">
          <Image
            src={driver.photoUrl}
            alt={driver.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-brand-navy">{driver.name}</p>
          <p className="flex items-center gap-2 text-text-muted">
            <CarFront className="h-4 w-4 text-sage" />
            {driver.vehicle}
          </p>
          <p className="flex items-center gap-2 text-text-muted">
            <Phone className="h-4 w-4 text-sage" />
            {driver.phone}
          </p>
          <p className="flex items-center gap-1 text-text-muted">
            <Star className="h-4 w-4 fill-gold text-gold" />
            {driver.rating.toFixed(1)} rating
          </p>
        </div>
      </div>
    </PremiumCard>
  );
}
