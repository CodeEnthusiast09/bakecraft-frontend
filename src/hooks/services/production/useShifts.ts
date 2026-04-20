// src/hooks/services/production/useShifts.ts
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import type { APIResponse, ApiError, ProductionShift } from "@/interfaces";
import type {
  AbortShiftDto,
  CompleteShiftDto,
  CreateProductionShiftDto,
} from "@/interfaces/production-requests";

export const useShifts = () => {
  return useQuery<ProductionShift[]>({
    queryKey: ["production-shifts"],
    queryFn: async () => {
      const res = await clientRequest.production.getShifts();
      return (res as ProductionShift[]) ?? [];
    },
  });
};

export const useShift = (id: string) => {
  return useQuery<ProductionShift>({
    queryKey: ["production-shifts", id],
    queryFn: async () => {
      const res = await clientRequest.production.getShift(id);
      return res as ProductionShift;
    },
    enabled: !!id,
  });
};

export const useCreateShift = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, CreateProductionShiftDto>({
    mutationFn: (payload) =>
      clientRequest.production.createShift(payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-shifts"] });
        toast.success("Production shift started");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to start shift");
    },
  });
};

export const useCompleteShift = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, { id: string; payload: CompleteShiftDto }>({
    mutationFn: ({ id, payload }) =>
      clientRequest.production.completeShift(id, payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-shifts"] });
        toast.success("Shift marked as completed");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to complete shift");
    },
  });
};

export const useAbortShift = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, { id: string; payload: AbortShiftDto }>({
    mutationFn: ({ id, payload }) =>
      clientRequest.production.abortShift(id, payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-shifts"] });
        toast.success("Shift aborted");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to abort shift");
    },
  });
};
