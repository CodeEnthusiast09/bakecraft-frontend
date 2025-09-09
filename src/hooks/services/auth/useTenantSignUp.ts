"use client";
import { APIResponse, ApiError, Tenant } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { tenantSignUpValidationSchema } from "@/validations";
import { storeInLocalStorage } from "@/lib/localStorage";
import { tenantPath } from "@/lib/tenantRouter";

type MutationProp = { data: InferType<typeof tenantSignUpValidationSchema> };

export const useTenantSignUp = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest.auth.tenantSignUp(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        const tenant: Tenant = response?.data;

        toast.success(response?.message ?? "Account created");

        if (tenant) {
          storeInLocalStorage("tenant", tenant);
        }

        router.replace(tenantPath("/signup", { tenantScoped: true }));
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending };
};
