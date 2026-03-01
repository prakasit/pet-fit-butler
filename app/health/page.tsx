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
        <p className="text-xs tracking-[0.15em] text-soft-cream/75">สรุปกิจกรรมประจำวัน</p>
        <p className="mt-1 text-4xl leading-tight">{avgCalories} กิโลแคลอรี่</p>
        <p className="mt-2 text-sm text-soft-cream/80">ค่าเฉลี่ยพลังงานที่เผาผลาญต่อครั้งในเดือนนี้</p>
      </motion.section>

      <PremiumCard title="ภาพรวมสุขภาพ" subtitle="ตัวชี้วัดที่อ่านง่ายและชัดเจน">
        <div className="space-y-3">
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Weight className="h-4 w-4 text-sage" />
              ติดตามน้ำหนัก
            </p>
            <p className="mt-1 text-sm text-brand-navy">ค่าเฉลี่ยพื้นฐานตลอด 12 เดือน</p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Footprints className="h-4 w-4 text-sage" />
              บันทึกกิจกรรม
            </p>
            <p className="mt-1 text-sm text-brand-navy">
              บันทึกทั้งหมด {healthDashboardSeries.activityByDay.length} ครั้ง
            </p>
          </div>
          <div className="rounded-2xl bg-soft-cream p-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-text-muted">
              <Flame className="h-4 w-4 text-sage" />
              เกณฑ์การเผาผลาญ
            </p>
            <p className="mt-1 text-sm text-brand-navy">{avgCalories} กิโลแคลอรี่ต่อครั้ง</p>
          </div>
        </div>
      </PremiumCard>

      <PremiumCard title="กราฟน้ำหนัก" subtitle="ช่วงเวลา 12 เดือน">
        <HealthChart
          data={healthDashboardSeries.weightByMonth}
          xKey="month"
          chartType="area"
          series={[{ key: "avgWeightKg", label: "น้ำหนัก (กก.)", color: "#5FBF9F" }]}
        />
      </PremiumCard>

      <PremiumCard title="แนวโน้มกิจกรรม" subtitle="คะแนนรายวันและการเผาผลาญ">
        <HealthChart
          data={healthDashboardSeries.activityByDay}
          xKey="day"
          chartType="line"
          series={[
            { key: "activityScore", label: "คะแนนกิจกรรม", color: "#1B2A41" },
            { key: "calories", label: "แคลอรี่ที่เผาผลาญ", color: "#FAD7C4" },
          ]}
        />
      </PremiumCard>

      <PremiumCard title="แคลอรี่ที่เผาผลาญ" subtitle="แนวโน้มรวมรายเดือน">
        <HealthChart
          data={healthDashboardSeries.caloriesByMonth}
          xKey="month"
          chartType="bar"
          series={[{ key: "calories", label: "แคลอรี่ที่เผาผลาญ", color: "#1B2A41" }]}
        />
      </PremiumCard>
    </div>
  );
}
