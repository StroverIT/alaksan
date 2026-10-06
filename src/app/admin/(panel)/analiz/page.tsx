import AnalysisCharts from "@/components/AnalysisCharts";
import AnalysisMonthNav from "@/components/AnalysisMonthNav";
import { MONTH_LABELS } from "@/components/AnalysisMonthNav/consts";
import { ORDER_STATUS_LABELS } from "@/consts";
import {
  formatMonthParam,
  getAnalysisSummary,
  getMonthRange,
  parseMonthParam,
  shiftMonth,
} from "@/lib/analysis";
import { CustomerType, OrderStatus } from "@prisma/client";
import type { FC } from "react";

type TPageProps = {
  searchParams: Promise<{
    month?: string;
    customerType?: string;
    status?: string;
  }>;
};

const AnalysisPage: FC<TPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const { year, month } = parseMonthParam(params.month);
  const { from, to } = getMonthRange(year, month);

  const customerType =
    params.customerType === "COMPANY" || params.customerType === "INDIVIDUAL"
      ? (params.customerType as CustomerType)
      : undefined;
  const status =
    params.status && params.status in OrderStatus
      ? (params.status as OrderStatus)
      : undefined;

  const summary = await getAnalysisSummary({
    from,
    to,
    customerType,
    status,
  });

  const now = new Date();
  const currentMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
  const previous = shiftMonth(year, month, -1);
  const next = shiftMonth(year, month, 1);
  const canGoNext =
    next.year < currentMonth.year ||
    (next.year === currentMonth.year && next.month <= currentMonth.month);

  const buildHref = (targetYear: number, targetMonth: number) => {
    const query = new URLSearchParams();
    query.set("month", formatMonthParam(targetYear, targetMonth));
    if (customerType) {
      query.set("customerType", customerType);
    }
    if (status) {
      query.set("status", status);
    }
    return `/admin/analiz?${query.toString()}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Анализ</h1>
      <p className="mt-1 text-sm text-muted">
        Статистика по доставки, вид дунапрен, размери и количество
      </p>

      <div className="mt-6">
        <AnalysisMonthNav
          label={`${MONTH_LABELS[month - 1]} ${year}`}
          previousHref={buildHref(previous.year, previous.month)}
          nextHref={canGoNext ? buildHref(next.year, next.month) : null}
        />
      </div>

      <form
        method="GET"
        className="mt-4 grid gap-3 rounded-xl border border-admin-border bg-admin-surface p-4 sm:grid-cols-3"
      >
        <input type="hidden" name="month" value={formatMonthParam(year, month)} />
        <label className="text-xs">
          <span className="text-muted">Клиент</span>
          <select
            name="customerType"
            defaultValue={params.customerType ?? ""}
            className="mt-1 w-full rounded-lg border border-admin-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="">Всички</option>
            <option value="COMPANY">Фирми</option>
            <option value="INDIVIDUAL">Физ. лица</option>
          </select>
        </label>
        <label className="text-xs">
          <span className="text-muted">Статус</span>
          <select
            name="status"
            defaultValue={params.status ?? ""}
            className="mt-1 w-full rounded-lg border border-admin-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="">Всички</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-accent px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            Филтрирай
          </button>
        </div>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-admin-border bg-admin-surface p-4">
          <p className="text-xs text-muted">Доставки (бр.)</p>
          <p className="font-tabular mt-1 text-3xl font-bold text-accent">
            {summary.totalOrders}
          </p>
        </div>
        <div className="rounded-xl border border-admin-border bg-admin-surface p-4">
          <p className="text-xs text-muted">Общо количество (бр.)</p>
          <p className="font-tabular mt-1 text-3xl font-bold text-primary">
            {summary.totalQuantity}
          </p>
        </div>
        <div className="rounded-xl border border-admin-border bg-admin-surface p-4">
          <p className="text-xs text-muted">Редове custom дунапрен</p>
          <p className="font-tabular mt-1 text-3xl font-bold text-primary">
            {summary.totalLineItems}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <AnalysisCharts
          byFoamType={summary.byFoamType}
          lengthBuckets={summary.lengthBuckets}
          widthBuckets={summary.widthBuckets}
          thicknessBuckets={summary.thicknessBuckets}
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
