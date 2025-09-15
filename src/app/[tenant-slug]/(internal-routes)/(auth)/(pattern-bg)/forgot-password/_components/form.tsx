"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useForgotPassword } from "@/hooks/services";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { forgotPasswordValidationSchema } from "@/validations";
import { InferType } from "yup";

export const Form = () => {
  const router = useRouter();

  const onSuccess = () => {
    router?.push("/forgot-password/success");
  };
  const { mutate, isPending: isSubmitting } = useForgotPassword({ onSuccess });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const sendToServer: SubmitHandler<
    InferType<typeof forgotPasswordValidationSchema>
  > = (data) => mutate({ data });

  return (
    <form onSubmit={handleSubmit(sendToServer)} className="mt-6">
      <Input
        label="Email address"
        type="email"
        placeholder="Enter your email"
        leftIcon={<MdOutlineEmail />}
        error={errors.email}
        {...register("email", { required: true })}
      />
      <div className="pt-5">
        <Button
          type="submit"
          className="h-12 block w-full"
          isLoading={isSubmitting}
        >
          Find password
        </Button>
      </div>
    </form>
  );
};
