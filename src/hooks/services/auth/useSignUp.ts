"use client";
import { APIResponse, ApiError, Tenant, User } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { signUpValidationSchema } from "@/validations";
import { storeInLocalStorage } from "@/lib/localStorage";
import { tenantPath } from "@/lib/tenantRouter";

type MutationProp = { data: InferType<typeof signUpValidationSchema> };

export const useSignUp = (returnUrl?: string | null) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest?.auth?.signUp(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        const user: User = response?.data?.user;

        const tenant: Tenant = response?.data?.tenant;

        toast.success(response?.message ?? "Account created");
        // NB:: token from response would have been saved to localStorage, see "src/services/client/client-request-gateway.ts"

        if (tenant) {
          storeInLocalStorage("tenant", tenant);
        }

        storeInLocalStorage("user-id", user?.id);

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
