"use client";
import { APIResponse, ApiError, User } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { signInValidationSchema } from "@/validations";
import { storeInLocalStorage } from "@/lib/localStorage";

type MutationProp = { data: InferType<typeof signInValidationSchema> };

export const useSignIn = () => {
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
      return clientRequest?.auth?.signIn(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        const user: User = response?.data?.user;

        // if account has been verified
        // if (user && user.emailVerifiedAt) {
        toast.success(response?.message ?? "Welcome back");
        // NB:: token from response would have been saved to localStorage, see "src/services/client/client-request-gateway.ts"

        storeInLocalStorage("user-id", user?.id);

        if (returnUrl) {
          router.push(returnUrl);
          return;
        }

        // redirect to dashboard
        router.push("/dashboard");

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
