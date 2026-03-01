import { CalendarDays, Clock3, PawPrint } from "lucide-react";

import { formatCurrency, formatDate } from "@/lib/format";
import type { BookingRecord } from "@/lib/types";

import { PremiumCard } from "./PremiumCard";
import { StatusBadge } from "./StatusBadge";

interface BookingCardProps {
  booking: BookingRecord;
}

const statusTone = (status: BookingRecord["status"]) => {
  if (status === "Completed") return "success";
  if (status === "In Progress") return "active";
  if (status === "Cancelled") return "danger";
  return "warning";
};

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <PremiumCard
      className="h-full"
      title={booking.serviceName}
      subtitle={booking.serviceCategory}
      action={<StatusBadge label={booking.status} tone={statusTone(booking.status)} />}
    >
      <div className="space-y-2 text-sm text-text-muted">
        <p className="flex items-center gap-2">
          <PawPrint className="h-4 w-4 text-sage" />
          {booking.petName}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-sage" />
          {formatDate(booking.date)}
        </p>
        <p className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-sage" />
          {booking.timeSlot}
        </p>
        <p className="font-semibold text-brand-navy">{formatCurrency(booking.totalPrice)}</p>
      </div>
      {booking.addOns.length > 0 && (
        <div className="mt-3 rounded-xl bg-soft-cream p-3 text-xs text-text-muted">
          Add-ons: {booking.addOns.join(", ")}
        </div>
      )}
    </PremiumCard>
  );
}
