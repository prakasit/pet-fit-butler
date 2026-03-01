import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarClock,
  Camera,
  FileHeart,
  MapPinned,
  PawPrint,
} from "lucide-react";

import { BookingCard } from "@/components/ui/BookingCard";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { HealthChart } from "@/components/ui/HealthChart";
import { MembershipCard } from "@/components/ui/MembershipCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatTime } from "@/lib/format";
import {
  butlerStatus,
  dailyActivitySeries,
  dashboardActivities,
  membershipStatus,
  pets,
  upcomingBookings,
} from "@/mock";

const quickActions = [
  {
    href: "/booking",
    label: "Book Session",
    icon: CalendarClock,
  },
  {
    href: "/tracking",
    label: "Track Butler",
    icon: MapPinned,
  },
  {
    href: "/live-cam",
    label: "Open Live Cam",
    icon: Camera,
  },
  {
    href: "/reports",
    label: "Daily Fit Reports",
    icon: FileHeart,
  },
];

export default function DashboardPage() {
  const nextBooking = upcomingBookings[0];
  const averageWeight =
    pets.reduce((sum, pet) => sum + pet.currentWeightKg, 0) / Math.max(1, pets.length);
  const totalCaloriesWeek = dailyActivitySeries.reduce(
    (sum, day) => sum + Number(day.calories),
    0,
  );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">PREMIUM PET WELLNESS</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">Dashboard</h1>
      </header>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MembershipCard membership={membershipStatus} />
        </div>

        <PremiumCard title="Pet Health Summary" subtitle="Across 15 active pets">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-soft-cream p-3">
              <p className="text-text-muted">Active Pets</p>
              <p className="mt-1 text-xl font-semibold text-brand-navy">{pets.length}</p>
            </div>
            <div className="rounded-xl bg-soft-cream p-3">
              <p className="text-text-muted">Avg Weight</p>
              <p className="mt-1 text-xl font-semibold text-brand-navy">
                {averageWeight.toFixed(1)} kg
              </p>
            </div>
            <div className="rounded-xl bg-soft-cream p-3">
              <p className="text-text-muted">Bookings Ahead</p>
              <p className="mt-1 text-xl font-semibold text-brand-navy">{upcomingBookings.length}</p>
            </div>
            <div className="rounded-xl bg-soft-cream p-3">
              <p className="text-text-muted">Weekly Calories</p>
              <p className="mt-1 text-xl font-semibold text-brand-navy">{totalCaloriesWeek}</p>
            </div>
          </div>
        </PremiumCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PremiumCard title="Quick Actions" subtitle="One tap concierge tools" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <div className="group flex items-center justify-between rounded-xl border border-line-soft bg-soft-cream p-4 transition hover:-translate-y-0.5 hover:shadow-premium-sm">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-navy text-soft-cream">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-semibold text-brand-navy">{action.label}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-text-muted transition group-hover:text-brand-navy" />
                  </div>
                </Link>
              );
            })}
          </div>
        </PremiumCard>

        <PremiumCard title="Butler Status" subtitle={butlerStatus.shiftName}>
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-brand-navy">{butlerStatus.butlerName}</p>
            <p className="text-text-muted">{butlerStatus.currentTask}</p>
            <StatusBadge
              label={butlerStatus.isActive ? "ACTIVE" : "IDLE"}
              tone={butlerStatus.isActive ? "active" : "neutral"}
            />
          </div>
        </PremiumCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <PremiumCard
          className="xl:col-span-2"
          title="Daily Activity"
          subtitle="Calories and movement distance"
        >
          <HealthChart
            data={dailyActivitySeries}
            xKey="day"
            chartType="line"
            series={[
              { key: "calories", label: "Calories", color: "#0F1B2D" },
              { key: "distanceKm", label: "Distance (km)", color: "#8FAF9B" },
            ]}
          />
        </PremiumCard>

        <PremiumCard title="Next Booking" subtitle="Closest scheduled session">
          {nextBooking ? (
            <div className="space-y-3 text-sm text-text-muted">
              <p className="text-xl font-semibold text-brand-navy">{nextBooking.petName}</p>
              <p>{nextBooking.serviceName}</p>
              <p>
                {formatDate(nextBooking.date)} at {formatTime(nextBooking.date)} ({nextBooking.timeSlot})
              </p>
              <StatusBadge label={nextBooking.status} tone="warning" />
              <Link href="/booking" className="block pt-2">
                <ElegantButton variant="secondary" fullWidth>
                  Manage Booking
                </ElegantButton>
              </Link>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No upcoming sessions right now.</p>
          )}
        </PremiumCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <PremiumCard
          title="Recent Activities"
          subtitle="20 latest wellness updates"
          className="xl:col-span-2"
        >
          <ul className="space-y-3">
            {dashboardActivities.slice(0, 8).map((activity) => (
              <li
                key={activity.id}
                className="flex items-start justify-between gap-3 rounded-xl bg-soft-cream p-3"
              >
                <div className="flex items-start gap-2">
                  <Activity className="mt-0.5 h-4 w-4 text-sage" />
                  <div>
                    <p className="text-sm font-medium text-brand-navy">{activity.summary}</p>
                    <p className="text-xs text-text-muted">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
                <StatusBadge label={activity.petName} tone="neutral" />
              </li>
            ))}
          </ul>
        </PremiumCard>

        <PremiumCard title="Upcoming Queue" subtitle="Scheduled pickup flow">
          <div className="space-y-3">
            {upcomingBookings.slice(0, 2).map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
          <div className="mt-3 text-xs text-text-muted">
            Showing 2 of {upcomingBookings.length} upcoming bookings.
          </div>
        </PremiumCard>
      </div>

      <div className="rounded-2xl border border-line-soft bg-brand-navy p-5 text-soft-cream shadow-premium">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <PawPrint className="h-4 w-4 text-gold" />
            <p className="text-sm">Your pet wellness concierge is fully prepared for today.</p>
          </div>
          <Link href="/tracking">
            <ElegantButton variant="secondary">Open Live Tracking</ElegantButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
