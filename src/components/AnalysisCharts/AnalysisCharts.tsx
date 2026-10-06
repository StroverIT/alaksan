"use client";

import type { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TChartRow = {
  name: string;
  quantity: number;
};

type TAnalysisChartsProps = {
  byFoamType: { name: string; quantity: number; orders: number }[];
  lengthBuckets: TChartRow[];
  widthBuckets: TChartRow[];
  thicknessBuckets: TChartRow[];
};

const CHART_COLORS = {
  grid: "#e2e0da",
  tick: "#5c6570",
  tooltipBg: "#ffffff",
  tooltipBorder: "#e2e0da",
  bar: "#c17a3a",
} as const;

const ChartBlock: FC<{ title: string; data: TChartRow[] }> = ({ title, data }) => (
  <div className="rounded-xl border border-admin-border bg-admin-surface p-4">
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    <div className="mt-4 h-64">
      {data.length === 0 ? (
        <p className="text-sm text-muted">Няма данни за периода.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="name" tick={{ fill: CHART_COLORS.tick, fontSize: 11 }} />
            <YAxis tick={{ fill: CHART_COLORS.tick, fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: CHART_COLORS.tooltipBg,
                border: `1px solid ${CHART_COLORS.tooltipBorder}`,
                borderRadius: 8,
                color: "#14181f",
              }}
            />
            <Bar dataKey="quantity" fill={CHART_COLORS.bar} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  </div>
);

export const AnalysisCharts: FC<TAnalysisChartsProps> = ({
  byFoamType,
  lengthBuckets,
  widthBuckets,
  thicknessBuckets,
}) => {
  const foamChart = byFoamType.map((row) => ({
    name: row.name,
    quantity: row.quantity,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartBlock title="Количество по вид дунапрен" data={foamChart} />
      <ChartBlock title="Дължина (обобщено)" data={lengthBuckets} />
      <ChartBlock title="Ширина (обобщено)" data={widthBuckets} />
      <ChartBlock title="Дебелина (обобщено)" data={thicknessBuckets} />
    </div>
  );
};
