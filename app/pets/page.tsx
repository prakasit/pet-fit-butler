"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertCircle, Stethoscope } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { activityCategoryKey, genderKey } from "@/lib/translation-keys";
import { useMockData } from "@/mock/useMockData";

export default function PetsPage() {
  const locale = useLocale();
  const tPets = useTranslations("pets");
  const tActivityCategory = useTranslations("activityCategory");
  const tGender = useTranslations("gender");
  const tHealth = useTranslations("health");
  const tLabels = useTranslations("labels");
  const tCommon = useTranslations("common");
  const { pets } = useMockData();

  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id ?? "");
  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) ?? pets[0],
    [selectedPetId, pets],
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
        <p className="text-sm text-soft-cream/80">{tPets("heroTag")}</p>
        <h2 className="mt-1 text-3xl leading-tight">{selectedPet.name}</h2>
        <p className="mt-2 text-sm text-soft-cream/80">
          {tPets("heroDetail", {
            breed: selectedPet.breed,
            age: selectedPet.age,
            weight: selectedPet.currentWeightKg,
          })}
        </p>
      </motion.section>

      <PremiumCard title={tPets("yourPetsTitle")} subtitle={tPets("yourPetsSubtitle", { count: pets.length })}>
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

      <PremiumCard
        title={tPets("profileDetailsTitle")}
        subtitle={tPets("ownerAndGender", {
          owner: selectedPet.ownerName,
          gender: tGender(genderKey[selectedPet.gender]),
        })}
      >
        <div className="space-y-4 text-sm text-text-muted">
          <div className="rounded-2xl bg-soft-cream p-4">
            <p>
              {tPets("currentWeight")}:{" "}
              <span className="font-semibold text-brand-navy">
                {tLabels("kilogram", { value: selectedPet.currentWeightKg })}
              </span>
            </p>
          </div>

          <div className="rounded-2xl bg-soft-cream p-4">
            <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide">
              <Stethoscope className="h-3.5 w-3.5 text-sage" />
              {tPets("medicalConditions")}
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
              {tPets("allergies")}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedPet.allergies.map((allergy) => (
                <StatusBadge
                  key={`${selectedPet.id}-${allergy}`}
                  label={allergy}
                  tone={allergy === tCommon("none") || allergy === "None" ? "success" : "warning"}
                />
              ))}
            </div>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title={tPets("weightHistoryTitle")} subtitle={tPets("weightHistorySubtitle")}>
        <HealthChart
          data={selectedPet.weightHistory}
          xKey="month"
          chartType="area"
          series={[{ key: "weightKg", label: tHealth("weightSeries"), color: "#5FBF9F" }]}
        />
      </PremiumCard>

      <PremiumCard title={tPets("activityHistoryTitle")} subtitle={tPets("activityHistorySubtitle")}>
        <div className="space-y-3">
          {selectedPet.activityHistory.map((activity) => (
            <article key={activity.id} className="rounded-2xl bg-soft-cream p-4">
              <div className="mb-2 flex items-start justify-between">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  <Activity className="h-4 w-4 text-sage" />
                  {tActivityCategory(activityCategoryKey[activity.category])}
                </p>
                <p className="text-xs text-text-muted">{formatDate(activity.date, locale)}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                <p>{tLabels("minutes", { count: activity.durationMin })}</p>
                <p>{tLabels("kilometer", { value: activity.distanceKm })}</p>
                <p className="font-semibold text-brand-navy">
                  {tLabels("kilocalorie", { value: activity.calories })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PremiumCard>

      <PremiumCard title={tPets("wellnessSnapshotTitle")} subtitle={tPets("wellnessSnapshotSubtitle")}>
        <HealthChart
          data={selectedPet.activityHistory.slice(0, 12).map((entry, index) => ({
            label: tPets("round", { index: index + 1 }),
            calories: entry.calories,
            distanceKm: entry.distanceKm,
          }))}
          xKey="label"
          chartType="line"
          series={[
            { key: "calories", label: tLabels("caloriesBurned"), color: "#1B2A41" },
            { key: "distanceKm", label: tLabels("distance"), color: "#E3F2FF" },
          ]}
        />
      </PremiumCard>
    </div>
  );
}
