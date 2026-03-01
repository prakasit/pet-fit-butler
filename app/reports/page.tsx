"use client";

import { motion } from "framer-motion";
import { Droplets, Flame, Footprints, Timer } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { healthAlertKey } from "@/lib/translation-keys";
import { useMockData } from "@/mock/useMockData";

const alertTone = {
  Normal: "success",
  Watch: "warning",
  Attention: "warning",
} as const;

export default function ReportsPage() {
  const locale = useLocale();
  const tReports = useTranslations("reports");
  const tHealthAlert = useTranslations("healthAlert");
  const tLabels = useTranslations("labels");
  const { dailyReports } = useMockData();

  const latestReport = dailyReports[0];

  if (!latestReport) return null;

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] border border-line-soft bg-surface px-6 py-7 text-brand-navy shadow-premium"
      >
        <p className="text-xs tracking-[0.15em] text-text-muted">{tReports("heroTag")}</p>
        <p className="mt-1 text-5xl leading-none">{latestReport.caloriesBurned}</p>
        <p className="mt-2 text-sm text-text-muted">
          {tReports("heroSubtitle", { petName: latestReport.petName })}
        </p>
        <div className="mt-4 inline-flex rounded-full bg-beige/24 px-3 py-1 text-xs font-semibold text-brand-navy">
          {formatDate(latestReport.reportDate, locale)}
        </div>
      </motion.section>

      <PremiumCard title={tReports("breakdownTitle")} subtitle={tReports("breakdownSubtitle")}>
        <div className="space-y-3">
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Footprints className="h-4 w-4 text-sage" />
              {tLabels("distance")}
            </p>
            <p className="mt-2 text-2xl text-brand-navy">
              {tLabels("kilometer", { value: latestReport.distanceKm })}
            </p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Droplets className="h-4 w-4 text-sage" />
              {tReports("swimTime")}
            </p>
            <p className="mt-2 text-2xl text-brand-navy">
              {tLabels("minutes", { count: latestReport.swimTimeMin })}
            </p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Timer className="h-4 w-4 text-sage" />
              {tLabels("workoutDuration")}
            </p>
            <p className="mt-2 text-2xl text-brand-navy">
              {tLabels("minutes", { count: latestReport.workoutDurationMin })}
            </p>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title={tReports("butlerNoteTitle")} subtitle={tReports("butlerNoteSubtitle")}>
        <div className="rounded-2xl bg-soft-cream p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-brand-navy">{latestReport.petName}</p>
            <StatusBadge
              label={tHealthAlert(healthAlertKey[latestReport.healthAlert])}
              tone={alertTone[latestReport.healthAlert]}
            />
          </div>
          <p className="text-sm leading-relaxed text-text-muted">{latestReport.butlerNotes}</p>
        </div>
      </PremiumCard>

      <PremiumCard title={tReports("caloriePatternTitle")} subtitle={tReports("caloriePatternSubtitle")}>
        <HealthChart
          data={dailyReports.slice(0, 10).map((report, index) => ({
            label: tReports("round", { index: index + 1 }),
            calories: report.caloriesBurned,
          }))}
          xKey="label"
          chartType="line"
          series={[{ key: "calories", label: tLabels("caloriesBurned"), color: "#1E2C3A" }]}
        />
      </PremiumCard>

      <PremiumCard
        title={tReports("recentReportsTitle")}
        subtitle={tReports("recentReportsSubtitle", { count: dailyReports.length })}
      >
        <div className="space-y-3">
          {dailyReports.slice(0, 6).map((report) => (
            <article key={report.id} className="rounded-2xl bg-soft-cream p-5">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-lg text-brand-navy">{report.petName}</p>
                  <p className="text-xs text-text-muted">{formatDate(report.reportDate, locale)}</p>
                </div>
                <StatusBadge
                  label={tHealthAlert(healthAlertKey[report.healthAlert])}
                  tone={alertTone[report.healthAlert]}
                />
              </div>
              <div className="flex items-center gap-5 text-sm">
                <p className="inline-flex items-center gap-1 text-text-muted">
                  <Flame className="h-4 w-4 text-sage" />
                  {tLabels("kilocalorie", { value: report.caloriesBurned })}
                </p>
                <p className="inline-flex items-center gap-1 text-text-muted">
                  <Footprints className="h-4 w-4 text-sage" />
                  {tLabels("kilometer", { value: report.distanceKm })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
