"use client";

import { useQuery } from "@tanstack/react-query";
import { clientRequest } from "@/services/client";
import { Department } from "@/interfaces";

export const useSelectionDepartments = () => {
  const { data, isPending, error, isError } = useQuery<Department[]>({
    queryKey: ["selection", "departments"],
    queryFn: () => {
      return clientRequest.selection.departments();
    },
  });
  return { data, isPending, error, isError };
};
