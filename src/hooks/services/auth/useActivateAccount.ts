"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { activateAccountValidationSchema } from "@/validations";

type MutationProp = { data: InferType<typeof activateAccountValidationSchema> };

export const useActivateAccount = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.auth?.activateAccount(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        toast.success(response?.message ?? "Account activated successfully!");

        // redirect back to login page
        router.push("/");
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending };
};
