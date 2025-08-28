import { Plan } from "@/interfaces/plan";
import { clientRequest } from "@/services/client";
import { useQuery } from "@tanstack/react-query";

export const usePlans = () => {
  const { data, isPending, error, isError } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: () => {
      return clientRequest.plan.getAll();
    },
  });

  return {
    data,
    isPending,
    error,
    isError,
  };
};
