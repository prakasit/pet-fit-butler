"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { HealthChartProps } from "./HealthChart";

export function HealthChartClient({
  data,
  xKey,
  series,
  chartType = "line",
}: HealthChartProps) {
  const commonAxes = (
    <>
      <CartesianGrid strokeDasharray="4 4" stroke="rgba(30, 44, 58, 0.14)" />
      <XAxis dataKey={xKey} tick={{ fill: "rgba(30, 44, 58, 0.72)", fontSize: 12 }} />
      <YAxis tick={{ fill: "rgba(30, 44, 58, 0.72)", fontSize: 12 }} />
      <Tooltip
        contentStyle={{
          borderRadius: "12px",
          border: "1px solid rgba(30,44,58,0.12)",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 12px 28px rgba(30,44,58,0.12)",
          fontSize: "12px",
        }}
      />
    </>
  );

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "line" ? (
          <LineChart data={data}>
            {commonAxes}
            {series.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.label}
                stroke={item.color}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        ) : chartType === "bar" ? (
          <BarChart data={data}>
            {commonAxes}
            {series.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.label}
                fill={item.color}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </BarChart>
        ) : (
          <AreaChart data={data}>
            {commonAxes}
            {series.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.label}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.25}
                strokeWidth={2.5}
              />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
