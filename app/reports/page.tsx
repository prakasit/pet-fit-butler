"use client";

import { motion } from "framer-motion";
import { Droplets, Flame, Footprints, Timer } from "lucide-react";

import { HealthChart } from "@/components/ui/HealthChart";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { healthAlertThai } from "@/lib/thai";
import { dailyReports } from "@/mock";

const alertTone = {
  Normal: "success",
  Watch: "warning",
  Attention: "warning",
} as const;

export default function ReportsPage() {
  const latestReport = dailyReports[0];

  if (!latestReport) return null;

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-xs tracking-[0.15em] text-soft-cream/75">รายงานฟิตประจำวัน</p>
        <p className="mt-1 text-5xl leading-none">{latestReport.caloriesBurned}</p>
        <p className="mt-2 text-sm text-soft-cream/80">แคลอรี่ที่เผาผลาญของ {latestReport.petName}</p>
        <div className="mt-4 inline-flex rounded-full bg-soft-cream/20 px-3 py-1 text-xs font-semibold">
          {formatDate(latestReport.reportDate)}
        </div>
      </motion.section>

      <PremiumCard title="สรุปผลการออกกำลังกาย" subtitle="ค่าการดูแลสุขภาพสำคัญ">
        <div className="space-y-3">
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Footprints className="h-4 w-4 text-sage" />
              ระยะทาง
            </p>
            <p className="mt-2 text-2xl text-brand-navy">{latestReport.distanceKm} กม.</p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Droplets className="h-4 w-4 text-sage" />
              เวลาวารีบำบัด
            </p>
            <p className="mt-2 text-2xl text-brand-navy">{latestReport.swimTimeMin} นาที</p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Timer className="h-4 w-4 text-sage" />
              ระยะเวลาออกกำลังกาย
            </p>
            <p className="mt-2 text-2xl text-brand-navy">{latestReport.workoutDurationMin} นาที</p>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title="บันทึกจากผู้ดูแล" subtitle="ข้อสังเกตจากการดูแลรายวัน">
        <div className="rounded-2xl bg-soft-cream p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-brand-navy">{latestReport.petName}</p>
            <StatusBadge
              label={healthAlertThai[latestReport.healthAlert]}
              tone={alertTone[latestReport.healthAlert]}
            />
          </div>
          <p className="text-sm leading-relaxed text-text-muted">{latestReport.butlerNotes}</p>
        </div>
      </PremiumCard>

      <PremiumCard title="แนวโน้มการเผาผลาญ" subtitle="ค่าแคลอรี่จากครั้งล่าสุด">
        <HealthChart
          data={dailyReports.slice(0, 10).map((report, index) => ({
            label: `รอบ ${index + 1}`,
            calories: report.caloriesBurned,
          }))}
          xKey="label"
          chartType="line"
          series={[{ key: "calories", label: "แคลอรี่ที่เผาผลาญ", color: "#1B2A41" }]}
        />
      </PremiumCard>

      <PremiumCard title="รายงานล่าสุด" subtitle={`มีรายงานทั้งหมด ${dailyReports.length} ฉบับ`}>
        <div className="space-y-3">
          {dailyReports.slice(0, 6).map((report) => (
            <article key={report.id} className="rounded-2xl bg-soft-cream p-5">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-lg text-brand-navy">{report.petName}</p>
                  <p className="text-xs text-text-muted">{formatDate(report.reportDate)}</p>
                </div>
                <StatusBadge label={healthAlertThai[report.healthAlert]} tone={alertTone[report.healthAlert]} />
              </div>
              <div className="flex items-center gap-5 text-sm">
                <p className="inline-flex items-center gap-1 text-text-muted">
                  <Flame className="h-4 w-4 text-sage" />
                  {report.caloriesBurned} กิโลแคลอรี่
                </p>
                <p className="inline-flex items-center gap-1 text-text-muted">
                  <Footprints className="h-4 w-4 text-sage" />
                  {report.distanceKm} กม.
                </p>
              </div>
            </article>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
