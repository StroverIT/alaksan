"use client";

import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import {
  coverAreaM2,
  coverTotalPriceEur,
  coverUnitPriceEur,
  formatEur,
} from "@/lib/coverPricing";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CONTENT, DEFAULT_DIMENSIONS } from "./consts";
import type { TMattressCoverFormProps } from "./types";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

export const MattressCoverForm: FC<TMattressCoverFormProps> = ({
  catalogProductId,
  productName,
  pricePerM2,
}) => {
  const { addItem } = useCart();
  const [widthCm, setWidthCm] = useState(DEFAULT_DIMENSIONS.widthCm);
  const [lengthCm, setLengthCm] = useState(DEFAULT_DIMENSIONS.lengthCm);
  const [heightCm, setHeightCm] = useState(DEFAULT_DIMENSIONS.heightCm);
  const [quantity, setQuantity] = useState(DEFAULT_DIMENSIONS.quantity);

  const pricing = useMemo(() => {
    if (
      pricePerM2 == null ||
      widthCm <= 0 ||
      lengthCm <= 0 ||
      heightCm <= 0 ||
      quantity < 1
    ) {
      return null;
    }

    return {
      areaM2: coverAreaM2(lengthCm, widthCm, heightCm),
      unitPriceEur: coverUnitPriceEur(lengthCm, widthCm, heightCm, pricePerM2),
      totalPriceEur: coverTotalPriceEur(
        lengthCm,
        widthCm,
        heightCm,
        pricePerM2,
        quantity,
      ),
    };
  }, [heightCm, lengthCm, pricePerM2, quantity, widthCm]);

  const handleAdd = () => {
    if (widthCm <= 0 || lengthCm <= 0 || heightCm <= 0 || quantity < 1) {
      toast.error(CONTENT.invalidDimensionsLabel);
      return;
    }

    addItem({
      id: createId(),
      kind: "CATALOG_PRODUCT",
      catalogProductId,
      productName,
      quantity,
      lengthCm,
      widthCm,
      thicknessCm: heightCm,
      unitPriceEur: pricing?.unitPriceEur,
    });
    toast.success(CONTENT.successToastLabel);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold text-primary">{CONTENT.titleLabel}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {(
          [
            [CONTENT.widthLabel, widthCm, setWidthCm],
            [CONTENT.lengthLabel, lengthCm, setLengthCm],
            [CONTENT.heightLabel, heightCm, setHeightCm],
          ] as const
        ).map(([label, value, setter]) => (
          <label key={label} className="block text-sm">
            <span className="font-medium text-foreground">{label}</span>
            <input
              type="number"
              min={1}
              step={0.1}
              value={value}
              onChange={(event) => setter(Number(event.target.value))}
              className="field font-tabular"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block max-w-xs text-sm">
        <span className="font-medium">{CONTENT.quantityLabel}</span>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="field font-tabular"
        />
      </label>

      {pricing ? (
        <div className="mt-6 rounded-xl border border-border bg-background p-4 text-sm">
          <p className="font-tabular text-muted">
            {CONTENT.areaLabel}: {pricing.areaM2.toFixed(2)} {CONTENT.areaUnitLabel}
          </p>
          <p className="font-tabular mt-1 text-muted">
            {CONTENT.unitPriceLabel}: {formatEur(pricing.unitPriceEur)}
          </p>
          <p className="font-tabular mt-2 text-base font-semibold text-primary">
            {CONTENT.totalPriceLabel}: {formatEur(pricing.totalPriceEur)}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">{CONTENT.missingRateLabel}</p>
      )}

      <Button variant="accent" className="mt-6" onClick={handleAdd}>
        {CONTENT.addToCartLabel}
      </Button>
    </div>
  );
};
