// src/hooks/services/production/useProductionReport.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { clientRequest } from "@/services/client";
import type { ProductionReportSummary } from "@/interfaces";

export const useProductionReport = () => {
  return useQuery<ProductionReportSummary>({
    queryKey: ["production-report-summary"],
    queryFn: async () => {
      const res = await clientRequest.production.getReportSummary();
      return res as ProductionReportSummary;
    },
  });
};
