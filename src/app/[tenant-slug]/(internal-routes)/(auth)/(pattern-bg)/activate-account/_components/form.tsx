"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/button";
import { MaskPasswordInput } from "@/components/mask-password-input";
import { useActivateAccount } from "@/hooks/services";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { activateAccountValidationSchema } from "@/validations";
import { InferType } from "yup";

export const ActivateAccountForm = () => {
  const { mutate: activateAccount, isPending: isSubmitting } =
    useActivateAccount();

  const searchParams = useSearchParams();
  const userId = searchParams.get("staff") as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId,
    },
    resolver: yupResolver(activateAccountValidationSchema),
  });

  const sendToServer: SubmitHandler<
    InferType<typeof activateAccountValidationSchema>
  > = (data) => activateAccount({ data });

  return (
    <form onSubmit={handleSubmit(sendToServer)} className="mt-6">
      <MaskPasswordInput
        label="Create password"
        placeholder="Password (min. 8 character)"
        error={errors.password}
        {...register("password", { required: true })}
      />

      <MaskPasswordInput
        label="Confirm password"
        placeholder="Password (min. 8 character)"
        error={errors.passwordConfirmation}
        {...register("passwordConfirmation", { required: true })}
      />

      <div className="pt-5">
        <Button
          type="submit"
          className="h-12 block w-full"
          isLoading={isSubmitting}
        >
          Activate
        </Button>
      </div>
    </form>
  );
};
