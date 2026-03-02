"use client";

import Image from "next/image";
import { CarFront, Phone, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ButlerDriver } from "@/lib/types";
import { cn } from "@/lib/utils";

import { PremiumCard } from "./PremiumCard";
import { StatusBadge } from "./StatusBadge";

interface ButlerDriverCardProps {
  driver: ButlerDriver;
  etaMinutes: number;
  closeButton?: React.ReactNode;
  /** เมื่อ true ไม่ห่อด้วย PremiumCard แสดงเฉพาะเนื้อหา */
  noCard?: boolean;
}

export function ButlerDriverCard({ driver, etaMinutes, closeButton, noCard = false }: ButlerDriverCardProps) {
  const t = useTranslations("driverCard");

  const body = (
    <>
      {closeButton && (
        <div className="mb-4 flex justify-end">
          {closeButton}
        </div>
      )}
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
            <Star className="h-4 w-4 fill-joy-peach text-joy-peach" />
            {t("rating", { rating: driver.rating.toFixed(1) })}
          </p>
        </div>
      </div>
    </>
  );

  const etaLabel = t("eta", { minutes: etaMinutes });

  const etaPill = (
    <span
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full",
        "max-md:eta-pill-mobile max-md:inline-flex max-md:h-8 max-md:items-center max-md:justify-center max-md:border max-md:border-[rgba(143,175,155,0.35)] max-md:bg-[rgba(143,175,155,0.18)] max-md:px-4 max-md:text-[13px] max-md:font-medium max-md:text-[#0F1B2D]",
        "md:inline-flex md:items-center md:rounded-full md:px-3 md:py-1 md:text-xs md:font-semibold md:tracking-wide status-pulse md:bg-sage/36 md:text-brand-navy",
      )}
    >
      {etaLabel}
    </span>
  );

  if (noCard) {
    return (
      <div className="text-brand-navy">
        <div className="mb-7 flex flex-nowrap items-center justify-between gap-4">
          <h3 className="min-w-0 flex-1 wrap-break-word text-left text-[1.7rem] leading-tight text-brand-navy max-md:text-xl">
            {t("title")}
          </h3>
          {etaPill}
        </div>
        <p className="mb-4 text-sm text-text-muted">{t("subtitle")}</p>
        {body}
      </div>
    );
  }

  return (
    <PremiumCard
      title={t("title")}
      subtitle={t("subtitle")}
      action={<StatusBadge label={t("eta", { minutes: etaMinutes })} tone="active" />}
      className="!border-0 !ring-0 shadow-none outline-none"
    >
      <>{body}</>
    </PremiumCard>
  );
}
