"use client";

import dynamic from "next/dynamic";

export interface HealthChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface HealthChartProps {
  data: object[];
  xKey: string;
  series: HealthChartSeries[];
  chartType?: "line" | "bar" | "area";
}

const DynamicHealthChartClient = dynamic(
  () => import("./HealthChartClient").then((module) => module.HealthChartClient),
  {
    ssr: false,
    loading: () => <div className="h-72 w-full rounded-2xl bg-soft-cream" />,
  },
);

export function HealthChart({
  data,
  xKey,
  series,
  chartType = "line",
}: HealthChartProps) {
  return (
    <DynamicHealthChartClient
      data={data}
      xKey={xKey}
      series={series}
      chartType={chartType}
    />
  );
}
