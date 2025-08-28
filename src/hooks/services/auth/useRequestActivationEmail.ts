"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { requestActivationEmailValidationSchema } from "@/validations";
import { InferType } from "yup";
import { storeInLocalStorage } from "@/lib/localStorage";

type MutationProp = {
  data: InferType<typeof requestActivationEmailValidationSchema>;
};

export const useRequestActivationEmail = (onSuccess?: Function) => {
  const { mutate, isPending, isSuccess } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      storeInLocalStorage("email", data?.email);
      return clientRequest?.auth?.requestActivationEmail(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        toast.success(response?.message ?? "Activation link sent successfully");
        onSuccess?.();
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending, isSuccess };
};
