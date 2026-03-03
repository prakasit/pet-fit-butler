"use client";

import Image from "next/image";
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
import { useLocale, useTranslations } from "next-intl";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { HeroVideoSection } from "@/components/storytelling/HeroVideoSection";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import {
  bookingStatusKey,
  bookingTypeKey,
  membershipTypeKey,
  timeSlotKey,
} from "@/lib/translation-keys";
import {
  useMockData,
} from "@/mock/useMockData";

export default function DashboardPage() {
  const locale = useLocale();
  const tDashboard = useTranslations("dashboard");
  const tCta = useTranslations("cta");
  const tLabels = useTranslations("labels");
  const tBookingType = useTranslations("bookingType");
  const tMembershipType = useTranslations("membershipType");
  const tBookingStatus = useTranslations("bookingStatus");
  const tTimeSlot = useTranslations("timeSlot");
  const tCommon = useTranslations("common");
  const { butlerStatus, dailyActivitySeries, dashboardActivities, membershipStatus, pets, services, upcomingBookings } =
    useMockData();

  const quickActions = [
    {
      href: "/booking",
      label: tCta("bookNow"),
      icon: CalendarClock,
    },
    {
      href: "/reports",
      label: tCta("viewReport"),
      icon: FileHeart,
    },
  ];

  const testimonialItems = [
    {
      id: "t-1",
      quote: tDashboard("testimonials.oneQuote"),
      name: tDashboard("testimonials.oneName"),
    },
    {
      id: "t-2",
      quote: tDashboard("testimonials.twoQuote"),
      name: tDashboard("testimonials.twoName"),
    },
    {
      id: "t-3",
      quote: tDashboard("testimonials.threeQuote"),
      name: tDashboard("testimonials.threeName"),
    },
  ];

  const galleryShowcase = [
    {
      id: "g-1",
      title: tDashboard("stories.one"),
      imageUrl: "https://assets.mixkit.co/videos/45843/45843-thumb-720-3.jpg",
    },
    {
      id: "g-2",
      title: tDashboard("stories.two"),
      imageUrl: "https://assets.mixkit.co/videos/45347/45347-thumb-720-3.jpg",
    },
    {
      id: "g-3",
      title: tDashboard("stories.three"),
      imageUrl: "https://assets.mixkit.co/videos/46206/46206-thumb-720-3.jpg",
    },
    {
      id: "g-4",
      title: tDashboard("stories.four"),
      imageUrl: "https://assets.mixkit.co/videos/14371/14371-thumb-720-0.jpg",
    },
  ];

  const nextBooking = upcomingBookings[0];
  const featuredPet = pets[0]?.name ?? "—";
  const averageWeight =
    pets.reduce((sum, pet) => sum + pet.currentWeightKg, 0) / Math.max(1, pets.length);
  const totalCaloriesWeek = dailyActivitySeries.reduce(
    (sum, day) => sum + Number(day.calories),
    0,
  );

  return (
    <>
      <div className="space-y-8 max-md:space-y-5 lg:hidden">
        <HeroVideoSection />

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[28px] border border-line-soft bg-surface p-6 text-brand-navy shadow-premium max-md:flex max-md:flex-col max-md:rounded-2xl max-md:gap-3 max-md:p-4 max-md:shadow-lg max-md:shadow-brand-navy/6"
        >
          <div className="mb-4 flex items-start justify-between max-md:order-1 max-md:mb-0 max-md:flex-col max-md:gap-2 max-md:items-stretch">
            <StatusBadge
              label={tMembershipType(membershipTypeKey[membershipStatus.tier])}
              tone="warning"
              className="max-md:order-1 max-md:w-fit bg-beige/30 text-brand-navy"
            />
            <div className="max-md:order-2">
              <p className="text-sm text-text-muted max-md:text-xs">{tDashboard("membershipHeadline")}</p>
              <h2 className="mt-1 text-[1.95rem] leading-tight max-md:mt-0.5 max-md:text-lg">
                {tDashboard("membershipJourney", { petName: featuredPet })}
              </h2>
            </div>
          </div>
          <p className="text-sm text-text-muted max-md:order-2 max-md:text-xs">
            {tDashboard("membershipRemaining", { count: membershipStatus.visitsRemaining })}
          </p>
        </motion.section>

        <PremiumCard
          title={tDashboard("nextBookingTitle")}
          subtitle={tDashboard("nextBookingSubtitle")}
          className="max-md:rounded-2xl max-md:p-5 max-md:shadow-lg max-md:shadow-brand-navy/6"
        >
          {nextBooking ? (
            <div className="space-y-4 max-md:flex max-md:flex-col max-md:space-y-3">
              <div className="rounded-2xl bg-soft-cream p-5 max-md:p-4 max-md:flex max-md:flex-col max-md:gap-2">
                <p className="text-2xl text-brand-navy max-md:text-xl">{nextBooking.petName}</p>
                <p className="mt-1 text-sm text-text-muted">{nextBooking.serviceName}</p>
                <p className="mt-3 text-sm text-brand-navy max-md:mt-0" suppressHydrationWarning>
                  {formatDate(nextBooking.date, locale)} · {formatTime(nextBooking.date, locale)} (
                  {tTimeSlot(timeSlotKey[nextBooking.timeSlot])})
                </p>
                <div className="mt-3 flex items-center gap-2 max-md:mt-2 max-md:flex-wrap">
                  <StatusBadge label={tBookingStatus(bookingStatusKey[nextBooking.status])} tone="warning" />
                  <span className="text-xs text-text-muted">
                    {tDashboard("queuedSessions", { count: upcomingBookings.length })}
                  </span>
                </div>
              </div>
              <LocaleLink href="/booking" className="max-md:w-full max-md:block">
                <ElegantButton fullWidth className="max-md:w-full">{tCta("seeDetails")}</ElegantButton>
              </LocaleLink>
            </div>
          ) : (
            <p className="text-sm text-text-muted">{tDashboard("nextBookingNone")}</p>
          )}
        </PremiumCard>

        <PremiumCard
          title={tDashboard("butlerLiveTitle")}
          subtitle={butlerStatus.shiftName}
          className="max-md:rounded-2xl max-md:p-5 max-md:shadow-lg max-md:shadow-brand-navy/6"
        >
          <div className="space-y-4 max-md:flex max-md:flex-col max-md:space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-soft-cream p-4 max-md:flex-col max-md:items-stretch max-md:gap-2 max-md:p-3">
              <div className="min-w-0">
                <p className="text-base font-semibold text-brand-navy max-md:text-sm">{butlerStatus.butlerName}</p>
                <p className="text-sm text-text-muted max-md:text-xs">{butlerStatus.currentTask}</p>
              </div>
              <StatusBadge
                label={butlerStatus.isActive ? tDashboard("butlerActive") : tDashboard("butlerStandby")}
                tone={butlerStatus.isActive ? "active" : "neutral"}
                className="max-md:w-fit"
              />
            </div>
            <LocaleLink href="/tracking" className="max-md:w-full max-md:block">
              <ElegantButton variant="secondary" fullWidth className="max-md:w-full">
                <MapPinned className="mr-2 h-4 w-4" />
                {tCta("trackRide")}
              </ElegantButton>
            </LocaleLink>
          </div>
        </PremiumCard>

        <PremiumCard
          title={tDashboard("quickActionsTitle")}
          subtitle={tDashboard("quickActionsSubtitle")}
          className="max-md:rounded-2xl max-md:p-5 max-md:shadow-lg max-md:shadow-brand-navy/6"
        >
          <div className="grid grid-cols-2 gap-3 max-md:gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <LocaleLink key={action.href} href={action.href}>
                  <div className="rounded-2xl bg-soft-cream p-4 shadow-premium-sm transition hover:-translate-y-0.5">
                    <Icon className="h-5 w-5 text-brand-navy" />
                    <p className="mt-3 text-sm font-semibold text-brand-navy">{action.label}</p>
                  </div>
                </LocaleLink>
              );
            })}
          </div>
        </PremiumCard>

        <PremiumCard
          title={tDashboard("dailyActivityTitle")}
          subtitle={tDashboard("dailyActivitySubtitle")}
          className="max-md:rounded-2xl max-md:p-5 max-md:shadow-lg max-md:shadow-brand-navy/6"
        >
          <HealthChart
            data={dailyActivitySeries}
            xKey="day"
            chartType="line"
            series={[
              { key: "calories", label: tLabels("caloriesBurned"), color: "#1E2C3A" },
              { key: "distanceKm", label: tLabels("distance"), color: "#6E9E8F" },
            ]}
          />
          <div className="mt-4 flex gap-3 text-sm max-md:flex-col max-md:gap-2 max-md:mt-3">
            <div className="rounded-2xl bg-soft-cream px-4 py-3 max-md:px-3 max-md:py-2.5">
              <p className="text-xs text-text-muted">{tLabels("averageWeight")}</p>
              <p className="text-lg font-semibold text-brand-navy max-md:text-base">
                {tLabels("kilogram", { value: averageWeight.toFixed(1) })}
              </p>
            </div>
            <div className="rounded-2xl bg-soft-cream px-4 py-3 max-md:px-3 max-md:py-2.5">
              <p className="text-xs text-text-muted">{tLabels("weeklyCalories")}</p>
              <p className="text-lg font-semibold text-brand-navy max-md:text-base">{totalCaloriesWeek}</p>
            </div>
          </div>
        </PremiumCard>

        <div className="max-md:space-y-3">
          <div className="mb-3 flex items-center justify-between max-md:mb-2">
            <h2 className="text-2xl text-brand-navy max-md:text-xl">{tDashboard("recentHighlights")}</h2>
            <span className="text-xs uppercase tracking-[0.14em] text-text-muted">{tCommon("swipe")}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 max-md:gap-2">
            {dashboardActivities.slice(0, 10).map((activity) => (
              <article
                key={activity.id}
                className="min-w-[260px] shrink-0 rounded-2xl border border-line-soft bg-surface p-5 shadow-premium-sm max-md:min-w-[240px] max-md:rounded-2xl max-md:p-4 max-md:shadow-lg max-md:shadow-brand-navy/6"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/25">
                    <Activity className="h-4 w-4 text-brand-navy" />
                  </span>
                  <StatusBadge label={activity.petName} tone="success" />
                </div>
                <p className="text-sm font-medium text-brand-navy">{activity.summary}</p>
                <p className="mt-2 text-xs text-text-muted">{formatDate(activity.timestamp, locale)}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="max-md:space-y-3">
          <h2 className="mb-3 text-2xl text-brand-navy max-md:mb-2 max-md:text-xl">
            {tDashboard("storyGalleryTitle")}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1 max-md:gap-2">
            {galleryShowcase.map((item) => (
              <article
                key={item.id}
                className="min-w-[200px] shrink-0 overflow-hidden rounded-2xl border border-line-soft bg-surface shadow-premium-sm max-md:shadow-lg max-md:shadow-brand-navy/6"
              >
                <div className="relative h-40 w-full max-md:h-36">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 200px, 240px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3 max-md:p-2.5">
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy max-md:text-xs">
                    <PawPrint className="h-4 w-4 text-sage max-md:h-3.5 max-md:w-3.5" />
                    {item.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="hidden space-y-10 lg:block">
        <HeroVideoSection />

        <section className="grid gap-6 xl:grid-cols-3">
          <PremiumCard title={tDashboard("desktopMembershipTierTitle")} subtitle={tDashboard("desktopMembershipTierSubtitle")}>
            <p className="text-4xl leading-none text-brand-navy">
              {tMembershipType(membershipTypeKey[membershipStatus.tier])}
            </p>
            <p className="mt-3 text-sm text-text-muted">
              {tDashboard("coverageUntil", { date: formatDate(membershipStatus.expiresAt, locale) })}
            </p>
          </PremiumCard>
          <PremiumCard
            title={tDashboard("desktopRemainingVisitsTitle")}
            subtitle={tDashboard("desktopRemainingVisitsSubtitle")}
          >
            <p className="text-5xl leading-none text-brand-navy">{membershipStatus.visitsRemaining}</p>
            <p className="mt-3 text-sm text-text-muted">
              {tDashboard("desktopRemainingVisitsDescription")}
            </p>
          </PremiumCard>
          <PremiumCard title={tDashboard("desktopConciergeTitle")} subtitle={tDashboard("desktopConciergeSubtitle")}>
            <p className="text-2xl text-brand-navy">{membershipStatus.conciergeContact}</p>
            <p className="mt-3 text-sm text-text-muted">
              {tDashboard("desktopConciergeDescription")}
            </p>
          </PremiumCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <PremiumCard
            className="xl:col-span-2"
            title={tDashboard("desktopWeeklyActivityTitle")}
            subtitle={tDashboard("desktopWeeklyActivitySubtitle")}
          >
            <HealthChart
              data={dailyActivitySeries}
              xKey="day"
              chartType="line"
              series={[
                { key: "calories", label: tLabels("caloriesBurned"), color: "#1E2C3A" },
                { key: "distanceKm", label: tLabels("distance"), color: "#6E9E8F" },
              ]}
            />
          </PremiumCard>
          <PremiumCard title={tDashboard("nextBookingTitle")} subtitle={tDashboard("nextBookingSubtitle")}>
            {nextBooking ? (
              <div className="space-y-3">
                <p className="text-xl text-brand-navy">{nextBooking.petName}</p>
                <p className="text-sm text-text-muted">{nextBooking.serviceName}</p>
                <p className="text-sm text-brand-navy" suppressHydrationWarning>
                  {formatDate(nextBooking.date, locale)} · {formatTime(nextBooking.date, locale)}
                </p>
                <StatusBadge label={tBookingStatus(bookingStatusKey[nextBooking.status])} tone="warning" />
                <LocaleLink href="/booking">
                  <ElegantButton fullWidth>{tCta("bookNow")}</ElegantButton>
                </LocaleLink>
              </div>
            ) : (
              <p className="text-sm text-text-muted">{tDashboard("nextBookingNone")}</p>
            )}
          </PremiumCard>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl text-brand-navy">{tDashboard("featuredServicesTitle")}</h2>
            <LocaleLink href="/booking" className="text-sm font-semibold text-brand-navy">
              {tCta("exploreAll")}
            </LocaleLink>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <article
                key={service.id}
                className="rounded-2xl border border-line-soft bg-surface p-6 shadow-premium-sm transition hover:-translate-y-1 hover:shadow-premium"
              >
                <p className="mb-2 text-xs tracking-[0.08em] text-text-muted">
                  {tBookingType(bookingTypeKey[service.category])}
                </p>
                <h3 className="text-2xl leading-tight text-brand-navy">{service.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{service.description}</p>
                <p className="mt-4 text-3xl text-brand-navy">{formatCurrency(service.price, locale)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-4xl text-brand-navy">{tDashboard("testimonialTitle")}</h2>
          <div className="grid gap-5 xl:grid-cols-3">
            {testimonialItems.map((item) => (
              <PremiumCard key={item.id} title={item.name} subtitle={tDashboard("verifiedClient")}>
                <p className="text-sm leading-relaxed text-text-muted">{item.quote}</p>
                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-sage/22 px-3 py-1 text-xs font-semibold text-brand-navy">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  {tDashboard("premiumExperience")}
                </div>
              </PremiumCard>
            ))}
          </div>
        </section>

        <section className="space-y-4 pb-2">
          <h2 className="text-4xl text-brand-navy">{tDashboard("storyGalleryTitle")}</h2>
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
              <p className="text-sm font-semibold text-brand-navy">{tDashboard("conciergeNoteTitle")}</p>
              <p className="text-sm text-text-muted">
                {tDashboard("conciergeNoteBody", { count: pets.length })}{" "}
                <LocaleLink href="/tracking" className="inline-flex items-center gap-1 text-brand-navy underline-offset-2 hover:underline">
                  <MapPinned className="h-3.5 w-3.5" />
                  {tDashboard("openLiveRoute")}
                </LocaleLink>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
