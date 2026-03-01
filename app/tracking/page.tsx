"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Navigation, Radio } from "lucide-react";

import { ButlerDriverCard } from "@/components/ui/ButlerDriverCard";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Timeline } from "@/components/ui/Timeline";
import { toTitleCase } from "@/lib/format";
import { rides } from "@/mock";

export default function TrackingPage() {
  const [rideId, setRideId] = useState(rides[0]?.id ?? "");
  const [etaByRide, setEtaByRide] = useState<Record<string, number>>(() =>
    Object.fromEntries(rides.map((ride) => [ride.id, ride.etaMinutes])),
  );
  const selectedRide = useMemo(() => rides.find((ride) => ride.id === rideId) ?? rides[0], [rideId]);
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
    <div className="space-y-5">
      <div className="-mx-4">
        <section className="relative min-h-[67vh] overflow-hidden rounded-[34px] border border-line-soft bg-brand-navy text-soft-cream shadow-premium-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(143,175,155,0.6),transparent_32%),radial-gradient(circle_at_82%_70%,rgba(248,244,237,0.16),transparent_40%)]" />

          <div className="relative z-10 space-y-4 p-5">
            <div className="flex items-center justify-between">
              <StatusBadge
                label={toTitleCase(selectedRide.currentStatus)}
                tone="active"
                className="bg-sage/35 text-soft-cream"
              />
              <span className="inline-flex items-center gap-1 rounded-full bg-soft-cream/16 px-3 py-1 text-xs font-semibold">
                <Radio className="h-3.5 w-3.5" />
                Live tracking
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-soft-cream/80">Current ride for {selectedRide.petName}</p>
              <h2 className="text-3xl leading-tight">{etaCountdown} min until arrival</h2>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-soft-cream/20">
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
                      ? "border-soft-cream/30 bg-soft-cream/18 text-soft-cream"
                      : "border-soft-cream/20 bg-soft-cream/8 text-soft-cream/85"
                  }`}
                >
                  <p className="text-sm font-semibold">{ride.petName}</p>
                  <p>{ride.ownerName}</p>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="absolute right-4 bottom-4 left-4 z-20 space-y-3"
          >
            <ButlerDriverCard driver={selectedRide.driver} etaMinutes={etaCountdown} />
            <div className="rounded-2xl bg-surface/95 px-4 py-3 text-brand-navy shadow-premium-sm backdrop-blur">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-text-muted">Route waypoints</p>
              <ul className="space-y-1.5 text-sm">
                {selectedRide.route.map((coordinate, index) => (
                  <li key={`${selectedRide.id}-route-${index}`} className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-sage" />
                    {coordinate.lat}, {coordinate.lng}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>
      </div>

      <PremiumCard title="Trip Progress" subtitle="Uber-style timeline experience">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-soft-cream p-4">
          <div>
            <p className="text-sm text-text-muted">Live status</p>
            <p className="text-xl text-brand-navy">{toTitleCase(selectedRide.currentStatus)}</p>
          </div>
          <StatusBadge label={`${etaCountdown} min`} tone="warning" />
        </div>
        <Timeline
          items={selectedRide.timeline.map((point, index) => ({
            id: `${selectedRide.id}-timeline-${index}`,
            label: point.status,
            timestamp: new Date(point.timestamp).toLocaleTimeString("th-TH", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            completed: point.completed,
            active: point.active,
          }))}
        />
      </PremiumCard>

      <PremiumCard title="Quick Actions" subtitle="Need another view?">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <button className="rounded-2xl bg-soft-cream p-4 text-left">
            <p className="font-semibold text-brand-navy">Open Live Cam</p>
            <p className="mt-1 text-xs text-text-muted">Switch to studio camera</p>
          </button>
          <button className="rounded-2xl bg-soft-cream p-4 text-left">
            <p className="font-semibold text-brand-navy">Share Route</p>
            <p className="mt-1 text-xs text-text-muted">Send secure tracking link</p>
          </button>
          <button className="col-span-2 rounded-2xl bg-soft-cream p-4 text-left">
            <p className="inline-flex items-center gap-1 font-semibold text-brand-navy">
              <Navigation className="h-4 w-4 text-sage" />
              Open detailed waypoint list
              <ChevronRight className="h-4 w-4" />
            </p>
          </button>
        </div>
      </PremiumCard>
    </div>
  );
}
