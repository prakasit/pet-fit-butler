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
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-sm text-soft-cream/80">{tProfile("heroTag")}</p>
        <h2 className="mt-1 text-3xl leading-tight">{tProfile("heroTitle", { name: firstName })}</h2>
        <p className="mt-2 text-sm text-soft-cream/80">{currentUserProfile.email}</p>
      </motion.section>

      <PremiumCard
        className="lg:hidden"
        title={tProfile("mobileLanguageTitle")}
        subtitle={tProfile("mobileLanguageSubtitle")}
      >
        <LanguageSwitcher />
      </PremiumCard>

      <PremiumCard
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
