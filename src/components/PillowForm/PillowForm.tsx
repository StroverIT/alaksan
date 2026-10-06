"use client";

import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { formatEur } from "@/lib/coverPricing";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CONTENT } from "./consts";
import type { TPillowFormProps } from "./types";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

export const PillowForm: FC<TPillowFormProps> = ({
  catalogProductId,
  productName,
  pillowTypes,
  pillowSizes,
  pillowPrices,
}) => {
  const { addItem } = useCart();
  const [typeId, setTypeId] = useState(pillowTypes[0]?.id ?? "");
  const [sizeId, setSizeId] = useState(pillowSizes[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const selectedType = useMemo(
    () => pillowTypes.find((type) => type.id === typeId),
    [pillowTypes, typeId],
  );
  const selectedSize = useMemo(
    () => pillowSizes.find((size) => size.id === sizeId),
    [pillowSizes, sizeId],
  );

  const unitPriceEur = useMemo(() => {
    const match = pillowPrices.find(
      (price) =>
        price.pillowTypeId === typeId && price.pillowSizeId === sizeId,
    );
    return match?.priceEur ?? null;
  }, [pillowPrices, sizeId, typeId]);

  const totalPriceEur =
    unitPriceEur != null && quantity > 0 ? unitPriceEur * quantity : null;

  const handleAdd = () => {
    if (!selectedType || !selectedSize || quantity < 1) {
      toast.error(CONTENT.invalidSelectionLabel);
      return;
    }

    addItem({
      id: createId(),
      kind: "CATALOG_PRODUCT",
      catalogProductId,
      productName: `${productName} · ${selectedType.name} · ${selectedSize.label}`,
      quantity,
      lengthCm: selectedSize.lengthCm,
      widthCm: selectedSize.widthCm,
      unitPriceEur: unitPriceEur ?? undefined,
      notes: `${selectedType.name} · ${selectedSize.label}`,
    });
    toast.success(CONTENT.successToastLabel);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold text-primary">{CONTENT.titleLabel}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">{CONTENT.typeLabel}</span>
          <select
            value={typeId}
            onChange={(event) => setTypeId(event.target.value)}
            className="field"
          >
            {pillowTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-foreground">{CONTENT.sizeLabel}</span>
          <select
            value={sizeId}
            onChange={(event) => setSizeId(event.target.value)}
            className="field"
          >
            {pillowSizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.label}
              </option>
            ))}
          </select>
        </label>
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

      {totalPriceEur != null && unitPriceEur != null ? (
        <div className="mt-6 rounded-xl border border-border bg-background p-4 text-sm">
          <p className="font-tabular text-muted">
            {CONTENT.unitPriceLabel}: {formatEur(unitPriceEur)}
          </p>
          <p className="font-tabular mt-2 text-base font-semibold text-primary">
            {CONTENT.totalPriceLabel}: {formatEur(totalPriceEur)}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">{CONTENT.missingPriceLabel}</p>
      )}

      <Button variant="accent" className="mt-6" onClick={handleAdd}>
        {CONTENT.addToCartLabel}
      </Button>
    </div>
  );
};
