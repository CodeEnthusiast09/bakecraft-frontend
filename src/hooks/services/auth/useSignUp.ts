"use client";
import { APIResponse, ApiError, Tenant, User } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { signUpValidationSchema } from "@/validations";
import { storeInLocalStorage } from "@/lib/localStorage";
import { tenantPath } from "@/lib/tenantRouter";

type MutationProp = { data: InferType<typeof signUpValidationSchema> };

export const useSignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get("returnUrl");

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
        }

        // redirect to dashboard
        router.push(tenantPath("/dashboard"));

        // check if user has filled profile details
        // if (user?.dateOfBirth && user?.gender) {
        // redirect to dashboard
        // router.push("/dashboard");
        // } else {
        //   // redirect to profile settings page
        //   router.push("/profile/edit/bio-data?prompt=true");
        // }

        // } else {
        //   toast.error("Please verify your email address.");
        // }
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending };
};
