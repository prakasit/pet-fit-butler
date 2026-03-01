"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">PET TAXI & GPS</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">Live Butler Tracking</h1>
      </header>

      <div className="grid gap-4 xl:grid-cols-3">
        <PremiumCard title="Active Rides" subtitle="10 mock trips">
          <div className="space-y-2">
            {rides.map((ride) => (
              <button
                key={ride.id}
                type="button"
                onClick={() => setRideId(ride.id)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  selectedRide.id === ride.id
                    ? "border-brand-navy bg-brand-navy text-soft-cream"
                    : "border-line-soft bg-soft-cream text-brand-navy hover:-translate-y-0.5"
                }`}
              >
                <p className="font-semibold">{ride.petName}</p>
                <p className="text-xs opacity-80">{ride.ownerName}</p>
              </button>
            ))}
          </div>
        </PremiumCard>

        <div className="space-y-4 xl:col-span-2">
          <ButlerDriverCard driver={selectedRide.driver} etaMinutes={etaCountdown} />

          <PremiumCard title="Current Status" subtitle="Uber-style timeline tracking">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <StatusBadge label={toTitleCase(selectedRide.currentStatus)} tone="active" />
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
        </div>
      </div>

      <PremiumCard title="Route Map (Mock)" subtitle="Static placeholder with generated coordinates">
        <div className="rounded-2xl border border-line-soft bg-gradient-to-br from-brand-navy/10 to-sage/30 p-4">
          <div className="relative h-72 overflow-hidden rounded-xl bg-soft-cream">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(143,175,155,0.45),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(15,27,45,0.25),transparent_35%)]" />
            <div className="absolute top-6 left-6 rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold text-soft-cream">
              Live Route Placeholder
            </div>
            <div className="absolute right-6 bottom-6 rounded-xl bg-surface/90 p-3 shadow-premium-sm">
              <p className="flex items-center gap-1 text-xs text-text-muted">
                <Navigation className="h-3.5 w-3.5 text-sage" />
                Waypoints
              </p>
              <ul className="mt-2 space-y-1 text-xs text-brand-navy">
                {selectedRide.route.map((coordinate, index) => (
                  <li key={`${selectedRide.id}-route-${index}`} className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-sage" />
                    {coordinate.lat}, {coordinate.lng}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
}
