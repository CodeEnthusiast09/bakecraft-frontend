// src/hooks/services/production/useProducts.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { clientRequest } from "@/services/client";
import type { Product } from "@/interfaces";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["production-products"],
    queryFn: async () => {
      const res = await clientRequest.production.getProducts();
      return (res as Product[]) ?? [];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["production-products", id],
    queryFn: async () => {
      const res = await clientRequest.production.getProduct(id);
      return res as Product;
    },
    enabled: !!id,
  });
};
