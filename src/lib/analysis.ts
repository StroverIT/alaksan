import { prisma } from "@/lib/prisma";
import type { CustomerType, OrderStatus } from "@prisma/client";

export type TAnalysisFilters = {
  from?: Date;
  to?: Date;
  customerType?: CustomerType;
  status?: OrderStatus;
};

export const getAnalysisSummary = async (filters: TAnalysisFilters = {}) => {
  const whereOrder = {
    ...(filters.customerType ? { customerType: filters.customerType } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.from || filters.to
      ? {
          createdAt: {
            ...(filters.from ? { gte: filters.from } : {}),
            ...(filters.to ? { lte: filters.to } : {}),
          },
        }
      : {}),
  };

  const [lineItems, totalOrders] = await Promise.all([
    prisma.orderLineItem.findMany({
      where: {
        kind: "CUSTOM_FOAM",
        order: whereOrder,
      },
      include: {
        foamType: true,
        order: true,
      },
    }),
    prisma.order.count({ where: whereOrder }),
  ]);

  const byFoamType = new Map<
    string,
    { name: string; quantity: number; orders: number }
  >();

  const lengthBuckets = new Map<string, number>();
  const widthBuckets = new Map<string, number>();
  const thicknessBuckets = new Map<string, number>();

  let totalQuantity = 0;

  for (const item of lineItems) {
    const name = item.foamType?.name ?? item.productName ?? "Неизвестен";
    const key = item.foamTypeId ?? name;
    const existing = byFoamType.get(key) ?? { name, quantity: 0, orders: 0 };
    existing.quantity += item.quantity;
    existing.orders += 1;
    byFoamType.set(key, existing);

    totalQuantity += item.quantity;

    if (item.lengthCm != null) {
      const bucket = bucketDimension(item.lengthCm);
      lengthBuckets.set(bucket, (lengthBuckets.get(bucket) ?? 0) + item.quantity);
    }
    if (item.widthCm != null) {
      const bucket = bucketDimension(item.widthCm);
      widthBuckets.set(bucket, (widthBuckets.get(bucket) ?? 0) + item.quantity);
    }
    if (item.thicknessCm != null) {
      const bucket = bucketThickness(item.thicknessCm);
      thicknessBuckets.set(bucket, (thicknessBuckets.get(bucket) ?? 0) + item.quantity);
    }
  }

  return {
    totalOrders,
    totalQuantity,
    totalLineItems: lineItems.length,
    byFoamType: [...byFoamType.values()].sort((a, b) => b.quantity - a.quantity),
    lengthBuckets: mapToChart(lengthBuckets),
    widthBuckets: mapToChart(widthBuckets),
    thicknessBuckets: mapToChart(thicknessBuckets),
  };
};

export const parseMonthParam = (value?: string) => {
  const now = new Date();
  const fallback = { year: now.getFullYear(), month: now.getMonth() + 1 };

  if (!value || !/^\d{4}-\d{2}$/.test(value)) {
    return fallback;
  }

  const [yearRaw, monthRaw] = value.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return fallback;
  }

  return { year, month };
};

export const getMonthRange = (year: number, month: number) => {
  const from = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const to = new Date(year, month, 0, 23, 59, 59, 999);
  return { from, to };
};

export const shiftMonth = (year: number, month: number, delta: number) => {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
};

export const formatMonthParam = (year: number, month: number) =>
  `${year}-${String(month).padStart(2, "0")}`;

const bucketDimension = (value: number) => {
  const step = 50;
  const start = Math.floor(value / step) * step;
  return `${start}–${start + step} см`;
};

const bucketThickness = (value: number) => {
  if (value <= 5) {
    return "1–5 см";
  }
  if (value <= 10) {
    return "6–10 см";
  }
  if (value <= 20) {
    return "11–20 см";
  }
  return "21+ см";
};

const mapToChart = (map: Map<string, number>) =>
  [...map.entries()]
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
