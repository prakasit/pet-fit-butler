"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-sm text-soft-cream/80">Selected Pet</p>
        <h2 className="mt-1 text-3xl leading-tight">{selectedPet.name}</h2>
        <p className="mt-2 text-sm text-soft-cream/80">
          {selectedPet.breed} · {selectedPet.age} years · {selectedPet.currentWeightKg} kg
        </p>
      </motion.section>

      <PremiumCard title="Your Pets" subtitle="15 registered wellness profiles">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pets.map((pet) => (
            <button
              key={pet.id}
              type="button"
              onClick={() => setSelectedPetId(pet.id)}
              className={`min-w-[180px] rounded-2xl border p-4 text-left transition ${
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

      <PremiumCard title="Profile Details" subtitle={`${selectedPet.ownerName} · ${selectedPet.gender}`}>
        <div className="space-y-4 text-sm text-text-muted">
          <div className="rounded-2xl bg-soft-cream p-4">
            <p>
              Current Weight:{" "}
              <span className="font-semibold text-brand-navy">{selectedPet.currentWeightKg} kg</span>
            </p>
          </div>

          <div className="rounded-2xl bg-soft-cream p-4">
            <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide">
              <Stethoscope className="h-3.5 w-3.5 text-sage" />
              Medical Conditions
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedPet.medicalConditions.map((condition) => (
                <StatusBadge key={condition} label={condition} tone="warning" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-soft-cream p-4">
            <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide">
              <AlertCircle className="h-3.5 w-3.5 text-sage" />
              Allergies
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedPet.allergies.map((allergy) => (
                <StatusBadge
                  key={`${selectedPet.id}-${allergy}`}
                  label={allergy}
                  tone={allergy === "None" ? "success" : "warning"}
                />
              ))}
            </div>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title="Weight History" subtitle="12-month trend">
        <HealthChart
          data={selectedPet.weightHistory}
          xKey="month"
          chartType="area"
          series={[{ key: "weightKg", label: "Weight (kg)", color: "#7FB8A4" }]}
        />
      </PremiumCard>

      <PremiumCard title="Activity History" subtitle="20 recent sessions">
        <div className="space-y-3">
          {selectedPet.activityHistory.map((activity) => (
            <article key={activity.id} className="rounded-2xl bg-soft-cream p-4">
              <div className="mb-2 flex items-start justify-between">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  <Activity className="h-4 w-4 text-sage" />
                  {activity.category}
                </p>
                <p className="text-xs text-text-muted">{formatDate(activity.date)}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                <p>{activity.durationMin} min</p>
                <p>{activity.distanceKm} km</p>
                <p className="font-semibold text-brand-navy">{activity.calories} kcal</p>
              </div>
            </article>
          ))}
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
            { key: "calories", label: "Calories", color: "#142235" },
            { key: "distanceKm", label: "Distance (km)", color: "#DCEEF2" },
          ]}
        />
      </PremiumCard>
    </div>
  );
}
