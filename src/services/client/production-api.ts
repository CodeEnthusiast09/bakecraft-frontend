// src/services/client/production-api.ts
import { clientRequestGateway } from "./client-request-gateway";
import type {
  CreateProductDto,
  UpdateProductDto,
  CreateRawMaterialDto,
  UpdateRawMaterialDto,
  CreateRecipeDto,
  CreateProductionConfigDto,
  UpdateProductionConfigDto,
  CreateProductionShiftDto,
  CompleteShiftDto,
  AbortShiftDto,
} from "@/interfaces/production-requests";

const gw = () => clientRequestGateway();

export const productionClientRequests = {
  // Products
  createProduct: (payload: CreateProductDto) =>
    gw().post({ url: "production/products", payload }),

  getProducts: () => gw().get("production/products"),

  getProduct: (id: string) => gw().get(`production/products/${id}`),

  updateProduct: (id: string, payload: UpdateProductDto) =>
    gw().patch({ url: `production/products/${id}`, payload }),

  deleteProduct: (id: string) =>
    gw().delete({ url: `production/products/${id}` }),

  // Raw Materials
  createRawMaterial: (payload: CreateRawMaterialDto) =>
    gw().post({ url: "production/raw-materials", payload }),

  getRawMaterials: () => gw().get("production/raw-materials"),

  getRawMaterial: (id: string) => gw().get(`production/raw-materials/${id}`),

  updateRawMaterial: (id: string, payload: UpdateRawMaterialDto) =>
    gw().patch({ url: `production/raw-materials/${id}`, payload }),

  deleteRawMaterial: (id: string) =>
    gw().delete({ url: `production/raw-materials/${id}` }),

  // Recipe
  createRecipe: (productId: string, payload: CreateRecipeDto) =>
    gw().post({ url: `production/products/${productId}/recipe`, payload }),

  getRecipe: (productId: string) =>
    gw().get(`production/products/${productId}/recipe`),

  updateRecipe: (productId: string, payload: CreateRecipeDto) =>
    gw().patch({ url: `production/products/${productId}/recipe`, payload }),

  // Production Config
  createConfig: (productId: string, payload: CreateProductionConfigDto) =>
    gw().post({ url: `production/products/${productId}/config`, payload }),

  getConfig: (productId: string) =>
    gw().get(`production/products/${productId}/config`),

  updateConfig: (productId: string, payload: UpdateProductionConfigDto) =>
    gw().patch({ url: `production/products/${productId}/config`, payload }),

  // Shifts
  createShift: (payload: CreateProductionShiftDto) =>
    gw().post({ url: "production/shifts", payload }),

  getShifts: () => gw().get("production/shifts"),

  getShift: (id: string) => gw().get(`production/shifts/${id}`),

  completeShift: (id: string, payload: CompleteShiftDto) =>
    gw().patch({ url: `production/shifts/${id}/complete`, payload }),

  abortShift: (id: string, payload: AbortShiftDto) =>
    gw().patch({ url: `production/shifts/${id}/abort`, payload }),

  // Reports
  getReportSummary: () => gw().get("production/reports/summary"),
};
