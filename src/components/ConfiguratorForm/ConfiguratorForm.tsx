"use client";

import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { formatEur } from "@/lib/coverPricing";
import {
  foamTotalPriceEur,
  foamUnitPriceEur,
  foamVolumeM3,
} from "@/lib/foamPricing";
import type { TCartFoamItem } from "@/types";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CONFIGURATOR_CONTENT, STEP_PROGRESS_CLASS } from "./consts";
import type { TConfiguratorFormProps, TConfiguratorStep } from "./types";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

export const ConfiguratorForm: FC<TConfiguratorFormProps> = ({
  foamTypes,
  embedded = false,
}) => {
  const { addItem } = useCart();
  const [step, setStep] = useState<TConfiguratorStep>(1);
  const [foamTypeId, setFoamTypeId] = useState(foamTypes[0]?.id ?? "");
  const [lengthCm, setLengthCm] = useState("");
  const [widthCm, setWidthCm] = useState("");
  const [thicknessCm, setThicknessCm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const selectedFoam = useMemo(
    () => foamTypes.find((foam) => foam.id === foamTypeId),
    [foamTypeId, foamTypes],
  );

  const parsedDimensions = useMemo(() => {
    const length = Number(lengthCm);
    const width = Number(widthCm);
    const thickness = Number(thicknessCm);
    return { length, width, thickness };
  }, [lengthCm, thicknessCm, widthCm]);

  const hasValidDimensions =
    lengthCm !== "" &&
    widthCm !== "" &&
    thicknessCm !== "" &&
    parsedDimensions.length > 0 &&
    parsedDimensions.width > 0 &&
    parsedDimensions.thickness > 0;

  const pricing = useMemo(() => {
    if (
      !hasValidDimensions ||
      selectedFoam?.pricePerM3 == null ||
      !Number.isFinite(selectedFoam.pricePerM3)
    ) {
      return null;
    }

    const { length, width, thickness } = parsedDimensions;
    const volumeM3 = foamVolumeM3(length, width, thickness);
    const unitPriceEur = foamUnitPriceEur(
      length,
      width,
      thickness,
      selectedFoam.pricePerM3,
    );
    const totalPriceEur = foamTotalPriceEur(
      length,
      width,
      thickness,
      selectedFoam.pricePerM3,
      quantity,
    );

    return { volumeM3, unitPriceEur, totalPriceEur };
  }, [hasValidDimensions, parsedDimensions, quantity, selectedFoam]);

  const handleNext = () => {
    if (step === 2 && !hasValidDimensions) {
      toast.error(CONFIGURATOR_CONTENT.invalidDimensionsLabel);
      return;
    }
    setStep((s) => (s + 1) as TConfiguratorStep);
  };

  const handleAdd = () => {
    if (!selectedFoam || !hasValidDimensions) {
      toast.error(CONFIGURATOR_CONTENT.invalidDimensionsLabel);
      return;
    }

    const item: TCartFoamItem = {
      id: createId(),
      kind: "CUSTOM_FOAM",
      foamTypeId: selectedFoam.id,
      foamTypeName: selectedFoam.name,
      lengthCm: parsedDimensions.length,
      widthCm: parsedDimensions.width,
      thicknessCm: parsedDimensions.thickness,
      quantity,
      unitPriceEur: pricing?.unitPriceEur,
      notes: notes.trim() || undefined,
    };

    addItem(item);
    toast.success(CONFIGURATOR_CONTENT.successToastLabel);
    setStep(1);
    setLengthCm("");
    setWidthCm("");
    setThicknessCm("");
    setNotes("");
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
      {embedded ? (
        <h2 className="text-xl font-bold text-primary">
          {CONFIGURATOR_CONTENT.embeddedTitleLabel}
        </h2>
      ) : (
        <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          {CONFIGURATOR_CONTENT.titleLabel}
        </h1>
      )}
      {embedded ? null : (
        <p className="mt-3 text-muted">{CONFIGURATOR_CONTENT.leadLabel}</p>
      )}

      <div className="mt-6 h-1 overflow-hidden rounded-full bg-accent-muted/70">
        <div
          className={`h-full bg-accent transition-[width] duration-300 ${STEP_PROGRESS_CLASS[step]}`}
        />
      </div>

      <ol className="mt-4 grid grid-cols-4 gap-2">
        {(
          [
            CONFIGURATOR_CONTENT.stepMaterialLabel,
            CONFIGURATOR_CONTENT.stepDimensionsLabel,
            CONFIGURATOR_CONTENT.stepQuantityLabel,
            CONFIGURATOR_CONTENT.stepReviewLabel,
          ] as const
        ).map((label, index) => {
          const stepNumber = (index + 1) as TConfiguratorStep;
          const current = step === stepNumber;
          const done = step > stepNumber;

          return (
            <li key={label}>
              <button
                type="button"
                disabled={stepNumber > step}
                aria-current={current ? "step" : undefined}
                onClick={() => setStep(stepNumber)}
                className={`flex w-full flex-col items-start rounded-xl px-2 py-2 text-left text-xs font-medium sm:px-3 ${
                  current
                    ? "bg-primary text-primary-foreground"
                    : done
                      ? "bg-accent-muted/70 text-foreground"
                      : "text-muted"
                }`}
              >
                <span className="font-tabular">{String(stepNumber).padStart(2, "0")}</span>
                <span className="mt-1 hidden sm:inline">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm font-medium text-foreground sm:hidden">
        {step === 1 && CONFIGURATOR_CONTENT.stepMaterialLabel}
        {step === 2 && CONFIGURATOR_CONTENT.stepDimensionsLabel}
        {step === 3 && CONFIGURATOR_CONTENT.stepQuantityLabel}
        {step === 4 && CONFIGURATOR_CONTENT.stepReviewLabel}
      </p>

      <div className="mt-8 space-y-4">
        {step === 1 ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {foamTypes.map((foam) => (
              <label
                key={foam.id}
                className={`flex cursor-pointer flex-col rounded-xl border px-3 py-3 transition ${
                  foamTypeId === foam.id
                    ? "border-accent bg-accent-muted/30"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <input
                  type="radio"
                  name="foam"
                  className="sr-only"
                  checked={foamTypeId === foam.id}
                  onChange={() => setFoamTypeId(foam.id)}
                />
                <span className="font-semibold font-tabular">{foam.name}</span>
                {foam.pricePerM3 != null ? (
                  <span className="mt-0.5 text-sm text-muted font-tabular">
                    {foam.pricePerM3.toFixed(2)}{" "}
                    {CONFIGURATOR_CONTENT.pricePerM3SuffixLabel}
                  </span>
                ) : foam.description ? (
                  <span className="mt-0.5 text-sm text-muted">{foam.description}</span>
                ) : null}
              </label>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  [CONFIGURATOR_CONTENT.lengthLabel, lengthCm, setLengthCm],
                  [CONFIGURATOR_CONTENT.widthLabel, widthCm, setWidthCm],
                  [
                    CONFIGURATOR_CONTENT.thicknessLabel,
                    thicknessCm,
                    setThicknessCm,
                  ],
                ] as const
              ).map(([label, value, setter]) => (
                <label key={label} className="block text-sm">
                  <span className="font-medium text-foreground">{label}</span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={value}
                    placeholder={CONFIGURATOR_CONTENT.dimensionPlaceholderLabel}
                    onChange={(event) => setter(event.target.value)}
                    className="field font-tabular"
                  />
                </label>
              ))}
            </div>

            {hasValidDimensions && pricing ? (
              <div className="rounded-xl border border-border bg-background p-4 text-sm">
                <p className="font-tabular text-muted">
                  {CONFIGURATOR_CONTENT.volumeLabel}:{" "}
                  {pricing.volumeM3.toFixed(4)}{" "}
                  {CONFIGURATOR_CONTENT.volumeUnitLabel}
                </p>
                <p className="font-tabular mt-2 text-base font-semibold text-primary">
                  {CONFIGURATOR_CONTENT.unitPriceLabel}:{" "}
                  {formatEur(pricing.unitPriceEur)}
                </p>
              </div>
            ) : null}

            {hasValidDimensions && !pricing ? (
              <p className="text-sm text-muted">
                {CONFIGURATOR_CONTENT.missingPriceLabel}
              </p>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <label className="block text-sm">
              <span className="font-medium">{CONFIGURATOR_CONTENT.quantityLabel}</span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="field max-w-xs font-tabular"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium">{CONFIGURATOR_CONTENT.notesLabel}</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="field"
              />
            </label>
          </div>
        ) : null}

        {step === 4 && selectedFoam ? (
          <div className="rounded-xl bg-background p-4 text-sm">
            <p>
              <strong>{selectedFoam.name}</strong>
            </p>
            <p className="font-tabular mt-2 text-muted">
              {parsedDimensions.length} × {parsedDimensions.width} ×{" "}
              {parsedDimensions.thickness}{" "}
              {CONFIGURATOR_CONTENT.dimensionUnitLabel} · брой {quantity}
            </p>
            {pricing ? (
              <>
                <p className="font-tabular mt-3 text-muted">
                  {CONFIGURATOR_CONTENT.unitPriceLabel}:{" "}
                  {formatEur(pricing.unitPriceEur)}
                </p>
                <p className="font-tabular mt-1 text-base font-semibold text-primary">
                  {CONFIGURATOR_CONTENT.totalPriceLabel}:{" "}
                  {formatEur(pricing.totalPriceEur)}
                </p>
              </>
            ) : (
              <p className="mt-3 text-muted">
                {CONFIGURATOR_CONTENT.missingPriceLabel}
              </p>
            )}
            {notes ? <p className="mt-2 text-muted">{notes}</p> : null}
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 1 ? (
          <Button
            variant="secondary"
            onClick={() => setStep((s) => (s - 1) as TConfiguratorStep)}
          >
            {CONFIGURATOR_CONTENT.backLabel}
          </Button>
        ) : null}
        {step < 4 ? (
          <Button variant="primary" onClick={handleNext}>
            {CONFIGURATOR_CONTENT.nextLabel}
          </Button>
        ) : (
          <Button variant="accent" onClick={handleAdd}>
            {CONFIGURATOR_CONTENT.addToCartLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
