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
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">HEALTH ANALYTICS</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">Health Dashboard</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <PremiumCard title="Monthly Weight Trend" subtitle="Across premium clients">
          <p className="flex items-center gap-2 text-sm text-text-muted">
            <Weight className="h-4 w-4 text-sage" />
            12-month average tracking baseline
          </p>
        </PremiumCard>
        <PremiumCard title="Activity Records" subtitle="Recent 30 entries">
          <p className="flex items-center gap-2 text-sm text-text-muted">
            <Footprints className="h-4 w-4 text-sage" />
            {healthDashboardSeries.activityByDay.length} sessions measured
          </p>
        </PremiumCard>
        <PremiumCard title="Avg Calories" subtitle="Performance benchmark">
          <p className="flex items-center gap-2 text-sm text-text-muted">
            <Flame className="h-4 w-4 text-sage" />
            {avgCalories} kcal per session
          </p>
        </PremiumCard>
      </div>

      <PremiumCard title="Weight Graph" subtitle="12 months">
        <HealthChart
          data={healthDashboardSeries.weightByMonth}
          xKey="month"
          chartType="area"
          series={[{ key: "avgWeightKg", label: "Weight (kg)", color: "#8FAF9B" }]}
        />
      </PremiumCard>

      <PremiumCard title="Activity Graph" subtitle="Daily score and calorie trend">
        <HealthChart
          data={healthDashboardSeries.activityByDay}
          xKey="day"
          chartType="line"
          series={[
            { key: "activityScore", label: "Activity Score", color: "#0F1B2D" },
            { key: "calories", label: "Calories", color: "#C9A764" },
          ]}
        />
      </PremiumCard>

      <PremiumCard title="Calories Burned" subtitle="Monthly aggregate">
        <HealthChart
          data={healthDashboardSeries.caloriesByMonth}
          xKey="month"
          chartType="bar"
          series={[{ key: "calories", label: "Calories", color: "#0F1B2D" }]}
        />
      </PremiumCard>
    </div>
  );
}
