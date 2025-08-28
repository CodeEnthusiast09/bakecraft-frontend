"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { InferType } from "yup";
import { forgotPasswordValidationSchema } from "@/validations";
import { clientRequest } from "@/services/client";
import { storeInLocalStorage } from "@/lib/localStorage";

type MutationProp = {
  data: InferType<typeof forgotPasswordValidationSchema>;
};
export const useForgotPassword = ({
  showNotification = false,
  onSuccess,
}: {
  showNotification?: boolean;
  onSuccess?: Function;
} = {}) => {
  const { mutate, isPending, isSuccess } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.auth?.forgotPassword(data);
    },
    onSuccess: (response: APIResponse, variables) => {
      if (showNotification) {
        toast.success(response?.message || "Reset link sent successfully");
      }
      if (response?.success) {
        storeInLocalStorage("email", variables.data.email);
        onSuccess?.();
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending, isSuccess };
};
