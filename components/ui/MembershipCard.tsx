"use client";

import { Crown, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { formatDate } from "@/lib/format";
import { membershipTypeKey } from "@/lib/translation-keys";
import type { MembershipStatus } from "@/lib/types";

import { PremiumCard } from "./PremiumCard";
import { StatusBadge } from "./StatusBadge";

interface MembershipCardProps {
  membership: MembershipStatus;
}

export function MembershipCard({ membership }: MembershipCardProps) {
  const locale = useLocale();
  const t = useTranslations("labels");
  const tMembershipCard = useTranslations("membershipCard");
  const tMembershipType = useTranslations("membershipType");

  return (
    <PremiumCard
      title={tMembershipCard("title")}
      subtitle={tMembershipCard("subtitle")}
      action={<StatusBadge label={tMembershipType(membershipTypeKey[membership.tier])} tone="active" />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-soft-cream p-3">
          <p className="text-xs uppercase tracking-wide text-text-muted">{t("coveragePeriod")}</p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">
            {formatDate(membership.startedAt, locale)} - {formatDate(membership.expiresAt, locale)}
          </p>
        </div>
        <div className="rounded-xl bg-soft-cream p-3">
          <p className="text-xs uppercase tracking-wide text-text-muted">{t("remainingVisits")}</p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">
            {t("sessions", { count: membership.visitsRemaining })}
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-text-muted">
        <p className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-joy-peach" />
          {t("conciergeTeam")}: {membership.conciergeContact}
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-sage" />
          {tMembershipCard("priority")}
        </p>
      </div>
    </PremiumCard>
  );
}
