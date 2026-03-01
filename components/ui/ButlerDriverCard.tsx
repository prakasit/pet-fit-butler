"use client";

import Image from "next/image";
import { CarFront, Phone, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ButlerDriver } from "@/lib/types";

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

  if (noCard) {
    return (
      <div className="text-brand-navy">
        <div className="mb-7 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-[1.7rem] leading-tight text-brand-navy">{t("title")}</h3>
            <p className="text-sm text-text-muted">{t("subtitle")}</p>
          </div>
          <StatusBadge label={t("eta", { minutes: etaMinutes })} tone="active" />
        </div>
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
