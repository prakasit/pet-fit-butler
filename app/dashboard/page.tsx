"use client";

import Link from "next/link";
import {
  Activity,
  CalendarClock,
  FileHeart,
  MapPin,
  MapPinned,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { HeroVideoSection } from "@/components/storytelling/HeroVideoSection";
import { StoryImageBlock } from "@/components/storytelling/StoryImageBlock";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatTime } from "@/lib/format";
import {
  butlerStatus,
  currentUserProfile,
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
    href: "/reports",
    label: "View Reports",
    icon: FileHeart,
  },
];

export default function DashboardPage() {
  const nextBooking = upcomingBookings[0];
  const featuredPet = pets[0]?.name ?? "Milo";
  const firstName = currentUserProfile.name.split(" ")[0];
  const averageWeight =
    pets.reduce((sum, pet) => sum + pet.currentWeightKg, 0) / Math.max(1, pets.length);
  const totalCaloriesWeek = dailyActivitySeries.reduce(
    (sum, day) => sum + Number(day.calories),
    0,
  );

  return (
    <div className="space-y-10">
      <div className="-mx-4 md:-mx-6">
        <HeroVideoSection />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy p-6 text-soft-cream shadow-premium"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-sm text-soft-cream/80">Welcome back, {firstName}</p>
            <h2 className="mt-1 text-[1.95rem] leading-tight">
              {featuredPet}&apos;s wellness day
            </h2>
          </div>
          <StatusBadge
            label={membershipStatus.tier}
            tone="warning"
            className="bg-joy-peach/40 text-soft-cream"
          />
        </div>
        <p className="text-sm text-soft-cream/85">
          Dedicated concierge support is active, and all metrics are within a healthy premium range.
        </p>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.35 }}>
        <PremiumCard title="Next Booking" subtitle="Your upcoming concierge session">
          {nextBooking ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-soft-cream p-5">
                <p className="text-2xl text-brand-navy">{nextBooking.petName}</p>
                <p className="mt-1 text-sm text-text-muted">{nextBooking.serviceName}</p>
                <p className="mt-3 text-sm text-brand-navy">
                  {formatDate(nextBooking.date)} · {formatTime(nextBooking.date)} ({nextBooking.timeSlot})
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <StatusBadge label={nextBooking.status} tone="warning" />
                  <span className="text-xs text-text-muted">{upcomingBookings.length} sessions lined up</span>
                </div>
              </div>
              <Link href="/booking">
                <ElegantButton fullWidth>Manage Booking</ElegantButton>
              </Link>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No upcoming session right now.</p>
          )}
        </PremiumCard>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
        <PremiumCard title="Butler Live Status" subtitle={butlerStatus.shiftName}>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-soft-cream p-4">
              <div>
                <p className="text-base font-semibold text-brand-navy">{butlerStatus.butlerName}</p>
                <p className="text-sm text-text-muted">{butlerStatus.currentTask}</p>
              </div>
              <StatusBadge
                label={butlerStatus.isActive ? "ACTIVE NOW" : "STANDBY"}
                tone={butlerStatus.isActive ? "active" : "neutral"}
              />
            </div>
            <Link href="/tracking">
              <ElegantButton variant="secondary" fullWidth>
                <MapPinned className="mr-2 h-4 w-4" />
                Track Butler Ride
              </ElegantButton>
            </Link>
          </div>
        </PremiumCard>
      </motion.section>

      <StoryImageBlock
        title="Warm Butler Care, Every Step"
        caption="Dedicated handling with gentle trust-building and joyful engagement."
        imageUrl="https://assets.mixkit.co/videos/42736/42736-thumb-720-0.jpg"
        alt="A woman warmly interacting with a dog on a sunny lawn"
      />

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }}>
        <PremiumCard title="Quick Actions" subtitle="Simple, one-tap flow">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <div className="min-w-[180px] rounded-2xl bg-soft-cream p-4 transition hover:-translate-y-0.5 hover:shadow-premium-sm">
                    <Icon className="h-5 w-5 text-brand-navy" />
                    <p className="mt-4 text-sm font-semibold text-brand-navy">{action.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </PremiumCard>
      </motion.section>

      <StoryImageBlock
        title="Hydro Therapy That Feels Like Play"
        caption="Premium swim sessions designed to strengthen, recover, and brighten every day."
        imageUrl="https://assets.mixkit.co/videos/13950/13950-thumb-720-0.jpg"
        alt="Puppy swimming happily in warm therapy water"
      />

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.35 }}>
        <PremiumCard title="Daily Activity Curve" subtitle="Smooth movement and calorie trend">
          <HealthChart
            data={dailyActivitySeries}
            xKey="day"
            chartType="line"
            series={[
              { key: "calories", label: "Calories", color: "#1B2A41" },
              { key: "distanceKm", label: "Distance (km)", color: "#5FBF9F" },
            ]}
          />
          <div className="mt-4 flex gap-3 text-sm">
            <div className="rounded-2xl bg-soft-cream px-4 py-3">
              <p className="text-xs text-text-muted">Average Weight</p>
              <p className="text-lg font-semibold text-brand-navy">{averageWeight.toFixed(1)} kg</p>
            </div>
            <div className="rounded-2xl bg-soft-cream px-4 py-3">
              <p className="text-xs text-text-muted">Weekly Calories</p>
              <p className="text-lg font-semibold text-brand-navy">{totalCaloriesWeek}</p>
            </div>
          </div>
        </PremiumCard>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.35 }}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl text-brand-navy">Recent Highlights</h2>
          <span className="text-xs uppercase tracking-[0.14em] text-text-muted">Swipe</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {dashboardActivities.slice(0, 10).map((activity) => (
            <article
              key={activity.id}
              className="min-w-[260px] rounded-2xl border border-line-soft bg-surface p-5 shadow-premium-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/25">
                  <Activity className="h-4 w-4 text-brand-navy" />
                </span>
                <StatusBadge label={activity.petName} tone="success" />
              </div>
              <p className="text-sm font-medium text-brand-navy">{activity.summary}</p>
              <p className="mt-2 text-xs text-text-muted">{formatDate(activity.timestamp)}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
        className="rounded-2xl border border-line-soft bg-surface px-5 py-4 shadow-premium-sm"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-joy-sky/70">
            <Sparkles className="h-4 w-4 text-brand-navy" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-brand-navy">Wellness Concierge Note</p>
            <p className="text-sm text-text-muted">
              Route pickup points are ready for {pets.length} active pets.{" "}
              <Link href="/tracking" className="inline-flex items-center gap-1 text-brand-navy underline-offset-2 hover:underline">
                <MapPin className="h-3.5 w-3.5" />
                Open live route
              </Link>
            </p>
          </div>
        </div>
      </motion.section>

      <StoryImageBlock
        title="Shared Moments, Healthier Memories"
        caption="Fitness, affection, and family joy woven into every wellness routine."
        imageUrl="https://assets.mixkit.co/videos/42727/42727-thumb-720-0.jpg"
        alt="Happy couple petting their dog outdoors"
      />
    </div>
  );
}
