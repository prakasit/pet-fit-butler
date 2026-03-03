"use client";

import { CheckCircle2, Calendar, Home, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { ElegantButton } from "@/components/ui/ElegantButton";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PremiumCard } from "@/components/ui/PremiumCard";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <PremiumCard>
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sage/20 text-sage">
            <CheckCircle2 className="h-12 w-12" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 text-2xl font-bold text-brand-navy max-md:text-xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm text-text-muted">
            {t("successMessage")}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <LocaleLink href="/my-booking" className="block">
            <ElegantButton
              type="button"
              fullWidth
              variant="primary"
              className="h-12 flex items-center justify-center gap-3"
            >
              <Calendar className="h-5 w-5" />
              {t("viewMyBooking")}
            </ElegantButton>
          </LocaleLink>
          <LocaleLink href="/booking" className="block">
            <ElegantButton
              type="button"
              fullWidth
              variant="secondary"
              className="h-12 flex items-center justify-center gap-3"
            >
              <PlusCircle className="h-5 w-5" />
              {t("bookMore")}
            </ElegantButton>
          </LocaleLink>
          <LocaleLink href="/" className="block">
            <ElegantButton
              type="button"
              fullWidth
              variant="ghost"
              className="h-12 flex items-center justify-center gap-3"
            >
              <Home className="h-5 w-5" />
              {t("backToHome")}
            </ElegantButton>
          </LocaleLink>
        </div>
      </PremiumCard>
    </div>
  );
}
