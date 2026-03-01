"use client";

import { motion } from "framer-motion";
import { Flame, Footprints, Weight } from "lucide-react";

import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { healthDashboardSeries } from "@/mock";

export default function HealthPage() {
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
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-xs tracking-[0.15em] text-soft-cream/75">DAILY ACTIVITY INSIGHTS</p>
        <p className="mt-1 text-4xl leading-tight">{avgCalories} kcal</p>
        <p className="mt-2 text-sm text-soft-cream/80">Average energy burn per session this month.</p>
      </motion.section>

      <PremiumCard title="Wellness Snapshot" subtitle="Clear and calm performance indicators">
        <div className="space-y-3">
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Weight className="h-4 w-4 text-sage" />
              Weight tracking
            </p>
            <p className="mt-1 text-sm text-brand-navy">12-month average baseline</p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Footprints className="h-4 w-4 text-sage" />
              Session records
            </p>
            <p className="mt-1 text-sm text-brand-navy">
              {healthDashboardSeries.activityByDay.length} activities measured
            </p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Flame className="h-4 w-4 text-sage" />
              Calorie benchmark
            </p>
            <p className="mt-1 text-sm text-brand-navy">{avgCalories} kcal per session</p>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title="Weight Graph" subtitle="12 months">
        <HealthChart
          data={healthDashboardSeries.weightByMonth}
          xKey="month"
          chartType="area"
          series={[{ key: "avgWeightKg", label: "Weight (kg)", color: "#7FB8A4" }]}
        />
      </PremiumCard>

      <PremiumCard title="Activity Curve" subtitle="Daily score and calorie trend">
        <HealthChart
          data={healthDashboardSeries.activityByDay}
          xKey="day"
          chartType="line"
          series={[
            { key: "activityScore", label: "Activity Score", color: "#142235" },
            { key: "calories", label: "Calories", color: "#F7D8C8" },
          ]}
        />
      </PremiumCard>

      <PremiumCard title="Calories Burned" subtitle="Monthly aggregate trend">
        <HealthChart
          data={healthDashboardSeries.caloriesByMonth}
          xKey="month"
          chartType="bar"
          series={[{ key: "calories", label: "Calories", color: "#142235" }]}
        />
      </PremiumCard>
    </div>
  );
}
