// src/app/[tenant-slug]/(internal-routes)/(protected)/production/_components/product-wizard/product-wizard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import {
  useRawMaterials,
  useSaveRecipe,
  useSaveProductionConfig,
} from "@/hooks/services/production";
import type { Product, MaterialUnit, WizardFormState, WizardRawMaterialLine } from "@/interfaces";
import { FaPlus, FaTrash } from "react-icons/fa";

const UNIT_OPTIONS: { value: MaterialUnit; label: string }[] = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "litres", label: "litres" },
  { value: "ml", label: "ml" },
  { value: "units", label: "units" },
  { value: "pieces", label: "pieces" },
];

const TOTAL_STEPS = 5;

interface ProductWizardProps {
  product: Product;
  onBack: () => void;
}

const emptyLine = (): WizardRawMaterialLine => ({
  rawMaterialId: "",
  rawMaterialName: "",
  quantityRequired: 0,
  unit: "kg",
});

export const ProductWizard = ({ product, onBack }: ProductWizardProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<WizardFormState>({
    productId: product.id,
    productName: product.name,
    rawMaterials: [emptyLine()],
    expectedOutputQuantity: "",
    expectedOutputUnit: "",
    productionTimeMinutes: "",
    expectedDowntimeMinutes: "",
  });

  const { data: rawMaterials = [] } = useRawMaterials();

  const { mutate: saveRecipe, isPending: isSavingRecipe } = useSaveRecipe(product.id);
  const { mutate: saveConfig, isPending: isSavingConfig } = useSaveProductionConfig(product.id);

  const isSaving = isSavingRecipe || isSavingConfig;

  // ─── Step 1 helpers ───────────────────────────────────────────────────────

  const updateLine = (index: number, patch: Partial<WizardRawMaterialLine>) => {
    setForm((prev) => {
      const lines = [...prev.rawMaterials];
      lines[index] = { ...lines[index], ...patch };
      return { ...prev, rawMaterials: lines };
    });
  };

  const addLine = () => {
    setForm((prev) => ({
      ...prev,
      rawMaterials: [...prev.rawMaterials, emptyLine()],
    }));
  };

  const removeLine = (index: number) => {
    setForm((prev) => ({
      ...prev,
      rawMaterials: prev.rawMaterials.filter((_, i) => i !== index),
    }));
  };

  // ─── Navigation ───────────────────────────────────────────────────────────

  const canAdvance = (): boolean => {
    if (step === 1) {
      return form.rawMaterials.every(
        (l) => l.rawMaterialId && l.quantityRequired > 0,
      );
    }
    if (step === 2) {
      return !!form.expectedOutputQuantity && !!form.expectedOutputUnit.trim();
    }
    if (step === 3) {
      return !!form.productionTimeMinutes;
    }
    return true;
  };

  const handleConfirmAndSave = () => {
    saveRecipe(
      {
        lines: form.rawMaterials.map((l) => ({
          rawMaterialId: l.rawMaterialId,
          quantityRequired: Number(l.quantityRequired),
          unit: l.unit,
        })),
      },
      {
        onSuccess: () => {
          saveConfig(
            {
              expectedOutputQuantity: Number(form.expectedOutputQuantity),
              expectedOutputUnit: form.expectedOutputUnit,
              productionTimeMinutes: Number(form.productionTimeMinutes),
              expectedDowntimeMinutes: Number(form.expectedDowntimeMinutes) || 0,
            },
            { onSuccess: onBack },
          );
        },
      },
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 bg-white rounded-tl-[15px] rounded-tr-[15px] p-6 min-h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-secondary-100 underline hover:text-secondary-100/80 transition-colors"
        >
          ← Back to products
        </button>
        <h2 className="text-xl font-bold text-primary-300">{product.name}</h2>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
          <div key={n} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                n === step
                  ? "bg-secondary-100 text-white"
                  : n < step
                    ? "bg-secondary-100/40 text-secondary-100"
                    : "bg-primary-500/20 text-primary-500"
              }`}
            >
              {n}
            </div>
            {n < TOTAL_STEPS && (
              <div
                className={`w-10 h-0.5 ${n < step ? "bg-secondary-100/40" : "bg-primary-500/20"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="max-w-lg">
        {step === 1 && (
          <StepRawMaterials
            lines={form.rawMaterials}
            rawMaterials={rawMaterials}
            onUpdate={updateLine}
            onAdd={addLine}
            onRemove={removeLine}
          />
        )}
        {step === 2 && (
          <StepExpectedOutput
            quantity={form.expectedOutputQuantity}
            unit={form.expectedOutputUnit}
            onChangeQuantity={(v) => setForm((p) => ({ ...p, expectedOutputQuantity: v }))}
            onChangeUnit={(v) => setForm((p) => ({ ...p, expectedOutputUnit: v }))}
          />
        )}
        {step === 3 && (
          <StepProductionTime
            minutes={form.productionTimeMinutes}
            onChange={(v) => setForm((p) => ({ ...p, productionTimeMinutes: v }))}
          />
        )}
        {step === 4 && (
          <StepExpectedDowntime
            minutes={form.expectedDowntimeMinutes}
            onChange={(v) => setForm((p) => ({ ...p, expectedDowntimeMinutes: v }))}
          />
        )}
        {step === 5 && <StepReview form={form} />}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-10 max-w-lg">
        {step > 1 ? (
          <Button
            variant="transparent"
            onClick={() => setStep((s) => s - 1)}
            className="border border-primary-500 text-primary-500 h-11 px-6"
          >
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <Button
            variant="secondary"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="h-11 px-8"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={handleConfirmAndSave}
            isLoading={isSaving}
            className="h-11 px-8"
          >
            Confirm and Save
          </Button>
        )}
      </div>
    </div>
  );
};

// ─── Step sub-components ────────────────────────────────────────────────────

interface StepRawMaterialsProps {
  lines: WizardRawMaterialLine[];
  rawMaterials: import("@/interfaces").RawMaterial[];
  onUpdate: (index: number, patch: Partial<WizardRawMaterialLine>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const StepRawMaterials = ({
  lines,
  rawMaterials,
  onUpdate,
  onAdd,
  onRemove,
}: StepRawMaterialsProps) => (
  <div>
    <h3 className="text-lg font-semibold text-primary-300 mb-1">Raw Materials</h3>
    <p className="text-sm font-light text-primary-500 mb-6">
      Select each raw material used to produce this product and specify the quantity required.
    </p>

    <div className="space-y-4">
      {lines.map((line, i) => (
        <div key={i} className="flex items-end gap-3">
          <div className="flex-1">
            <Select
              label={i === 0 ? "Raw Material" : undefined}
              placeholder="Select material"
              options={rawMaterials.map((m) => ({ value: m.id, label: m.name }))}
              defaultValue={line.rawMaterialId}
              onChange={(e) => {
                const mat = rawMaterials.find((m) => m.id === e.target.value);
                onUpdate(i, {
                  rawMaterialId: e.target.value,
                  rawMaterialName: mat?.name ?? "",
                  unit: mat?.unit ?? "kg",
                });
              }}
            />
          </div>
          <div className="w-28">
            <Input
              label={i === 0 ? "Quantity" : undefined}
              type="number"
              placeholder="0"
              min={0}
              value={line.quantityRequired === 0 ? "" : line.quantityRequired}
              onChange={(e) =>
                onUpdate(i, { quantityRequired: Number(e.target.value) })
              }
            />
          </div>
          <div className="w-28">
            <Select
              label={i === 0 ? "Unit" : undefined}
              options={UNIT_OPTIONS}
              defaultValue={line.unit}
              onChange={(e) => onUpdate(i, { unit: e.target.value as MaterialUnit })}
            />
          </div>
          {lines.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="mb-3 p-2 text-red-400 hover:text-red-600 transition-colors"
              aria-label="Remove line"
            >
              <FaTrash size={14} />
            </button>
          )}
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={onAdd}
      className="mt-4 flex items-center gap-2 text-sm text-secondary-100 hover:text-secondary-100/80 transition-colors font-light"
    >
      <FaPlus size={12} />
      Add another material
    </button>
  </div>
);

interface StepExpectedOutputProps {
  quantity: number | "";
  unit: string;
  onChangeQuantity: (v: number | "") => void;
  onChangeUnit: (v: string) => void;
}

const StepExpectedOutput = ({
  quantity,
  unit,
  onChangeQuantity,
  onChangeUnit,
}: StepExpectedOutputProps) => (
  <div>
    <h3 className="text-lg font-semibold text-primary-300 mb-1">Expected Output</h3>
    <p className="text-sm font-light text-primary-500 mb-6">
      How much of this product do you expect to produce per production run?
    </p>
    <div className="flex gap-4">
      <div className="flex-1">
        <Input
          label="Quantity"
          type="number"
          placeholder="e.g. 50"
          min={0}
          value={quantity === "" ? "" : quantity}
          onChange={(e) =>
            onChangeQuantity(e.target.value === "" ? "" : Number(e.target.value))
          }
          showRequiredAsterik
        />
      </div>
      <div className="w-40">
        <Input
          label="Unit"
          placeholder="e.g. loaves"
          value={unit}
          onChange={(e) => onChangeUnit(e.target.value)}
          showRequiredAsterik
        />
      </div>
    </div>
  </div>
);

interface StepProductionTimeProps {
  minutes: number | "";
  onChange: (v: number | "") => void;
}

const StepProductionTime = ({ minutes, onChange }: StepProductionTimeProps) => (
  <div>
    <h3 className="text-lg font-semibold text-primary-300 mb-1">Production Time</h3>
    <p className="text-sm font-light text-primary-500 mb-6">
      How many minutes does a full production run for this product typically take?
    </p>
    <Input
      label="Production time (minutes)"
      type="number"
      placeholder="e.g. 120"
      min={1}
      value={minutes === "" ? "" : minutes}
      onChange={(e) =>
        onChange(e.target.value === "" ? "" : Number(e.target.value))
      }
      showRequiredAsterik
    />
  </div>
);

interface StepExpectedDowntimeProps {
  minutes: number | "";
  onChange: (v: number | "") => void;
}

const StepExpectedDowntime = ({ minutes, onChange }: StepExpectedDowntimeProps) => (
  <div>
    <h3 className="text-lg font-semibold text-primary-300 mb-1">Expected Downtime</h3>
    <p className="text-sm font-light text-primary-500 mb-6">
      How many minutes of downtime do you expect per production run? Leave blank or enter 0 if none.
    </p>
    <Input
      label="Expected downtime (minutes)"
      type="number"
      placeholder="e.g. 15"
      min={0}
      value={minutes === "" ? "" : minutes}
      onChange={(e) =>
        onChange(e.target.value === "" ? "" : Number(e.target.value))
      }
    />
  </div>
);

const StepReview = ({ form }: { form: WizardFormState }) => (
  <div>
    <h3 className="text-lg font-semibold text-primary-300 mb-1">Review & Confirm</h3>
    <p className="text-sm font-light text-primary-500 mb-6">
      Review the configuration below before saving.
    </p>

    <div className="space-y-6">
      {/* Raw Materials */}
      <section>
        <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide mb-3">
          Raw Materials
        </h4>
        <div className="bg-secondary-300/30 rounded-lg p-4 space-y-2">
          {form.rawMaterials.map((l, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="font-light text-primary-300">
                {l.rawMaterialName || "—"}
              </span>
              <span className="text-primary-500 font-light">
                {l.quantityRequired} {l.unit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Expected Output */}
      <section>
        <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide mb-3">
          Expected Output
        </h4>
        <div className="bg-secondary-300/30 rounded-lg p-4">
          <span className="text-sm font-light text-primary-300">
            {form.expectedOutputQuantity} {form.expectedOutputUnit}
          </span>
        </div>
      </section>

      {/* Timing */}
      <section>
        <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide mb-3">
          Timing
        </h4>
        <div className="bg-secondary-300/30 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-light text-primary-500">Production time</span>
            <span className="text-primary-300 font-light">
              {form.productionTimeMinutes} min
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-light text-primary-500">Expected downtime</span>
            <span className="text-primary-300 font-light">
              {form.expectedDowntimeMinutes || 0} min
            </span>
          </div>
        </div>
      </section>
    </div>
  </div>
);
