"use client";

import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import type { TCartFoamItem } from "@/types";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CONFIGURATOR_CONTENT } from "./consts";
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
        <h1 className="text-2xl font-bold text-primary">
          {CONFIGURATOR_CONTENT.titleLabel}
        </h1>
      )}

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
        {[1, 2, 3, 4].map((s) => (
          <span
            key={s}
            className={`rounded-full px-3 py-1 ${
              step === s ? "bg-primary text-primary-foreground" : "bg-accent-muted/60 text-muted"
            }`}
          >
            {s === 1 && CONFIGURATOR_CONTENT.stepMaterialLabel}
            {s === 2 && CONFIGURATOR_CONTENT.stepDimensionsLabel}
            {s === 3 && CONFIGURATOR_CONTENT.stepQuantityLabel}
            {s === 4 && CONFIGURATOR_CONTENT.stepReviewLabel}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {step === 1 ? (
          <div className="grid gap-3">
            {foamTypes.map((foam) => (
              <label
                key={foam.id}
                className={`flex cursor-pointer flex-col rounded-xl border p-4 transition ${
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
                <span className="font-semibold">{foam.name}</span>
                {foam.description ? (
                  <span className="mt-1 text-sm text-muted">{foam.description}</span>
                ) : null}
              </label>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                [CONFIGURATOR_CONTENT.lengthLabel, lengthCm, setLengthCm],
                [CONFIGURATOR_CONTENT.widthLabel, widthCm, setWidthCm],
                [CONFIGURATOR_CONTENT.thicknessLabel, thicknessCm, setThicknessCm],
              ] as const
            ).map(([label, value, setter]) => (
              <label key={label} className="block text-sm">
                <span className="font-medium text-foreground">{label}</span>
                <input
                  type="number"
                  min={1}
                  step={0.1}
                  value={value}
                  placeholder={CONFIGURATOR_CONTENT.dimensionPlaceholderLabel}
                  onChange={(event) => setter(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 font-tabular"
                />
              </label>
            ))}
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
                className="mt-1 w-full max-w-xs rounded-xl border border-border bg-background px-3 py-2 font-tabular"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium">{CONFIGURATOR_CONTENT.notesLabel}</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
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
              {parsedDimensions.thickness} см · брой {quantity}
            </p>
            {notes ? <p className="mt-2 text-muted">{notes}</p> : null}
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 1 ? (
          <Button variant="secondary" onClick={() => setStep((s) => (s - 1) as TConfiguratorStep)}>
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
