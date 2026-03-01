import { Droplets, Flame, Footprints, Timer } from "lucide-react";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { dailyReports } from "@/mock";

const alertTone = {
  Normal: "success",
  Watch: "warning",
  Attention: "danger",
} as const;

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">DAILY FIT REPORT</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">Wellness Report Cards</h1>
      </header>

      <PremiumCard title="Generated Reports" subtitle={`${dailyReports.length} report records`}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dailyReports.map((report) => (
            <article
              key={report.id}
              className="rounded-2xl border border-line-soft bg-soft-cream p-4 shadow-premium-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold text-brand-navy">{report.petName}</p>
                  <p className="text-xs text-text-muted">{formatDate(report.reportDate)}</p>
                </div>
                <StatusBadge label={report.healthAlert} tone={alertTone[report.healthAlert]} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-surface p-2">
                  <p className="flex items-center gap-1 text-xs text-text-muted">
                    <Flame className="h-3.5 w-3.5 text-sage" />
                    Calories
                  </p>
                  <p className="font-semibold text-brand-navy">{report.caloriesBurned}</p>
                </div>
                <div className="rounded-xl bg-surface p-2">
                  <p className="flex items-center gap-1 text-xs text-text-muted">
                    <Footprints className="h-3.5 w-3.5 text-sage" />
                    Distance
                  </p>
                  <p className="font-semibold text-brand-navy">{report.distanceKm} km</p>
                </div>
                <div className="rounded-xl bg-surface p-2">
                  <p className="flex items-center gap-1 text-xs text-text-muted">
                    <Droplets className="h-3.5 w-3.5 text-sage" />
                    Swim Time
                  </p>
                  <p className="font-semibold text-brand-navy">{report.swimTimeMin} min</p>
                </div>
                <div className="rounded-xl bg-surface p-2">
                  <p className="flex items-center gap-1 text-xs text-text-muted">
                    <Timer className="h-3.5 w-3.5 text-sage" />
                    Duration
                  </p>
                  <p className="font-semibold text-brand-navy">{report.workoutDurationMin} min</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-surface p-3 text-sm text-text-muted">
                <p className="text-xs uppercase tracking-wide">Butler Notes</p>
                <p className="mt-1">{report.butlerNotes}</p>
              </div>
            </article>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
