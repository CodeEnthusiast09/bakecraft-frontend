"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { subscriptionValidationSchema } from "@/validations";

type MutationProp = { data: InferType<typeof subscriptionValidationSchema> };

export const useInitiateSubscription = () => {
  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.subscription?.subscribe(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        console.log("Paystack response:", response);

        const authorizationUrl = response?.data?.authorizationUrl;

        if (authorizationUrl) {
          console.log("Redirecting to Paystack:", authorizationUrl);
          window.location.href = authorizationUrl;
        } else {
          toast.error("Unable to start payment. Please try again.");
        }
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending };
};
