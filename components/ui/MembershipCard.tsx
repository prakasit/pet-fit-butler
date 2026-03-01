import { Crown, ShieldCheck } from "lucide-react";

import { formatDate } from "@/lib/format";
import { membershipTypeThai } from "@/lib/thai";
import type { MembershipStatus } from "@/lib/types";

import { PremiumCard } from "./PremiumCard";
import { StatusBadge } from "./StatusBadge";

interface MembershipCardProps {
  membership: MembershipStatus;
}

export function MembershipCard({ membership }: MembershipCardProps) {
  return (
    <PremiumCard
      title="สถานะแพ็กเกจสมาชิก"
      subtitle="ครอบคลุมการดูแลสุขภาพและทีมผู้ช่วยเฉพาะทาง"
      action={<StatusBadge label={membershipTypeThai[membership.tier]} tone="active" />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-soft-cream p-3">
          <p className="text-xs uppercase tracking-wide text-text-muted">ระยะเวลาความคุ้มครอง</p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">
            {formatDate(membership.startedAt)} - {formatDate(membership.expiresAt)}
          </p>
        </div>
        <div className="rounded-xl bg-soft-cream p-3">
          <p className="text-xs uppercase tracking-wide text-text-muted">จำนวนครั้งคงเหลือ</p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">
            {membership.visitsRemaining} ครั้ง
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-text-muted">
        <p className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-joy-peach" />
          ทีมผู้ช่วยเฉพาะทาง: {membership.conciergeContact}
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-sage" />
          สิทธิ์นัดหมายลำดับพิเศษพร้อมแผนฟื้นฟูมาตรฐานพรีเมียม
        </p>
      </div>
    </PremiumCard>
  );
}
