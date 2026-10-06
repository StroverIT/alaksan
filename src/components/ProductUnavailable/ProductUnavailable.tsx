import { ButtonLink } from "@/components/Button";
import type { FC } from "react";
import { CONTENT } from "./consts";

export const ProductUnavailable: FC = () => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
      <p className="text-lg font-medium text-foreground">{CONTENT.unavailableLabel}</p>
      <ButtonLink href="/magazin" variant="secondary" className="mt-6">
        {CONTENT.backToShopLabel}
      </ButtonLink>
    </div>
  );
};
