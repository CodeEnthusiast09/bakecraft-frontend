// src/interfaces/production.ts
import { Base } from "./global";

export type MaterialUnit = "kg" | "g" | "litres" | "ml" | "units" | "pieces";
export type ShiftStatus = "in_progress" | "completed" | "aborted";

export interface Product extends Base {
  name: string;
  description: string | null;
  isActive: boolean;
  recipes?: RecipeLine[];
  config?: ProductionConfig | null;
}

export interface RawMaterial extends Base {
  name: string;
  unit: MaterialUnit;
  currentStock: number;
  reorderLevel: number;
}

export interface RecipeLine extends Base {
  rawMaterial: RawMaterial;
  quantityRequired: number;
  unit: MaterialUnit;
}

export interface ProductionConfig extends Base {
  product?: Product;
  expectedOutputQuantity: number;
  expectedOutputUnit: string;
  productionTimeMinutes: number;
  expectedDowntimeMinutes: number;
}

export interface ShiftMaterial {
  id: string;
  rawMaterial: RawMaterial;
  quantityUsed: number;
}

export interface ShiftCreator {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ProductionShift extends Base {
  product: Product;
  startedAt: string;
  completedAt: string | null;
  actualOutputQuantity: number | null;
  status: ShiftStatus;
  notes: string | null;
  shiftCreator?: ShiftCreator;
  materials?: ShiftMaterial[];
}

export interface ProductionReportSummary {
  totalShifts: number;
  completedShifts: number;
  abortedShifts: number;
  inProgressShifts: number;
  byProduct: {
    productId: string;
    productName: string;
    totalOutput: number;
    shiftCount: number;
  }[];
}

// ─── Wizard state ─────────────────────────────────────────────────────────────

export interface WizardRawMaterialLine {
  rawMaterialId: string;
  rawMaterialName: string;
  quantityRequired: number;
  unit: MaterialUnit;
}

export interface WizardFormState {
  productId: string;
  productName: string;
  rawMaterials: WizardRawMaterialLine[];
  expectedOutputQuantity: number | "";
  expectedOutputUnit: string;
  productionTimeMinutes: number | "";
  expectedDowntimeMinutes: number | "";
}
