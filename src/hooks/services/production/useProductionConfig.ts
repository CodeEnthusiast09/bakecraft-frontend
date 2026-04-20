// src/hooks/services/production/useProductionConfig.ts
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import type { APIResponse, ApiError, ProductionConfig } from "@/interfaces";
import type {
  CreateProductionConfigDto,
  UpdateProductionConfigDto,
} from "@/interfaces/production-requests";

export const useProductionConfig = (productId: string) => {
  return useQuery<ProductionConfig>({
    queryKey: ["production-config", productId],
    queryFn: async () => {
      const res = await clientRequest.production.getConfig(productId);
      return res as ProductionConfig;
    },
    enabled: !!productId,
    retry: false,
  });
};

export const useSaveProductionConfig = (
  productId: string,
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponse,
    ApiError,
    CreateProductionConfigDto | UpdateProductionConfigDto
  >({
    mutationFn: (payload) =>
      clientRequest.production.createConfig(
        productId,
        payload as CreateProductionConfigDto,
      ) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({
          queryKey: ["production-config", productId],
        });
        queryClient.invalidateQueries({ queryKey: ["production-products"] });
        toast.success("Production config saved");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to save config");
    },
  });
};
