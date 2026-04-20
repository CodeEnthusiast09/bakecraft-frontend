// src/hooks/services/production/useRawMaterials.ts
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import type { APIResponse, ApiError, RawMaterial } from "@/interfaces";
import type {
  CreateRawMaterialDto,
  UpdateRawMaterialDto,
} from "@/interfaces/production-requests";

export const useRawMaterials = () => {
  return useQuery<RawMaterial[]>({
    queryKey: ["production-raw-materials"],
    queryFn: async () => {
      const res = await clientRequest.production.getRawMaterials();
      return (res as RawMaterial[]) ?? [];
    },
  });
};

export const useCreateRawMaterial = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, CreateRawMaterialDto>({
    mutationFn: (payload) =>
      clientRequest.production.createRawMaterial(payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-raw-materials"] });
        toast.success("Raw material created successfully");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to create raw material");
    },
  });
};

export const useUpdateRawMaterial = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, { id: string; payload: UpdateRawMaterialDto }>({
    mutationFn: ({ id, payload }) =>
      clientRequest.production.updateRawMaterial(id, payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-raw-materials"] });
        toast.success("Raw material updated");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to update raw material");
    },
  });
};

export const useDeleteRawMaterial = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, string>({
    mutationFn: (id) =>
      clientRequest.production.deleteRawMaterial(id) as Promise<APIResponse>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production-raw-materials"] });
      toast.success("Raw material deleted");
      onSuccess?.();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to delete raw material");
    },
  });
};
