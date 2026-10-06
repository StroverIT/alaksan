import Link from "next/link";
import type { FC } from "react";
import { CONTENT } from "./consts";
import type { TAnalysisMonthNavProps } from "./types";

export const AnalysisMonthNav: FC<TAnalysisMonthNavProps> = ({
  label,
  previousHref,
  nextHref,
}) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3 sm:px-4">
    <Link
      href={previousHref}
      aria-label={CONTENT.previousMonthLabel}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-admin-border text-lg text-foreground transition hover:border-accent/50 hover:text-accent"
    >
      ←
    </Link>

    <p className="text-center text-base font-semibold text-primary sm:text-lg">{label}</p>

    {nextHref ? (
      <Link
        href={nextHref}
        aria-label={CONTENT.nextMonthLabel}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-admin-border text-lg text-foreground transition hover:border-accent/50 hover:text-accent"
      >
        →
      </Link>
    ) : (
      <span
        aria-disabled
        className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-lg border border-admin-border text-lg text-muted opacity-40"
      >
        →
      </span>
    )}
  </div>
);
