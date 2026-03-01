"use client";

import { motion } from "framer-motion";
import { Flame, Footprints, Weight } from "lucide-react";
import { useTranslations } from "next-intl";

import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { useMockData } from "@/mock/useMockData";

export default function HealthPage() {
  const tHealth = useTranslations("health");
  const tLabels = useTranslations("labels");
  const { healthDashboardSeries } = useMockData();

  const avgCalories = Math.round(
    healthDashboardSeries.activityByDay.reduce((sum, entry) => sum + entry.calories, 0) /
      healthDashboardSeries.activityByDay.length,
  );

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] border border-line-soft bg-surface px-6 py-7 text-brand-navy shadow-premium"
      >
        <p className="text-xs tracking-[0.15em] text-text-muted">{tHealth("heroTag")}</p>
        <p className="mt-1 text-4xl leading-tight">{tLabels("kilocalorie", { value: avgCalories })}</p>
        <p className="mt-2 text-sm text-text-muted">{tHealth("heroSubtitle")}</p>
      </motion.section>

      <PremiumCard title={tHealth("snapshotTitle")} subtitle={tHealth("snapshotSubtitle")}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl bg-soft-cream p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage/20">
              <Weight className="h-7 w-7 text-sage" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand-navy">{tHealth("weightTracking")}</p>
              <p className="mt-0.5 text-xs text-text-muted">{tHealth("weightBaseline")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-soft-cream p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage/20">
              <Footprints className="h-7 w-7 text-sage" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand-navy">{tHealth("sessionRecords")}</p>
              <p className="mt-0.5 text-xs text-text-muted">
                {tHealth("sessionRecordsValue", { count: healthDashboardSeries.activityByDay.length })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-soft-cream p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage/20">
              <Flame className="h-7 w-7 text-sage" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand-navy">{tHealth("calorieBenchmark")}</p>
              <p className="mt-0.5 text-xs text-text-muted">
                {tHealth("calorieBenchmarkValue", { value: avgCalories })}
              </p>
            </div>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title={tHealth("weightGraphTitle")} subtitle={tHealth("weightGraphSubtitle")}>
        <HealthChart
          data={healthDashboardSeries.weightByMonth}
          xKey="month"
          chartType="area"
          series={[{ key: "avgWeightKg", label: tHealth("weightSeries"), color: "#6E9E8F" }]}
        />
      </PremiumCard>

      <PremiumCard title={tHealth("activityCurveTitle")} subtitle={tHealth("activityCurveSubtitle")}>
        <HealthChart
          data={healthDashboardSeries.activityByDay}
          xKey="day"
          chartType="line"
          series={[
            { key: "activityScore", label: tHealth("activityScore"), color: "#1E2C3A" },
            { key: "calories", label: tLabels("caloriesBurned"), color: "#D9A066" },
          ]}
        />
      </PremiumCard>

      <PremiumCard title={tHealth("caloriesGraphTitle")} subtitle={tHealth("caloriesGraphSubtitle")}>
        <HealthChart
          data={healthDashboardSeries.caloriesByMonth}
          xKey="month"
          chartType="bar"
          series={[{ key: "calories", label: tLabels("caloriesBurned"), color: "#6e9e8f" }]}
        />
      </PremiumCard>
    </div>
  );
}
