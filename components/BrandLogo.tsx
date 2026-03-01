"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
  href?: string;
}

export function BrandLogo({ compact = false, className, href = "/dashboard" }: BrandLogoProps) {
  const t = useTranslations("brand");

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="overflow-hidden bg-surface p-1">
        <Image
          src="/brand_logo.png"
          alt={t("logoAlt")}
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className="rounded-lg object-cover"
          priority
        />
      </div>
      {!compact && (
        <div>
          <p className="text-xs tracking-[0.18em] text-text-muted">{t("name")}</p>
          <p className="text-lg leading-tight text-brand-navy">{t("tagline")}</p>
        </div>
      )}
    </div>
  );

  return <LocaleLink href={href}>{content}</LocaleLink>;
}
