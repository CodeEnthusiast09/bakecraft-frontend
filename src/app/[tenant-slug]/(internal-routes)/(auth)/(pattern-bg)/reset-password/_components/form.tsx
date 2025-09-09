"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { MaskPasswordInput } from "components/mask-password-input";
import { useResetPassword } from "hooks/services";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordValidationSchema } from "validations";
import { InferType } from "yup";

export const Form = ({ resetToken }: { resetToken: string }) => {
  const { mutate, isPending: isSubmitting } = useResetPassword();
  const searchParams = useSearchParams();
  const userId = searchParams.get("staff") as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId,
      resetToken,
    },
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const sendToServer: SubmitHandler<
    InferType<typeof resetPasswordValidationSchema>
  > = (data) => mutate({ data });

  return (
    <form onSubmit={handleSubmit(sendToServer)} className="mt-6">
      <MaskPasswordInput
        label="New password"
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
          Reset password
        </Button>
      </div>
    </form>
  );
};
