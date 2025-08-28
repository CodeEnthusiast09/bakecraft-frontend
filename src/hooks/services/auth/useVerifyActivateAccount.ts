"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { useEffect, useState } from "react";

export const useVerifyActivateAccount = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("staff") as string;
  const token = searchParams.get("key") as string;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { mutate, isPending } = useMutation<APIResponse, ApiError>({
    // @ts-ignore
    mutationFn: () => {
      const data = {
        token,
        userId,
      };

      return clientRequest?.auth?.verifyActivateAccount(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  useEffect(() => {
    if (token && userId) mutate();
  }, [token, userId]);

  return { mutate, isPending, isSuccess, isError };
};
