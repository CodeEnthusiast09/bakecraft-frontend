// src/interfaces/production-requests.ts
import type { MaterialUnit } from "./production";

export interface CreateProductDto {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CreateRawMaterialDto {
  name: string;
  unit: MaterialUnit;
  currentStock?: number;
  reorderLevel?: number;
}

export interface UpdateRawMaterialDto {
  name?: string;
  unit?: MaterialUnit;
  currentStock?: number;
  reorderLevel?: number;
}

export interface RecipeLineDto {
  rawMaterialId: string;
  quantityRequired: number;
  unit: MaterialUnit;
}

export interface CreateRecipeDto {
  lines: RecipeLineDto[];
}

export interface CreateProductionConfigDto {
  expectedOutputQuantity: number;
  expectedOutputUnit: string;
  productionTimeMinutes: number;
  expectedDowntimeMinutes?: number;
}

export interface UpdateProductionConfigDto {
  expectedOutputQuantity?: number;
  expectedOutputUnit?: string;
  productionTimeMinutes?: number;
  expectedDowntimeMinutes?: number;
}

export interface ShiftMaterialDto {
  rawMaterialId: string;
  quantityUsed: number;
}

export interface CreateProductionShiftDto {
  productId: string;
  startedAt: string;
  notes?: string;
  materials?: ShiftMaterialDto[];
}

export interface CompleteShiftDto {
  actualOutputQuantity: number;
  notes?: string;
  materials?: ShiftMaterialDto[];
}

export interface AbortShiftDto {
  notes?: string;
}
