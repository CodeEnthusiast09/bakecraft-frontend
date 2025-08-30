import { useQuery } from "@tanstack/react-query";
import { clientRequest } from "@/services/client";
import { User } from "@/interfaces";
import { retrieveFromLocalStorage } from "@/lib/localStorage";

export const useAccount = () => {
  const isLoggedIn = retrieveFromLocalStorage("token");

  const { data, isPending, error, isError } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: () => {
      return clientRequest.user.accountDetails();
    },
    enabled: !!isLoggedIn,
  });

  return { data, isPending, error, isError };
};
