"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { userSignUpValidationSchema } from "@/validations";
import { tenantPath } from "@/lib/tenantRouter";

type MutationProp = { data: InferType<typeof userSignUpValidationSchema> };

export const useUserSignUp = (returnUrl?: string | null) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.auth?.userSignUp(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        toast.success(response?.message ?? "Account created");

        if (returnUrl) {
          router.push(tenantPath(returnUrl));
          return;
        } else {
          router.push("/create-account/subscription");
        }
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending };
};
