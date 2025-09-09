"use client";

import { useQuery } from "@tanstack/react-query";
import { clientRequest } from "@/services/client";
import { Role } from "@/interfaces";

export const useSelectionRoles = () => {
  const { data, isPending, error, isError } = useQuery<Role[]>({
    queryKey: ["selection", "roles"],
    queryFn: () => {
      return clientRequest.selection.roles();
    },
  });
  return { data, isPending, error, isError };
};
