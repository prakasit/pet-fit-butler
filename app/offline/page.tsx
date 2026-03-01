"use client";

import { CloudOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandLogo } from "@/components/BrandLogo";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";

export default function OfflinePage() {
  const tOffline = useTranslations("offline");
  const tCta = useTranslations("cta");

  return (
    <div className="grid min-h-screen place-items-center bg-soft-cream px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-center">
          <BrandLogo />
        </div>
        <PremiumCard
          title={tOffline("title")}
          subtitle={tOffline("subtitle")}
        >
          <div className="space-y-4 text-sm text-text-muted">
            <p className="flex items-center gap-2">
              <CloudOff className="h-4 w-4 text-sage" />
              {tOffline("description")}
            </p>
            <LocaleLink href="/dashboard">
              <ElegantButton type="button">{tCta("openCachedDashboard")}</ElegantButton>
            </LocaleLink>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
