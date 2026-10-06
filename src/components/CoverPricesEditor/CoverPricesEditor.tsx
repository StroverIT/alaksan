"use client";

import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_PATH, CONTENT } from "./consts";
import type { TCoverPricesEditorProps } from "./types";

export const CoverPricesEditor: FC<TCoverPricesEditorProps> = ({
  productId,
  pricePerM2,
}) => {
  const router = useRouter();
  const [price, setPrice] = useState(
    pricePerM2 != null ? String(pricePerM2) : "",
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const raw = price.trim();
    const parsed = raw === "" ? null : Number(raw);

    if (parsed != null && (!Number.isFinite(parsed) || parsed < 0)) {
      toast.error(CONTENT.invalidPriceLabel);
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(API_PATH, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId, pricePerM2: parsed }),
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

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-admin-border bg-admin-surface p-5">
        <label className="block max-w-xs text-sm">
          <span className="font-medium text-foreground">{CONTENT.priceLabel}</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="field mt-2 font-tabular"
          />
        </label>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="mt-5 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? CONTENT.savingLabel : CONTENT.saveButtonLabel}
        </button>
      </div>

      <div className="rounded-xl border border-admin-border bg-admin-surface p-5 text-sm text-muted">
        <p className="font-medium text-foreground">{CONTENT.formulaTitleLabel}</p>
        <p className="mt-2 leading-relaxed">{CONTENT.formulaBodyLabel}</p>
      </div>
    </div>
  );
};
