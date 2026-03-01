import { CreditCard, LocateFixed, Mail, Phone, UserRound } from "lucide-react";

import { BookingCard } from "@/components/ui/BookingCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { currentUserProfile } from "@/mock";

const profileFields = [
  { label: "Name", value: currentUserProfile.name, icon: UserRound },
  { label: "Phone", value: currentUserProfile.phone, icon: Phone },
  { label: "Email", value: currentUserProfile.email, icon: Mail },
  { label: "Address", value: currentUserProfile.address, icon: LocateFixed },
  {
    label: "GPS Coordinates",
    value: `${currentUserProfile.coordinates.lat}, ${currentUserProfile.coordinates.lng}`,
    icon: LocateFixed,
  },
  {
    label: "Payment Method",
    value: currentUserProfile.paymentMethod,
    icon: CreditCard,
  },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">OWNER ACCOUNT</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">User Profile</h1>
      </header>

      <PremiumCard
        title={currentUserProfile.name}
        subtitle="Luxury membership account"
        action={<StatusBadge label={currentUserProfile.membershipType} tone="active" />}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {profileFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="rounded-xl bg-soft-cream p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-text-muted">
                  <Icon className="h-3.5 w-3.5 text-sage" />
                  {field.label}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-navy">{field.value}</p>
              </div>
            );
          })}
        </div>
      </PremiumCard>

      <PremiumCard
        title="Booking History"
        subtitle={`${currentUserProfile.bookingHistory.length} premium sessions`}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {currentUserProfile.bookingHistory.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
