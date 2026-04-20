// src/hooks/services/production/useRecipe.ts
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import type { APIResponse, ApiError, RecipeLine } from "@/interfaces";
import type { CreateRecipeDto } from "@/interfaces/production-requests";

export const useRecipe = (productId: string) => {
  return useQuery<RecipeLine[]>({
    queryKey: ["production-recipe", productId],
    queryFn: async () => {
      const res = await clientRequest.production.getRecipe(productId);
      return (res as RecipeLine[]) ?? [];
    },
    enabled: !!productId,
  });
};

export const useSaveRecipe = (productId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse, ApiError, CreateRecipeDto>({
    mutationFn: (payload) =>
      clientRequest.production.createRecipe(productId, payload) as Promise<APIResponse>,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["production-recipe", productId] });
        queryClient.invalidateQueries({ queryKey: ["production-products"] });
        toast.success("Recipe saved");
        onSuccess?.();
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to save recipe");
    },
  });
};
