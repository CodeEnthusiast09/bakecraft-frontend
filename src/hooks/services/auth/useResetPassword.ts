"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { resetPasswordValidationSchema } from "@/validations";
import { InferType } from "yup";

type MutationProp = {
  data: InferType<typeof resetPasswordValidationSchema>;
};

export const useResetPassword = () => {
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.auth?.resetPassword(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        toast.success(response?.message ?? "Password reset successfully");

        // redirect to login page
        router.replace("/");
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending, isSuccess };
};
