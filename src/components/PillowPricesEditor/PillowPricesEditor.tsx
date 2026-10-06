"use client";

import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_PATH, CONTENT } from "./consts";
import type { TPillowPricesEditorProps } from "./types";

const priceKey = (typeId: string, sizeId: string) => `${typeId}:${sizeId}`;

export const PillowPricesEditor: FC<TPillowPricesEditorProps> = ({
  pillowTypes,
  pillowSizes,
  pillowPrices,
}) => {
  const router = useRouter();
  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      pillowPrices.map((price) => [
        priceKey(price.pillowTypeId, price.pillowSizeId),
        price.priceEur != null ? String(price.priceEur) : "",
      ]),
    ),
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (typeId: string, sizeId: string, value: string) => {
    setPrices((current) => ({
      ...current,
      [priceKey(typeId, sizeId)]: value,
    }));
  };

  const handleSave = async () => {
    const payload = pillowTypes.flatMap((type) =>
      pillowSizes.map((size) => {
        const raw = prices[priceKey(type.id, size.id)]?.trim() ?? "";
        const priceEur = raw === "" ? null : Number(raw);
        return {
          pillowTypeId: type.id,
          pillowSizeId: size.id,
          priceEur,
        };
      }),
    );

    const hasInvalid = payload.some(
      (row) =>
        row.priceEur != null &&
        (!Number.isFinite(row.priceEur) || row.priceEur < 0),
    );

    if (hasInvalid) {
      toast.error(CONTENT.invalidPriceLabel);
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(API_PATH, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prices: payload }),
      });

      if (!response.ok) {
        toast.error(CONTENT.errorToastLabel);
        return;
      }

      toast.success(CONTENT.successToastLabel);
      router.refresh();
    } catch {
      toast.error(CONTENT.errorToastLabel);
    } finally {
      setIsSaving(false);
    }
  };

  if (pillowTypes.length === 0 || pillowSizes.length === 0) {
    return (
      <p className="rounded-xl border border-admin-border bg-admin-surface p-6 text-center text-sm text-muted">
        {CONTENT.emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">{CONTENT.leadHintLabel}</p>
      <div className="overflow-x-auto rounded-xl border border-admin-border bg-admin-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-admin-border bg-background text-muted">
            <tr>
              <th className="px-3 py-3 font-medium">{CONTENT.typeColumnLabel}</th>
              {pillowSizes.map((size) => (
                <th key={size.id} className="px-3 py-3 font-medium whitespace-nowrap">
                  {size.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pillowTypes.map((type) => (
              <tr
                key={type.id}
                className="border-t border-admin-border hover:bg-background/80"
              >
                <td className="px-3 py-3 font-medium text-foreground">{type.name}</td>
                {pillowSizes.map((size) => (
                  <td key={size.id} className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={prices[priceKey(type.id, size.id)] ?? ""}
                      onChange={(event) =>
                        handleChange(type.id, size.id, event.target.value)
                      }
                      className="field max-w-[110px] font-tabular"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? CONTENT.savingLabel : CONTENT.saveButtonLabel}
      </button>

      <div className="rounded-xl border border-admin-border bg-admin-surface p-5 text-sm text-muted">
        <p className="font-medium text-foreground">{CONTENT.formulaTitleLabel}</p>
        <p className="mt-2 leading-relaxed">{CONTENT.formulaBodyLabel}</p>
      </div>
    </div>
  );
};
