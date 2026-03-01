"use client";

import { useMemo, useState } from "react";
import { Activity, AlertCircle, Stethoscope } from "lucide-react";

import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { pets } from "@/mock";

export default function PetsPage() {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id ?? "");
  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) ?? pets[0],
    [selectedPetId],
  );

  if (!selectedPet) return null;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">PET PROFILE CENTER</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">Pet Profile</h1>
      </header>

      <PremiumCard title="Your Pets" subtitle="15 registered wellness profiles">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pets.map((pet) => (
            <button
              key={pet.id}
              type="button"
              onClick={() => setSelectedPetId(pet.id)}
              className={`min-w-[180px] rounded-xl border p-3 text-left transition ${
                selectedPet.id === pet.id
                  ? "border-brand-navy bg-brand-navy text-soft-cream shadow-premium-sm"
                  : "border-line-soft bg-soft-cream text-brand-navy hover:-translate-y-0.5"
              }`}
            >
              <p className="font-semibold">{pet.name}</p>
              <p className="text-xs opacity-80">{pet.breed}</p>
            </button>
          ))}
        </div>
      </PremiumCard>

      <div className="grid gap-4 xl:grid-cols-3">
        <PremiumCard title={selectedPet.name} subtitle={`${selectedPet.breed} • ${selectedPet.age} years`}>
          <div className="space-y-3 text-sm text-text-muted">
            <p>
              Owner: <span className="font-semibold text-brand-navy">{selectedPet.ownerName}</span>
            </p>
            <p>
              Current Weight:{" "}
              <span className="font-semibold text-brand-navy">{selectedPet.currentWeightKg} kg</span>
            </p>
            <p>
              Gender: <span className="font-semibold text-brand-navy">{selectedPet.gender}</span>
            </p>

            <div className="rounded-xl bg-soft-cream p-3">
              <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide">
                <Stethoscope className="h-3.5 w-3.5 text-sage" />
                Medical Conditions
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPet.medicalConditions.map((condition) => (
                  <StatusBadge key={condition} label={condition} tone="warning" />
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-soft-cream p-3">
              <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide">
                <AlertCircle className="h-3.5 w-3.5 text-sage" />
                Allergies
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPet.allergies.map((allergy) => (
                  <StatusBadge
                    key={`${selectedPet.id}-${allergy}`}
                    label={allergy}
                    tone={allergy === "None" ? "success" : "danger"}
                  />
                ))}
              </div>
            </div>
          </div>
        </PremiumCard>

        <PremiumCard title="Weight History" subtitle="12-month trend" className="xl:col-span-2">
          <HealthChart
            data={selectedPet.weightHistory}
            xKey="month"
            chartType="area"
            series={[{ key: "weightKg", label: "Weight (kg)", color: "#8FAF9B" }]}
          />
        </PremiumCard>
      </div>

      <PremiumCard title="Activity History" subtitle="20 recent sessions">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line-soft text-text-muted">
                <th className="px-2 py-2">Date</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Duration</th>
                <th className="px-2 py-2">Distance</th>
                <th className="px-2 py-2">Calories</th>
              </tr>
            </thead>
            <tbody>
              {selectedPet.activityHistory.map((activity) => (
                <tr key={activity.id} className="border-b border-line-soft/70">
                  <td className="px-2 py-2 text-text-muted">{formatDate(activity.date)}</td>
                  <td className="px-2 py-2 text-brand-navy">
                    <span className="inline-flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5 text-sage" />
                      {activity.category}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-text-muted">{activity.durationMin} min</td>
                  <td className="px-2 py-2 text-text-muted">{activity.distanceKm} km</td>
                  <td className="px-2 py-2 font-semibold text-brand-navy">{activity.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>

      <PremiumCard title="Wellness Snapshot" subtitle="Monthly movement performance">
        <HealthChart
          data={selectedPet.activityHistory.slice(0, 12).map((entry, index) => ({
            label: `S${index + 1}`,
            calories: entry.calories,
            distanceKm: entry.distanceKm,
          }))}
          xKey="label"
          chartType="line"
          series={[
            { key: "calories", label: "Calories", color: "#0F1B2D" },
            { key: "distanceKm", label: "Distance (km)", color: "#C9A764" },
          ]}
        />
      </PremiumCard>
    </div>
  );
}
