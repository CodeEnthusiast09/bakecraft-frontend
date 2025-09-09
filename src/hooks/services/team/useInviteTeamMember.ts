"use client";
import { APIResponse, ApiError } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clientRequest } from "@/services/client";
import { InferType } from "yup";
import { inviteStaffValidationSchema } from "@/validations";

type MutationProp = {
  data: InferType<typeof inviteStaffValidationSchema>;
};

export const useInviteTeamMember = (onSuccess?: Function) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    APIResponse,
    ApiError,
    MutationProp
  >({
    // @ts-ignore
    mutationFn: ({ data }: MutationProp) => {
      return clientRequest.team.create(data);
    },
    onSuccess: async (response: APIResponse) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: ["staffs"] });
        toast.success(response?.message ?? "Team member invited successfully!");

        onSuccess?.();
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Opps! Something went wrong.");
    },
  });

  return { mutate, isPending };
};
