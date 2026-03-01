"use client";

import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandLogo } from "@/components/BrandLogo";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";

export default function AuthPage() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tCta = useTranslations("cta");

  return (
    <div className="grid min-h-screen place-items-center bg-soft-cream px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <BrandLogo compact={false} href="/dashboard" />
        </div>

        <PremiumCard
          title={tAuth("title")}
          subtitle={tAuth("subtitle")}
        >
          <form className="space-y-4">
            <label className="block space-y-1">
              <span className="text-sm text-text-muted">{tAuth("emailLabel")}</span>
              <input
                type="email"
                placeholder={tAuth("emailPlaceholder")}
                className="h-11 w-full rounded-xl border border-line-soft bg-soft-cream px-3 text-sm text-brand-navy focus:border-sage focus:outline-none"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm text-text-muted">{tAuth("passwordLabel")}</span>
              <input
                type="password"
                placeholder={tAuth("passwordPlaceholder")}
                className="h-11 w-full rounded-xl border border-line-soft bg-soft-cream px-3 text-sm text-brand-navy focus:border-sage focus:outline-none"
              />
            </label>
            <ElegantButton fullWidth type="button">
              <LockKeyhole className="mr-2 h-4 w-4" />
              {tCta("signIn")}
            </ElegantButton>
          </form>

          <div className="mt-4 rounded-xl bg-sage/20 p-3 text-xs text-brand-navy">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              {tAuth("securityNote", { mode: tCommon("mockMode") })}
            </p>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
