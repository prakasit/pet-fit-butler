"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  CalendarClock,
  HeartHandshake,
  FileHeart,
  MapPinned,
  PawPrint,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { HeroVideoSection } from "@/components/storytelling/HeroVideoSection";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatTime } from "@/lib/format";
import {
  butlerStatus,
  dailyActivitySeries,
  dashboardActivities,
  membershipStatus,
  pets,
  services,
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

const testimonialItems = [
  {
    id: "t-1",
    quote:
      "The butler team transformed Luna’s energy in just a few weeks. It feels both premium and deeply caring.",
    name: "Nattaporn S.",
  },
  {
    id: "t-2",
    quote:
      "From pickup tracking to hydro therapy, every touchpoint feels thoughtful and trustworthy.",
    name: "Thanawat L.",
  },
  {
    id: "t-3",
    quote:
      "Our dog now gets excited when the butler arrives. The app experience is warm and effortlessly clear.",
    name: "Pimchanok C.",
  },
];

const galleryShowcase = [
  {
    id: "g-1",
    title: "Joyful Park Sprint",
    imageUrl: "https://assets.mixkit.co/videos/45843/45843-thumb-720-3.jpg",
  },
  {
    id: "g-2",
    title: "Hydro Recovery",
    imageUrl: "https://assets.mixkit.co/videos/13950/13950-thumb-720-0.jpg",
  },
  {
    id: "g-3",
    title: "Butler Bonding",
    imageUrl: "https://assets.mixkit.co/videos/42736/42736-thumb-720-0.jpg",
  },
  {
    id: "g-4",
    title: "Family Wellness",
    imageUrl: "https://assets.mixkit.co/videos/42727/42727-thumb-720-0.jpg",
  },
];

export default function DashboardPage() {
  const nextBooking = upcomingBookings[0];
  const featuredPet = pets[0]?.name ?? "Milo";
  const averageWeight =
    pets.reduce((sum, pet) => sum + pet.currentWeightKg, 0) / Math.max(1, pets.length);
  const totalCaloriesWeek = dailyActivitySeries.reduce(
    (sum, day) => sum + Number(day.calories),
    0,
  );

  return (
    <>
      <div className="space-y-8 lg:hidden">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[28px] bg-brand-navy p-6 text-soft-cream shadow-premium"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-sm text-soft-cream/80">Wellness Membership</p>
              <h2 className="mt-1 text-[1.95rem] leading-tight">{featuredPet}&apos;s journey</h2>
            </div>
            <StatusBadge
              label={membershipStatus.tier}
              tone="warning"
              className="bg-joy-peach/45 text-soft-cream"
            />
          </div>
          <p className="text-sm text-soft-cream/85">
            {membershipStatus.visitsRemaining} premium visits remaining in this cycle.
          </p>
        </motion.section>

        <PremiumCard title="Next Booking" subtitle="Upcoming concierge session">
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

        <PremiumCard title="Quick Actions" subtitle="Fast wellness controls">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <div className="rounded-2xl bg-soft-cream p-4 shadow-premium-sm transition hover:-translate-y-0.5">
                    <Icon className="h-5 w-5 text-brand-navy" />
                    <p className="mt-3 text-sm font-semibold text-brand-navy">{action.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </PremiumCard>

        <PremiumCard title="Daily Activity" subtitle="Calories and movement trend">
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

        <div>
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
        </div>
      </div>

      <div className="hidden space-y-10 lg:block">
        <HeroVideoSection />

        <section className="grid gap-6 xl:grid-cols-3">
          <PremiumCard title="Membership Tier" subtitle="Premium coverage">
            <p className="text-4xl leading-none text-brand-navy">{membershipStatus.tier}</p>
            <p className="mt-3 text-sm text-text-muted">
              Coverage until {formatDate(membershipStatus.expiresAt)}
            </p>
          </PremiumCard>
          <PremiumCard title="Visits Remaining" subtitle="Current cycle">
            <p className="text-5xl leading-none text-brand-navy">{membershipStatus.visitsRemaining}</p>
            <p className="mt-3 text-sm text-text-muted">Reserved for wellness and hydro sessions.</p>
          </PremiumCard>
          <PremiumCard title="Concierge Contact" subtitle="Direct support">
            <p className="text-2xl text-brand-navy">{membershipStatus.conciergeContact}</p>
            <p className="mt-3 text-sm text-text-muted">
              Dedicated butler concierge available every day.
            </p>
          </PremiumCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <PremiumCard className="xl:col-span-2" title="Weekly Activity Insights" subtitle="Movement and calorie trends">
            <HealthChart
              data={dailyActivitySeries}
              xKey="day"
              chartType="line"
              series={[
                { key: "calories", label: "Calories", color: "#1B2A41" },
                { key: "distanceKm", label: "Distance (km)", color: "#5FBF9F" },
              ]}
            />
          </PremiumCard>
          <PremiumCard title="Next Booking" subtitle="Closest upcoming session">
            {nextBooking ? (
              <div className="space-y-3">
                <p className="text-xl text-brand-navy">{nextBooking.petName}</p>
                <p className="text-sm text-text-muted">{nextBooking.serviceName}</p>
                <p className="text-sm text-brand-navy">
                  {formatDate(nextBooking.date)} · {formatTime(nextBooking.date)}
                </p>
                <StatusBadge label={nextBooking.status} tone="warning" />
                <Link href="/booking">
                  <ElegantButton fullWidth>Go to Booking</ElegantButton>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-text-muted">No upcoming session.</p>
            )}
          </PremiumCard>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl text-brand-navy">Featured Services</h2>
            <Link href="/booking" className="text-sm font-semibold text-brand-navy">
              Explore all
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <article
                key={service.id}
                className="rounded-2xl border border-line-soft bg-surface p-6 shadow-premium-sm transition hover:-translate-y-1 hover:shadow-premium"
              >
                <p className="mb-2 text-xs tracking-[0.08em] text-text-muted">{service.category}</p>
                <h3 className="text-2xl leading-tight text-brand-navy">{service.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{service.description}</p>
                <p className="mt-4 text-3xl text-brand-navy">{service.price.toLocaleString("th-TH")} THB</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-4xl text-brand-navy">What Pet Parents Say</h2>
          <div className="grid gap-5 xl:grid-cols-3">
            {testimonialItems.map((item) => (
              <PremiumCard key={item.id} title={item.name} subtitle="Verified client">
                <p className="text-sm leading-relaxed text-text-muted">{item.quote}</p>
                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-sage/22 px-3 py-1 text-xs font-semibold text-brand-navy">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Premium care experience
                </div>
              </PremiumCard>
            ))}
          </div>
        </section>

        <section className="space-y-4 pb-2">
          <h2 className="text-4xl text-brand-navy">Story Gallery</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {galleryShowcase.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-line-soft bg-surface shadow-premium-sm"
              >
                <div className="relative h-52">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1200px) 50vw, 280px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy">
                    <PawPrint className="h-4 w-4 text-sage" />
                    {item.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line-soft bg-surface px-6 py-5 shadow-premium-sm">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-joy-sky/70">
              <Sparkles className="h-4 w-4 text-brand-navy" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-brand-navy">Wellness Concierge Note</p>
              <p className="text-sm text-text-muted">
                Route pickup points are ready for {pets.length} active pets.{" "}
                <Link href="/tracking" className="inline-flex items-center gap-1 text-brand-navy underline-offset-2 hover:underline">
                  <MapPinned className="h-3.5 w-3.5" />
                  Open live route
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
