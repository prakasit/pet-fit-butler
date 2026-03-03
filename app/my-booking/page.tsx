"use client";

import { useTranslations } from "next-intl";

import { BookingCard } from "@/components/ui/BookingCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { useMockData } from "@/mock/useMockData";

export default function MyBookingPage() {
  const tBooking = useTranslations("booking");
  const { bookingRecords } = useMockData();

  return (
    <div className="space-y-8">
      <PremiumCard
        title={tBooking("upcomingTitle")}
        subtitle={tBooking("upcomingSubtitle")}
      >
        <div className="space-y-4">
          {bookingRecords.length > 0 ? (
            bookingRecords.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p className="text-center text-sm text-text-muted">
              {tBooking("upcomingEmpty")}
            </p>
          )}
        </div>
      </PremiumCard>
    </div>
  );
}
