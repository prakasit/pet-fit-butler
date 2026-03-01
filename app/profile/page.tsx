"use client";

import { CreditCard, LocateFixed, Mail, Phone, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import { BookingCard } from "@/components/ui/BookingCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { membershipTypeThai } from "@/lib/thai";
import { currentUserProfile } from "@/mock";

const profileFields = [
  { label: "ชื่อ-นามสกุล", value: currentUserProfile.name, icon: UserRound },
  { label: "เบอร์โทรศัพท์", value: currentUserProfile.phone, icon: Phone },
  { label: "อีเมล", value: currentUserProfile.email, icon: Mail },
  { label: "ที่อยู่", value: currentUserProfile.address, icon: LocateFixed },
  {
    label: "พิกัดรับ-ส่ง",
    value: `${currentUserProfile.coordinates.lat}, ${currentUserProfile.coordinates.lng}`,
    icon: LocateFixed,
  },
  {
    label: "ช่องทางชำระเงิน",
    value: currentUserProfile.paymentMethod,
    icon: CreditCard,
  },
];

export default function ProfilePage() {
  const firstName = currentUserProfile.name.split(" ")[0];

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-sm text-soft-cream/80">ภาพรวมโปรไฟล์</p>
        <h2 className="mt-1 text-3xl leading-tight">บัญชีสมาชิกของคุณ {firstName}</h2>
        <p className="mt-2 text-sm text-soft-cream/80">{currentUserProfile.email}</p>
      </motion.section>

      <PremiumCard
        title={currentUserProfile.name}
        subtitle="บัญชีแพ็กเกจดูแลสุขภาพลูกรัก"
        action={<StatusBadge label={membershipTypeThai[currentUserProfile.membershipType]} tone="active" />}
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
        title="ประวัติการจองบริการ"
        subtitle={`ทั้งหมด ${currentUserProfile.bookingHistory.length} รายการ`}
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
