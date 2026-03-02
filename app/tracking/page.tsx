"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Navigation, Video } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { ButlerDriverCard } from "@/components/ui/ButlerDriverCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Timeline } from "@/components/ui/Timeline";
import { rideStatusKey } from "@/lib/translation-keys";
import { useMockData } from "@/mock/useMockData";

const RouteMapClient = dynamic(
  () => import("@/components/ui/RouteMap").then((m) => ({ default: m.RouteMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-soft-cream/50 text-sm text-text-muted">
        กำลังโหลดแผนที่...
      </div>
    ),
  },
);

export default function TrackingPage() {
  const locale = useLocale();
  const tTracking = useTranslations("tracking");
  const tRideStatus = useTranslations("rideStatus");
  const tLabels = useTranslations("labels");
  const { rides } = useMockData();

  const [rideId, setRideId] = useState(rides[0]?.id ?? "");
  const [etaByRide, setEtaByRide] = useState<Record<string, number>>(() =>
    Object.fromEntries(rides.map((ride) => [ride.id, ride.etaMinutes])),
  );
  const selectedRide = useMemo(
    () => rides.find((ride) => ride.id === rideId) ?? rides[0],
    [rideId, rides],
  );
  const etaCountdown =
    (selectedRide ? etaByRide[selectedRide.id] : undefined) ?? selectedRide?.etaMinutes ?? 0;

  useEffect(() => {
    if (!selectedRide) return;
    const timer = setInterval(
      () =>
        setEtaByRide((previous) => ({
          ...previous,
          [selectedRide.id]: Math.max(0, (previous[selectedRide.id] ?? selectedRide.etaMinutes) - 1),
        })),
      60_000,
    );

    return () => clearInterval(timer);
  }, [selectedRide]);

  if (!selectedRide) return null;

  const activeStage =
    selectedRide.timeline.findIndex((item) => item.active) >= 0
      ? selectedRide.timeline.findIndex((item) => item.active)
      : selectedRide.timeline.filter((item) => item.completed).length;
  const progressPercentage = ((activeStage + 1) / selectedRide.timeline.length) * 100;

  return (
    <div className="space-y-9 max-md:space-y-6">
      <div className="-mx-4 max-md:mx-0">
        <section className="relative min-h-[67vh] overflow-hidden rounded-[34px] border border-line-soft bg-surface text-brand-navy shadow-premium-lg max-md:rounded-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(110,158,143,0.36),transparent_32%),radial-gradient(circle_at_82%_70%,rgba(217,160,102,0.2),transparent_40%)]" />

          <div className="relative z-10 space-y-4 p-5">
            <div className="flex items-center justify-between">
              <StatusBadge
                label={tRideStatus(rideStatusKey[selectedRide.currentStatus])}
                tone="active"
                className="bg-sage/36 text-brand-navy"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-muted">
                {tTracking("rideForPet", { petName: selectedRide.petName })}
              </p>
              <h2 className="text-3xl leading-tight">{tTracking("arriveIn", { minutes: etaCountdown })}</h2>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-soft-cream/75">
              <motion.div
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-sage"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {rides.map((ride) => (
                <button
                  key={ride.id}
                  type="button"
                  onClick={() => setRideId(ride.id)}
                  className={`min-w-[140px] rounded-2xl border px-4 py-3 text-left text-xs transition ${
                    selectedRide.id === ride.id
                      ? "border-sage bg-sage text-surface"
                      : "border-line-soft bg-soft-cream text-brand-navy"
                  }`}
                >
                  <p className="text-sm font-semibold">{ride.petName}</p>
                  <p>{ride.ownerName}</p>
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[auto_1fr]">
                <ButlerDriverCard
                  driver={selectedRide.driver}
                  etaMinutes={etaCountdown}
                  noCard
                />
                <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-brand-navy/90">
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    {tTracking("livePetStream")}
                  </div>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface/10">
                      <Video className="h-8 w-8 text-surface/70" />
                    </div>
                    <p className="max-w-[200px] text-sm text-surface/80">
                      {tTracking("livePetStreamSubtitle")}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-text-muted">
                  {tTracking("waypoints")}
                </p>
                <div className="min-h-[200px]">
                  <RouteMapClient route={selectedRide.route} className="h-full min-h-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <PremiumCard title={tTracking("progressTitle")} subtitle={tTracking("progressSubtitle")}>
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-soft-cream p-4">
          <div>
            <p className="text-sm text-text-muted">{tLabels("statusCurrent")}</p>
            <p className="text-xl text-brand-navy">
              {tRideStatus(rideStatusKey[selectedRide.currentStatus])}
            </p>
          </div>
          <StatusBadge label={tLabels("minutes", { count: etaCountdown })} tone="warning" />
        </div>
        <Timeline
          items={selectedRide.timeline.map((point, index) => ({
            id: `${selectedRide.id}-timeline-${index}`,
            label: tRideStatus(rideStatusKey[point.status]),
            timestamp: new Date(point.timestamp).toLocaleTimeString(locale === "en" ? "en-US" : "th-TH", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            completed: point.completed,
            active: point.active,
          }))}
        />
      </PremiumCard>

      <PremiumCard title={tTracking("quickActionsTitle")} subtitle={tTracking("quickActionsSubtitle")}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <button className="rounded-2xl bg-soft-cream p-4 text-left">
            <p className="font-semibold text-brand-navy">{tTracking("openLiveCam")}</p>
            <p className="mt-1 text-xs text-text-muted">{tTracking("openLiveCamSubtitle")}</p>
          </button>
          <button className="rounded-2xl bg-soft-cream p-4 text-left">
            <p className="font-semibold text-brand-navy">{tTracking("shareRoute")}</p>
            <p className="mt-1 text-xs text-text-muted">{tTracking("shareRouteSubtitle")}</p>
          </button>
          <button className="col-span-2 rounded-2xl bg-soft-cream p-4 text-left">
            <p className="inline-flex items-center gap-1 font-semibold text-brand-navy">
              <Navigation className="h-4 w-4 text-sage" />
              {tTracking("openWaypointList")}
              <ChevronRight className="h-4 w-4" />
            </p>
          </button>
        </div>
      </PremiumCard>
    </div>
  );
}
