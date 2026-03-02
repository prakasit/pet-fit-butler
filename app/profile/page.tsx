"use client";

import { CreditCard, LocateFixed, Mail, Phone, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { BookingCard } from "@/components/ui/BookingCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { membershipTypeKey } from "@/lib/translation-keys";
import { useMockData } from "@/mock/useMockData";

export default function ProfilePage() {
  const tProfile = useTranslations("profile");
  const tMembership = useTranslations("membershipType");
  const { currentUserProfile } = useMockData();
  const firstName = currentUserProfile.name.split(" ")[0];

  const profileFields = [
    { label: tProfile("fields.fullName"), value: currentUserProfile.name, icon: UserRound },
    { label: tProfile("fields.phone"), value: currentUserProfile.phone, icon: Phone },
    { label: tProfile("fields.email"), value: currentUserProfile.email, icon: Mail },
    { label: tProfile("fields.address"), value: currentUserProfile.address, icon: LocateFixed },
    {
      label: tProfile("fields.coordinates"),
      value: `${currentUserProfile.coordinates.lat}, ${currentUserProfile.coordinates.lng}`,
      icon: LocateFixed,
    },
    {
      label: tProfile("fields.paymentMethod"),
      value: currentUserProfile.paymentMethod,
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-10 max-md:space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] border border-line-soft bg-surface px-6 py-7 text-brand-navy shadow-premium max-md:rounded-2xl max-md:px-4 max-md:py-6 max-md:shadow-[0_2px_12px_rgba(15,27,45,0.06)]"
      >
        <div className="max-md:space-y-3 md:space-y-0 md:[&>p]:mt-2 md:[&>h2]:mt-1">
          <p className="text-sm text-text-muted max-md:text-xs">{tProfile("heroTag")}</p>
          <h2 className="max-md:text-xl max-md:font-semibold max-md:leading-snug max-md:wrap-break-word md:mt-1 md:text-3xl md:leading-tight">
            <span className="md:hidden">{currentUserProfile.name}</span>
            <span className="hidden md:inline">{tProfile("heroTitle", { name: firstName })}</span>
          </h2>
          <p className="text-sm text-text-muted/70 max-md:text-xs md:mt-2">
            {currentUserProfile.email}
          </p>
        </div>
      </motion.section>

      <PremiumCard
        className="max-md:p-5 lg:hidden"
        title={tProfile("mobileLanguageTitle")}
        subtitle={tProfile("mobileLanguageSubtitle")}
      >
        <LanguageSwitcher />
      </PremiumCard>

      <PremiumCard
        className="max-md:p-5"
        title={currentUserProfile.name}
        subtitle={tProfile("membershipSubtitle")}
        action={
          <StatusBadge
            label={tMembership(membershipTypeKey[currentUserProfile.membershipType])}
            tone="active"
          />
        }
      >
        <div className="space-y-3">
          {profileFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="rounded-2xl bg-soft-cream p-5">
                <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-text-muted">
                  <Icon className="h-3.5 w-3.5 text-sage" />
                  {field.label}
                </p>
                <p className="mt-2 text-sm font-medium text-brand-navy">{field.value}</p>
              </div>
            );
          })}
        </div>
      </PremiumCard>

      <PremiumCard
        className="max-md:p-5"
        title={tProfile("bookingHistoryTitle")}
        subtitle={tProfile("bookingHistorySubtitle", { count: currentUserProfile.bookingHistory.length })}
      >
        <div className="space-y-3">
          {currentUserProfile.bookingHistory.slice(0, 8).map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
