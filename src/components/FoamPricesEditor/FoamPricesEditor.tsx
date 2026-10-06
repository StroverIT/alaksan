"use client";

import type { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_PATH, CONTENT } from "./consts";
import type { TFoamPricesEditorProps } from "./types";

export const FoamPricesEditor: FC<TFoamPricesEditorProps> = ({ foamTypes }) => {
  const router = useRouter();
  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      foamTypes.map((foam) => [
        foam.id,
        foam.pricePerM3 != null ? String(foam.pricePerM3) : "",
      ]),
    ),
  );
  const [isSaving, setIsSaving] = useState(false);

  const handlePriceChange = (id: string, value: string) => {
    setPrices((current) => ({ ...current, [id]: value }));
  };

  const handleSave = async () => {
    const payload = foamTypes.map((foam) => {
      const raw = prices[foam.id]?.trim() ?? "";
      const pricePerM3 = raw === "" ? null : Number(raw);
      return { id: foam.id, pricePerM3 };
    });

    const hasInvalid = payload.some(
      (row) =>
        row.pricePerM3 != null &&
        (!Number.isFinite(row.pricePerM3) || row.pricePerM3 < 0),
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

  if (foamTypes.length === 0) {
    return (
      <p className="rounded-xl border border-admin-border bg-admin-surface p-6 text-center text-sm text-muted">
        {CONTENT.emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-admin-border bg-admin-surface">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-admin-border bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{CONTENT.codeColumnLabel}</th>
              <th className="px-4 py-3 font-medium">{CONTENT.priceColumnLabel}</th>
            </tr>
          </thead>
          <tbody>
            {foamTypes.map((foam) => (
              <tr
                key={foam.id}
                className="border-t border-admin-border hover:bg-background/80"
              >
                <td className="px-4 py-3 font-medium font-tabular text-foreground">
                  {foam.name}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={prices[foam.id] ?? ""}
                    onChange={(event) =>
                      handlePriceChange(foam.id, event.target.value)
                    }
                    className="field max-w-[160px] font-tabular"
                  />
                </td>
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
