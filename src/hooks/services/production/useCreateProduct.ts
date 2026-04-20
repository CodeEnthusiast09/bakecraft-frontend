// src/hooks/services/production/useCreateProduct.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import type { APIResponse, ApiError } from "@/interfaces";
import type { CreateProductDto } from "@/interfaces/production-requests";

export const useCreateProduct = (onSuccess?: (productId: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, CreateProductDto>({
    mutationFn: (payload) =>
      clientRequest.production.createProduct(payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-products"] });
        toast.success("Product created successfully");
        onSuccess?.(res.data?.id);
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to create product");
    },
  });
};

export const useUpdateProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, { id: string; payload: Partial<CreateProductDto> }>({
    mutationFn: ({ id, payload }) =>
      clientRequest.production.updateProduct(id, payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-products"] });
        toast.success("Product updated successfully");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to update product");
    },
  });
};

export const useDeleteProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, string>({
    mutationFn: (id) =>
      clientRequest.production.deleteProduct(id) as Promise<APIResponse>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production-products"] });
      toast.success("Product deleted");
      onSuccess?.();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to delete product");
    },
  });
};
